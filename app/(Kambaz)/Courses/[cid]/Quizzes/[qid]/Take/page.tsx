/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Card, Form, Spinner, ListGroup } from "react-bootstrap";

import type { RootState } from "../../../../../store";
import * as client from "../../client";
import type {
  Quiz,
  QuizQuestion,
  QuizQuestionChoice,
} from "../../reducer";

type AnswersMap = Record<string, string | boolean>;

type QuizAttempt = {
  _id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  submittedAt: string;
  score: number;
  maxScore: number;
  answers: {
    questionId: string;
    selectedOptionIds?: string[];
    textAnswer?: string;
  }[];
};

export default function TakeQuizPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // taking current attempt
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  // attempts / lockout
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [lockedOut, setLockedOut] = useState(false);
  const [selectedAttemptIndex, setSelectedAttemptIndex] = useState<number>(0);

  // timer
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const questions = (quiz?.questions ?? []) as QuizQuestion[];
  const currentQuestion =
    questions.length > 0 ? questions[currentIndex] : null;

  // ---------- helpers ----------
  const setAnswer = (questionId: string, value: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const scoreQuestion = (
    q: QuizQuestion,
    ans: string | boolean | undefined
  ) => {
    // multiple choice
    if (
      q.type === "multiple-choice" &&
      Array.isArray(q.choices) &&
      typeof ans === "string"
    ) {
      const correctChoice = (q.choices as QuizQuestionChoice[]).find(
        (c) => c.correct
      );
      return !!correctChoice && correctChoice._id === ans;
    }

    // true / false
    if (
      q.type === "true-false" &&
      typeof q.correctBoolean === "boolean" &&
      typeof ans === "boolean"
    ) {
      return q.correctBoolean === ans;
    }

    // fill-blank
    if (
      q.type === "fill-blank" &&
      Array.isArray(q.correctAnswers) &&
      typeof ans === "string"
    ) {
      const normalizedAns = ans.trim().toLowerCase();
      return q.correctAnswers
        .map((s) => s.trim().toLowerCase())
        .includes(normalizedAns);
    }

    return false;
  };

  const scoreQuiz = (quizObj: Quiz, ansMap: AnswersMap) => {
    let earned = 0;
    for (const q of (quizObj.questions ?? []) as QuizQuestion[]) {
      const ans = ansMap[q._id];
      const pts = q.points ?? 1;
      if (scoreQuestion(q, ans)) {
        earned += pts;
      }
    }
    return earned;
  };

  const computeMaxAttemptsAllowed = (quizObj: Quiz) => {
    if (quizObj.multipleAttempts) {
      const n = Number(quizObj.maxAttempts);
      return n > 0 ? n : 1;
    }
    return 1;
  };

  const refreshAttempts = async (quizId: string, quizObj: Quiz) => {
  try {
    const data = (await client.findAttemptsForQuizAndStudent(
      quizId,
      "" // studentId is ignored by the wrapper
    )) as QuizAttempt[];

    const sorted = [...data].sort(
      (a, b) => b.attemptNumber - a.attemptNumber
    );
    setAttempts(sorted);

    const maxAllowed = computeMaxAttemptsAllowed(quizObj);
    const used = sorted.length;

    if (used >= maxAllowed) {
      setLockedOut(true);
      setSelectedAttemptIndex(0); // latest attempt
    } else {
      setLockedOut(false);
    }
  } catch (e) {
    console.error("Failed to load attempts", e);
  }
};
  // ---------- load quiz + attempts ----------
  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      try {
        const data = (await client.findQuizById(
          qid as string
        )) as Quiz;

        setQuiz(data);

        const total = (data.questions ?? []).reduce(
          (sum, q) => sum + (q.points ?? 1),
          0
        );
        setTotalPoints(total);

        if (data.timeLimitMinutes && data.timeLimitMinutes > 0) {
          setSecondsLeft(data.timeLimitMinutes * 60);
        }

        await refreshAttempts(data._id, data);
      } catch (e) {
        console.error(e);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [qid]);

  // ---------- timer ----------
  useEffect(() => {
    if (secondsLeft == null || secondsLeft <= 0 || submitted || lockedOut)
      return;

    const id = setInterval(() => {
      setSecondsLeft((prev) =>
        prev == null ? prev : prev - 1
      );
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft, submitted, lockedOut]);

  useEffect(() => {
    if (secondsLeft === 0 && !submitted && quiz && !lockedOut) {
      handleSubmit(null, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, submitted, quiz, lockedOut]);

  const formatTime = (s: number | null) => {
    if (s == null) return "";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ---------- submit ----------
  const handleSubmit = async (e: FormEvent | null, fromTimer = false) => {
    if (e) e.preventDefault();
    if (!quiz) return;

    const earned = scoreQuiz(quiz, answers);
    setEarnedPoints(earned);
    setSubmitted(true);

    // serialize answers into schema format
    const serialized = (quiz.questions ?? []).map((q: QuizQuestion) => {
      const ans = answers[q._id];

      if (q.type === "multiple-choice" && typeof ans === "string") {
        return {
          questionId: q._id,
          selectedOptionIds: [ans],
          textAnswer: "",
        };
      }

      if (q.type === "true-false" && typeof ans === "boolean") {
        return {
          questionId: q._id,
          selectedOptionIds: [ans ? "true" : "false"],
          textAnswer: "",
        };
      }

      if (q.type === "fill-blank" && typeof ans === "string") {
        return {
          questionId: q._id,
          selectedOptionIds: [],
          textAnswer: ans,
        };
      }

      return {
        questionId: q._id,
        selectedOptionIds: [],
        textAnswer: "",
      };
    });

    try {
      await client.createQuizAttempt(quiz._id, {
        answers: serialized,
        score: earned,
        maxScore: totalPoints,
      });

      // refresh attempts; this may lock them out if this was the last try
      await refreshAttempts(quiz._id, quiz);
    } catch (err: any) {
      console.error(err);
      if (err && err.code === "MAX_ATTEMPTS_REACHED") {
        // server says we're out of attempts; lock out and show last attempt
        setLockedOut(true);
        if (err.details?.lastAttempt) {
          setAttempts((prev) => {
            const without = prev.filter(
              (a) => a._id !== err.details.lastAttempt._id
            );
            return [err.details.lastAttempt, ...without];
          });
          setSelectedAttemptIndex(0);
        }
      } else if (!fromTimer) {
        alert("Failed to save quiz attempt on the server.");
      }
    }
  };

  const goBack = () => router.push(`/Courses/${cid}/Quizzes`);

  // ---------- helpers for review ----------
  const findAnswerForQuestion = (
    attempt: QuizAttempt,
    questionId: string
  ) => {
    return (
      attempt.answers.find((a) => a.questionId === questionId) || null
    );
  };

  const renderQuestionBody = (q: QuizQuestion) => {
    const value = answers[q._id];

    if (q.type === "multiple-choice") {
      return (
        <Form.Group>
          {(q.choices ?? []).map((opt: QuizQuestionChoice) => (
            <Form.Check
              key={opt._id}
              type="radio"
              name={q._id}
              label={opt.text}
              checked={value === opt._id}
              onChange={() => setAnswer(q._id, opt._id)}
              className="mb-1"
            />
          ))}
        </Form.Group>
      );
    }

    if (q.type === "true-false") {
      return (
        <Form.Group>
          <Form.Check
            type="radio"
            name={q._id}
            label="True"
            checked={value === true}
            onChange={() => setAnswer(q._id, true)}
            className="mb-1"
          />
          <Form.Check
            type="radio"
            name={q._id}
            label="False"
            checked={value === false}
            onChange={() => setAnswer(q._id, false)}
          />
        </Form.Group>
      );
    }

    if (q.type === "fill-blank") {
      return (
        <Form.Group>
          <Form.Control
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) =>
              setAnswer(q._id, e.target.value)
            }
          />
        </Form.Group>
      );
    }

    return null;
  };

  const renderQuestionReview = (q: QuizQuestion, attempt: QuizAttempt) => {
    const ans = findAnswerForQuestion(attempt, q._id);
    const selectedIds = ans?.selectedOptionIds ?? [];
    const textAns = ans?.textAnswer ?? "";

    // MC review
    if (q.type === "multiple-choice") {
      const correctChoice = (q.choices ?? []).find((c) => c.correct);
      const selectedId = selectedIds[0];
      const correct =
        correctChoice && selectedId === correctChoice._id;

      return (
        <>
          <div className="mb-2">
            <strong>
              {correct ? (
                <span className="text-success">✓ Correct</span>
              ) : (
                <span className="text-danger">✗ Incorrect</span>
              )}
            </strong>
          </div>
          <ul className="mb-0">
            {(q.choices ?? []).map((opt) => {
              const isSelected = selectedId === opt._id;
              const isCorrect = !!opt.correct;
              let textClass = "";
              if (isSelected && isCorrect) textClass = "text-success";
              else if (isSelected && !isCorrect) textClass = "text-danger";
              else if (!isSelected && isCorrect) textClass = "text-success";

              return (
                <li key={opt._id} className={textClass}>
                  {isSelected ? "● " : "○ "}
                  {opt.text}
                  {isCorrect ? " (correct)" : ""}
                </li>
              );
            })}
          </ul>
        </>
      );
    }

    // True/False review
    if (q.type === "true-false") {
      const selected = selectedIds[0];
      const studentBool = selected === "true";
      const correctBool = !!q.correctBoolean;
      const correct = selectedIds.length > 0 && studentBool === correctBool;

      return (
        <>
          <div className="mb-1">
            <strong>
              Your answer:{" "}
              <span className={correct ? "text-success" : "text-danger"}>
                {selectedIds.length === 0 ? "No answer" : studentBool ? "True" : "False"}
              </span>
            </strong>
          </div>
          <div>
            Correct answer:{" "}
            <strong>{correctBool ? "True" : "False"}</strong>
          </div>
        </>
      );
    }

    // Fill-blank review
    if (q.type === "fill-blank") {
      const normalized = textAns.trim().toLowerCase();
      const correct =
        normalized.length > 0 &&
        (q.correctAnswers ?? [])
          .map((s) => s.trim().toLowerCase())
          .includes(normalized);

      return (
        <>
          <div className="mb-1">
            <strong>
              Your answer:{" "}
              <span className={correct ? "text-success" : "text-danger"}>
                {textAns || "(no answer)"}
              </span>
            </strong>
          </div>
          <div>
            Accepted answers:{" "}
            <strong>{(q.correctAnswers ?? []).join(", ") || "None"}</strong>
          </div>
        </>
      );
    }

    return null;
  };

  // ---------- render ----------
  if (loading) {
    return (
      <div className="p-3">
        <Spinner animation="border" size="sm" className="me-2" />
        Loading quiz...
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="p-3">
        <Alert variant="danger">{error ?? "Quiz not found."}</Alert>
        <Button variant="secondary" onClick={goBack}>
          Back
        </Button>
      </div>
    );
  }

  const maxAllowed = computeMaxAttemptsAllowed(quiz);
  const attemptsUsed = attempts.length;

  const selectedAttempt =
    lockedOut && attempts.length > 0
      ? attempts[selectedAttemptIndex]
      : null;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted">
            Attempts used: {attemptsUsed} / {maxAllowed}
          </div>
        </div>

        {quiz.timeLimitMinutes && quiz.timeLimitMinutes > 0 && (
          <div className="fs-5">
            Time left:{" "}
            <span
              className={
                secondsLeft !== null && secondsLeft < 60 ? "text-danger" : ""
              }
            >
              {formatTime(secondsLeft)}
            </span>
          </div>
        )}
      </div>

      {lockedOut && (
        <Alert variant="warning">
          You have used all allowed attempts for this quiz.
        </Alert>
      )}

      {submitted && earnedPoints !== null && !lockedOut && (
        <Alert variant="info">
          Score: <strong>{earnedPoints}</strong> /{" "}
          <strong>{totalPoints}</strong> points
        </Alert>
      )}

      {/* ---------- Taking the quiz (when not locked out) ---------- */}
      {!lockedOut && (
        <Form onSubmit={handleSubmit}>
          {questions.length > 0 && (
            <div className="mb-3">
              {questions.map((q, idx) => (
                <Button
                  key={q._id}
                  type="button"
                  size="sm"
                  className="me-2 mb-1"
                  variant={
                    idx === currentIndex ? "primary" : "outline-primary"
                  }
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </Button>
              ))}
            </div>
          )}

          {currentQuestion && (
            <Card className="mb-3" key={currentQuestion._id}>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <span>
                    Question {currentIndex + 1}
                    {currentQuestion.title
                      ? ` – ${currentQuestion.title}`
                      : ""}
                  </span>
                  <span>{currentQuestion.points ?? 1} pts</span>
                </Card.Title>

                {currentQuestion.text && (
                  <Card.Text>{currentQuestion.text}</Card.Text>
                )}

                {renderQuestionBody(currentQuestion)}
              </Card.Body>
            </Card>
          )}

          {questions.length > 0 && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setEarnedPoints(null);
                }}
              >
                Reset
              </Button>
              <Button variant="primary" type="submit" disabled={submitted}>
                Submit Quiz
              </Button>
            </div>
          )}
        </Form>
      )}

      {/* ---------- Review + history when locked out ---------- */}
      {lockedOut && selectedAttempt && (
        <div className="mt-4">
          <h4>Last Attempt Review</h4>
          <p className="text-muted mb-2">
            Attempt #{selectedAttempt.attemptNumber} •{" "}
            {new Date(selectedAttempt.submittedAt).toLocaleString()} • Score{" "}
            <strong>
              {selectedAttempt.score} / {selectedAttempt.maxScore}
            </strong>
          </p>

          {questions.map((q, idx) => (
            <Card className="mb-3" key={q._id}>
              <Card.Header className="d-flex justify-content-between">
                <span>
                  Question {idx + 1}
                  {q.title ? ` – ${q.title}` : ""}
                </span>
                <span>{q.points ?? 1} pts</span>
              </Card.Header>
              <Card.Body>
                {q.text && <Card.Text>{q.text}</Card.Text>}
                {renderQuestionReview(q, selectedAttempt)}
              </Card.Body>
            </Card>
          ))}

          <h5 className="mt-4">Attempts History</h5>
          <ListGroup>
            {attempts.map((a, index) => (
              <ListGroup.Item
                key={a._id}
                action
                active={index === selectedAttemptIndex}
                onClick={() => setSelectedAttemptIndex(index)}
              >
                Attempt #{a.attemptNumber} •{" "}
                {new Date(a.submittedAt).toLocaleString()} • Score{" "}
                {a.score} / {a.maxScore}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      <div className="mt-3">
        <Button variant="outline-secondary" onClick={goBack}>
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}
