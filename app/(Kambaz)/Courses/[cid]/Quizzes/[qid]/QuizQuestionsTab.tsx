// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizQuestionsTab.tsx
import { Form, Button, Row, Col } from "react-bootstrap";
import type { QuizQuestion, QuizQuestionChoice } from "../reducer";

type Props = {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
};

function makeId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function QuizQuestionsTab(props: Props) {
  const { questions, setQuestions, editingId, setEditingId } = props;

  const updateQuestion = (id: string, partial: Partial<QuizQuestion>) => {
    setQuestions((qs) =>
      qs.map((q) => (q._id === id ? { ...q, ...partial } : q))
    );
  };

  const addChoice = (q: QuizQuestion) => {
    const choices = q.choices ?? [];
    const newChoice: QuizQuestionChoice = {
      _id: makeId(),
      text: "",
      correct: choices.length === 0,
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

  const setChoiceCorrect = (q: QuizQuestion, choiceId: string) => {
    const choices = q.choices ?? [];
    updateQuestion(q._id, {
      choices: choices.map((c) => ({
        ...c,
        correct: c._id === choiceId,
      })),
    });
  };

  const removeChoice = (q: QuizQuestion, choiceId: string) => {
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

  const removeFillBlankAnswer = (q: QuizQuestion, index: number) => {
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
  };

  const deleteQuestion = (id: string) => {
    setQuestions((qs) => qs.filter((q) => q._id !== id));
    if (editingId === id) setEditingId(null);
  };

  const renderQuestionEditor = (q: QuizQuestion) => {
    switch (q.type) {
      case "true-false":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={q.text}
                onChange={(e) =>
                  updateQuestion(q._id, { text: e.target.value })
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
                    updateQuestion(q._id, { correctBoolean: true })
                  }
                />
                <Form.Check
                  inline
                  label="False"
                  type="radio"
                  name={`tf-${q._id}`}
                  checked={q.correctBoolean === false}
                  onChange={() =>
                    updateQuestion(q._id, { correctBoolean: false })
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
                  updateQuestion(q._id, { text: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correct Answers (one per line)</Form.Label>
              {(q.correctAnswers ?? []).map((ans, idx) => (
                <div key={idx} className="d-flex mb-1">
                  <Form.Control
                    value={ans}
                    onChange={(e) =>
                      updateFillBlankAnswer(q, idx, e.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => removeFillBlankAnswer(q, idx)}
                  >
                    -
                  </Button>
                </div>
              ))}
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
                  updateQuestion(q._id, { text: e.target.value })
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
                    onChange={() => setChoiceCorrect(q, c._id)}
                  />
                  <Form.Control
                    value={c.text}
                    onChange={(e) =>
                      updateChoiceText(q, c._id, e.target.value)
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => removeChoice(q, c._id)}
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

  return (
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
          <div key={q._id} className="border rounded p-3 mb-3">
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
                    setEditingId(isEditing ? null : q._id)
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
                            points: Number(e.target.value) || 0,
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
}
