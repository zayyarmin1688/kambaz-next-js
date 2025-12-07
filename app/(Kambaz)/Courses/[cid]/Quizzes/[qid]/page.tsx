/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/page.tsx
"use client";


import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";

import type { RootState } from "../../../../store";
import {
  addQuiz,
  updateQuiz,
  type Quiz,
  type QuizQuestion,
  type QuizQuestionChoice,
} from "../reducer";
import * as client from "../client";

function makeId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // ---- user + role ----
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const isStudent = currentUser?.role === "STUDENT";

  const existing = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.find(
      (q) => q.course === cid && q._id === qid
    )
  );

  const isNew = qid === "new";

  const [activeTab, setActiveTab] =
    useState<"details" | "questions">("details");

  const [title, setTitle] = useState("New Quiz");
  const [description, setDescription] = useState("");

  const [quizType, setQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] =
    useState("Quizzes");
  const [points, setPoints] = useState<number>(0);

  const [shuffleAnswers, setShuffleAnswers] =
    useState(true);
  const [timeLimitMinutes, setTimeLimitMinutes] =
    useState<number>(20);
  const [multipleAttempts, setMultipleAttempts] =
    useState(false);
  const [maxAttempts, setMaxAttempts] =
    useState<number>(1);
  const [showCorrectAnswers, setShowCorrectAnswers] =
    useState("immediately");

  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] =
    useState(true);
  const [webcamRequired, setWebcamRequired] =
    useState(false);
  const [
    lockQuestionsAfterAnswering,
    setLockQuestionsAfterAnswering,
  ] = useState(false);

  const [due, setDue] = useState<string>("");
  const [availableFrom, setAvailableFrom] =
    useState<string>("");
  const [availableUntil, setAvailableUntil] =
    useState<string>("");

  const [published, setPublished] = useState(false);

  const [questions, setQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  // ---- load existing quiz into local state ----
  useEffect(() => {
    if (!existing) return;

    setTitle(existing.title ?? "New Quiz");
    setDescription(existing.description ?? "");
    setQuizType(existing.quizType ?? "Graded Quiz");
    setAssignmentGroup(
      existing.assignmentGroup ?? "Quizzes"
    );
    if (existing.points !== undefined)
      setPoints(existing.points);

    if (existing.shuffleAnswers !== undefined)
      setShuffleAnswers(!!existing.shuffleAnswers);
    if (existing.timeLimitMinutes !== undefined)
      setTimeLimitMinutes(existing.timeLimitMinutes);
    if (existing.multipleAttempts !== undefined)
      setMultipleAttempts(!!existing.multipleAttempts);
    if (existing.maxAttempts !== undefined)
      setMaxAttempts(existing.maxAttempts);
    if (existing.showCorrectAnswers)
      setShowCorrectAnswers(existing.showCorrectAnswers);

    setAccessCode(existing.accessCode ?? "");
    if (existing.oneQuestionAtATime !== undefined)
      setOneQuestionAtATime(
        !!existing.oneQuestionAtATime
      );
    if (existing.webcamRequired !== undefined)
      setWebcamRequired(!!existing.webcamRequired);
    if (
      existing.lockQuestionsAfterAnswering !==
      undefined
    )
      setLockQuestionsAfterAnswering(
        !!existing.lockQuestionsAfterAnswering
      );

    setDue(existing.due ?? "");
    setAvailableFrom(existing.availableFrom ?? "");
    setAvailableUntil(existing.availableUntil ?? "");

    setPublished(!!existing.published);

    setQuestions(existing.questions ?? []);
  }, [existing]);

  // ---- block students from editor ----
  useEffect(() => {
    if (!isStudent) return;

    // students should never be on the editor:
    // send them to Preview for an existing quiz, or back to list
    if (qid && qid !== "new") {
      router.replace(`/Courses/${cid}/Quizzes/${qid}/Preview`);
    } else {
      router.replace(`/Courses/${cid}/Quizzes`);
    }
  }, [isStudent, cid, qid, router]);

  const goBack = () => router.push(`/Courses/${cid}/Quizzes`);

  const goToPreview = () => {
    if (!cid || !qid || isNew) return;
    router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
  };

  const save = async (newPublished?: boolean) => {
    if (!cid) return;

    const body: Partial<Quiz> = {
      title,
      description,
      quizType,
      assignmentGroup,
      points,
      shuffleAnswers,
      timeLimitMinutes,
      multipleAttempts,
      maxAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      due,
      availableFrom,
      availableUntil,
      published: newPublished ?? published,
      questions,
    };

    if (isNew) {
      const created = await client.createQuizForCourse(
        cid,
        body
      );
      dispatch(addQuiz(created));
    } else if (existing && existing._id) {
      const updated: Quiz = { ...existing, ...body };
      await client.updateQuizOnServer(updated);
      dispatch(updateQuiz(updated));
    }

    goBack();
  };

  const onSave = () => save();
  const onSaveAndPublish = () => save(true);

  // ---------- helpers for questions ----------
  const updateQuestion = (
    id: string,
    partial: Partial<QuizQuestion>
  ) => {
    setQuestions((qs) =>
      qs.map((q) =>
        q._id === id ? { ...q, ...partial } : q
      )
    );
  };

  const addChoice = (q: QuizQuestion) => {
    const choices = q.choices ?? [];
    const newChoice: QuizQuestionChoice = {
      _id: makeId(),
      text: "",
      correct: choices.length === 0, // first one correct by default
    };
    updateQuestion(q._id, {
      choices: [...choices, newChoice],
    });
  };

  const updateChoiceText = (
    q: QuizQuestion,
    choiceId: string,
    text: string
  ) => {
    const choices = q.choices ?? [];
    updateQuestion(q._id, {
      choices: choices.map((c) =>
        c._id === choiceId ? { ...c, text } : c
      ),
    });
  };

  const setChoiceCorrect = (
    q: QuizQuestion,
    choiceId: string
  ) => {
    const choices = q.choices ?? [];
    updateQuestion(q._id, {
      choices: choices.map((c) => ({
        ...c,
        correct: c._id === choiceId,
      })),
    });
  };

  const removeChoice = (
    q: QuizQuestion,
    choiceId: string
  ) => {
    const choices = q.choices ?? [];
    updateQuestion(q._id, {
      choices: choices.filter((c) => c._id !== choiceId),
    });
  };

  const addFillBlankAnswer = (q: QuizQuestion) => {
    const answers = q.correctAnswers ?? [];
    updateQuestion(q._id, {
      correctAnswers: [...answers, ""],
    });
  };

  const updateFillBlankAnswer = (
    q: QuizQuestion,
    index: number,
    text: string
  ) => {
    const answers = q.correctAnswers ?? [];
    const copy = [...answers];
    copy[index] = text;
    updateQuestion(q._id, {
      correctAnswers: copy,
    });
  };

  const removeFillBlankAnswer = (
    q: QuizQuestion,
    index: number
  ) => {
    const answers = q.correctAnswers ?? [];
    const copy = answers.filter((_, i) => i !== index);
    updateQuestion(q._id, {
      correctAnswers: copy,
    });
  };

  const addNewQuestion = () => {
    const newQ: QuizQuestion = {
      _id: makeId(),
      type: "multiple-choice",
      title: "New Question",
      points: 1,
      text: "",
      choices: [
        { _id: makeId(), text: "", correct: true },
        { _id: makeId(), text: "", correct: false },
      ],
    };
    setQuestions((qs) => [...qs, newQ]);
    setEditingId(newQ._id);
    setActiveTab("questions");
  };

  const deleteQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q._id !== id));
    if (editingId === id) setEditingId(null);
  };

  // ---------- render pieces ----------

  // If a student somehow hits this route, show a tiny message
  // while the redirect effect above runs.
  if (isStudent) {
    return (
      <div className="p-3">
        <p>You do not have permission to edit this quiz. Redirecting…</p>
      </div>
    );
  }

  const renderDetailsTab = () => (
    <>
      <Form.Group className="mb-3" controlId="wd-quiz-title">
        <Form.Label>
          <strong>Quiz Name</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wd-quiz-description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-quiz-type">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-assignment-group">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={assignmentGroup}
              onChange={(e) =>
                setAssignmentGroup(e.target.value)
              }
            >
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="3">
          <Form.Group controlId="wd-quiz-points">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) =>
                setPoints(Number(e.target.value) || 0)
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-shuffle-answers">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={shuffleAnswers}
              onChange={(e) =>
                setShuffleAnswers(e.target.checked)
              }
            />
          </Form.Group>
          <Form.Group controlId="wd-one-question" className="mt-2">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={oneQuestionAtATime}
              onChange={(e) =>
                setOneQuestionAtATime(e.target.checked)
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-time-limit">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={timeLimitMinutes}
              onChange={(e) =>
                setTimeLimitMinutes(
                  Number(e.target.value) || 0
                )
              }
            />
          </Form.Group>
          <Form.Group
            controlId="wd-webcam-required"
            className="mt-2"
          >
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={webcamRequired}
              onChange={(e) =>
                setWebcamRequired(e.target.checked)
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-multiple-attempts">
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={multipleAttempts}
              onChange={(e) =>
                setMultipleAttempts(e.target.checked)
              }
            />
          </Form.Group>
          {multipleAttempts && (
            <Form.Group
              controlId="wd-max-attempts"
              className="mt-2"
            >
              <Form.Label>How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                value={maxAttempts}
                onChange={(e) =>
                  setMaxAttempts(
                    Number(e.target.value) || 1
                  )
                }
              />
            </Form.Group>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-show-correct">
            <Form.Label>Show Correct Answers</Form.Label>
            <Form.Select
              value={showCorrectAnswers}
              onChange={(e) =>
                setShowCorrectAnswers(e.target.value)
              }
            >
              <option value="immediately">
                Immediately
              </option>
              <option value="later">Later</option>
              <option value="never">Never</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-access-code">
            <Form.Label>Access Code</Form.Label>
            <Form.Control
              type="text"
              value={accessCode}
              onChange={(e) =>
                setAccessCode(e.target.value)
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-lock-questions">
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={lockQuestionsAfterAnswering}
              onChange={(e) =>
                setLockQuestionsAfterAnswering(
                  e.target.checked
                )
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="border rounded p-3 mb-3">
        <Form.Label>
          <strong>Assign</strong>
        </Form.Label>
        <Row>
          <Col>
            <Form.Group controlId="wd-quiz-due">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={availableFrom}
                onChange={(e) =>
                  setAvailableFrom(e.target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                value={availableUntil}
                onChange={(e) =>
                  setAvailableUntil(e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );

  const renderQuestionEditor = (q: QuizQuestion) => {
    switch (q.type) {
      case "true-false":
        return (
          <>
            <Form.Group className="mb-2" controlId="">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={q.text}
                onChange={(e) =>
                  updateQuestion(q._id, {
                    text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correct Answer</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="True"
                  type="radio"
                  name={`tf-${q._id}`}
                  checked={q.correctBoolean === true}
                  onChange={() =>
                    updateQuestion(q._id, {
                      correctBoolean: true,
                    })
                  }
                />
                <Form.Check
                  inline
                  label="False"
                  type="radio"
                  name={`tf-${q._id}`}
                  checked={q.correctBoolean === false}
                  onChange={() =>
                    updateQuestion(q._id, {
                      correctBoolean: false,
                    })
                  }
                />
              </div>
            </Form.Group>
          </>
        );
      case "fill-blank":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={q.text}
                onChange={(e) =>
                  updateQuestion(q._id, {
                    text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Correct Answers (one per line)
              </Form.Label>
              {(q.correctAnswers ?? []).map(
                (ans, idx) => (
                  <div
                    key={idx}
                    className="d-flex mb-1"
                  >
                    <Form.Control
                      value={ans}
                      onChange={(e) =>
                        updateFillBlankAnswer(
                          q,
                          idx,
                          e.target.value
                        )
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() =>
                        removeFillBlankAnswer(q, idx)
                      }
                    >
                      -
                    </Button>
                  </div>
                )
              )}
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => addFillBlankAnswer(q)}
              >
                + Answer
              </Button>
            </Form.Group>
          </>
        );
      default:
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={q.text}
                onChange={(e) =>
                  updateQuestion(q._id, {
                    text: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Answers</Form.Label>
              {(q.choices ?? []).map((c) => (
                <div
                  key={c._id}
                  className="d-flex align-items-center mb-1"
                >
                  <Form.Check
                    type="radio"
                    name={`mc-${q._id}`}
                    className="me-2"
                    checked={c.correct}
                    onChange={() =>
                      setChoiceCorrect(q, c._id)
                    }
                  />
                  <Form.Control
                    value={c.text}
                    onChange={(e) =>
                      updateChoiceText(
                        q,
                        c._id,
                        e.target.value
                      )
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() =>
                      removeChoice(q, c._id)
                    }
                  >
                    -
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => addChoice(q)}
              >
                + Choice
              </Button>
            </Form.Group>
          </>
        );
    }
  };

  const renderQuestionsTab = () => (
    <div>
      <Button
        variant="secondary"
        className="mb-3"
        onClick={addNewQuestion}
      >
        + New Question
      </Button>

      {questions.length === 0 && (
        <p>No questions yet. Click “New Question”.</p>
      )}

      {questions.map((q, index) => {
        const isEditing = editingId === q._id;
        return (
          <div
            key={q._id}
            className="border rounded p-3 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>
                  Question {index + 1}: {q.title}
                </strong>{" "}
                <span className="text-muted">
                  ({q.points} pts •{" "}
                  {q.type === "multiple-choice"
                    ? "Multiple Choice"
                    : q.type === "true-false"
                    ? "True/False"
                    : "Fill in the Blank"}
                  )
                </span>
              </div>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() =>
                    setEditingId(
                      isEditing ? null : q._id
                    )
                  }
                >
                  {isEditing ? "Close" : "Edit"}
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => deleteQuestion(q._id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            {isEditing && (
              <>
                <Row className="mb-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={q.title}
                        onChange={(e) =>
                          updateQuestion(q._id, {
                            title: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="3">
                    <Form.Group>
                      <Form.Label>Points</Form.Label>
                      <Form.Control
                        type="number"
                        value={q.points}
                        onChange={(e) =>
                          updateQuestion(q._id, {
                            points:
                              Number(
                                e.target.value
                              ) || 0,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="4">
                    <Form.Group>
                      <Form.Label>Question Type</Form.Label>
                      <Form.Select
                        value={q.type}
                        onChange={(e) =>
                          updateQuestion(q._id, {
                            type: e.target
                              .value as QuizQuestion["type"],
                          })
                        }
                      >
                        <option value="multiple-choice">
                          Multiple Choice
                        </option>
                        <option value="true-false">
                          True / False
                        </option>
                        <option value="fill-blank">
                          Fill in the Blank
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {renderQuestionEditor(q)}
              </>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">
          {isNew ? "New Quiz" : `Edit Quiz: ${title}`}
        </h3>

        {!isNew && (
          <Button
            variant="outline-secondary"
            onClick={goToPreview}
          >
            Preview
          </Button>
        )}
      </div>

      <Nav
        variant="tabs"
        activeKey={activeTab}
        className="mb-3"
        onSelect={(k) =>
          setActiveTab(
            (k as "details" | "questions") ?? "details"
          )
        }
      >
        <Nav.Item>
          <Nav.Link eventKey="details">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        {activeTab === "details"
          ? renderDetailsTab()
          : renderQuestionsTab()}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Form.Check
            type="switch"
            id="wd-published-toggle"
            label="Published"
            checked={published}
            onChange={(e) =>
              setPublished(e.target.checked)
            }
          />

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={goBack}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onSave}>
              Save
            </Button>
            <Button
              variant="success"
              onClick={onSaveAndPublish}
            >
              Save &amp; Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
