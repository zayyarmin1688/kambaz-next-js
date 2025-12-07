/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Preview/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";

import * as client from "../../client";
import type {
  Quiz,
  QuizQuestion,
  QuizQuestionChoice,
} from "../../reducer";
import {
  scoreQuestion,
  type AnswersMap,
} from "../quizScoring";

export default function QuizPreviewPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      try {
        const data = await client.findQuizById(qid as string);
        setQuiz(data as Quiz);

        const total = ((data as Quiz).questions ?? []).reduce(
          (sum: number, q: QuizQuestion) => sum + (q.points ?? 1),
          0
        );
        setTotalPoints(total);
      } catch (e) {
        console.error(e);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [qid]);

  const setAnswer = (questionId: string, value: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!quiz) return;

    let earned = 0;
    for (const q of (quiz.questions ?? []) as QuizQuestion[]) {
      const ans = answers[q._id];
      const pts = q.points ?? 1;
      if (scoreQuestion(q, ans)) {
        earned += pts;
      }
    }

    setEarnedPoints(earned);
    setSubmitted(true);
  };

  const goBackToEditor = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  // -------- loading / error --------
  if (loading) {
    return (
      <div className="p-3">
        <Spinner animation="border" size="sm" className="me-2" />
        Loading quiz preview...
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="p-3">
        <Alert variant="danger">{error ?? "Quiz not found."}</Alert>
        <Button variant="secondary" onClick={goBackToEditor}>
          Back to Quiz
        </Button>
      </div>
    );
  }

  const questions = (quiz.questions ?? []) as QuizQuestion[];
  const currentQuestion =
    questions.length > 0 ? questions[currentIndex] : null;

  return (
    <div className="p-3">
      <div className="border rounded p-4 bg-white">
        <h3 className="mb-2">{quiz.title}</h3>
        <Alert variant="warning" className="py-2 mb-3">
          This is a preview of the published version of the quiz
        </Alert>

        <div className="text-muted mb-3">
          Preview mode – answers are NOT saved.
        </div>

        <h4 className="mb-3">Quiz Instructions</h4>

        {submitted && earnedPoints !== null && (
          <Alert variant="info" className="mb-3">
            Score:&nbsp;
            <strong>{earnedPoints}</strong> /{" "}
            <strong>{totalPoints}</strong> points
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {questions.length === 0 && (
            <Alert variant="warning">
              This quiz has no questions yet.
            </Alert>
          )}

          {currentQuestion && (
            <Card className="mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Question {currentIndex + 1}</span>
                <span>{currentQuestion.points ?? 1} pts</span>
              </Card.Header>
              <Card.Body>
                {currentQuestion.text && (
                  <Card.Text>{currentQuestion.text}</Card.Text>
                )}

                {(() => {
                  const q = currentQuestion;
                  const value = answers[q._id];
                  const isCorrect =
                    submitted && scoreQuestion(q, value as any);

                  if (q.type === "multiple-choice") {
                    return (
                      <>
                        <Form.Group>
                          {(q.choices ?? []).map(
                            (opt: QuizQuestionChoice) => (
                              <Form.Check
                                key={opt._id}
                                type="radio"
                                name={q._id}
                                label={opt.text}
                                checked={value === opt._id}
                                onChange={() =>
                                  setAnswer(q._id, opt._id)
                                }
                                className="mb-1"
                              />
                            )
                          )}
                        </Form.Group>
                        {submitted && (
                          <div className="mt-2">
                            {isCorrect ? (
                              <span className="text-success">
                                ✓ Correct
                              </span>
                            ) : (
                              <span className="text-danger">
                                ✗ Incorrect
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    );
                  }

                  if (q.type === "true-false") {
                    return (
                      <>
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
                        {submitted && (
                          <div className="mt-2">
                            {isCorrect ? (
                              <span className="text-success">
                                ✓ Correct
                              </span>
                            ) : (
                              <span className="text-danger">
                                ✗ Incorrect
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    );
                  }

                  if (q.type === "fill-blank") {
                    return (
                      <>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            value={typeof value === "string" ? value : ""}
                            onChange={(e) =>
                              setAnswer(q._id, e.target.value)
                            }
                          />
                        </Form.Group>
                        {submitted && (
                          <div className="mt-2">
                            {isCorrect ? (
                              <span className="text-success">
                                ✓ Correct
                              </span>
                            ) : (
                              <span className="text-danger">
                                ✗ Incorrect
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    );
                  }

                  return null;
                })()}
              </Card.Body>
            </Card>
          )}

          {questions.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={goBackToEditor}
                >
                  Keep Editing This Quiz
                </Button>

                <div className="d-flex gap-2">
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
                  <Button variant="primary" type="submit">
                    Submit Quiz
                  </Button>
                </div>
              </div>

              <div className="mt-3">
                <h5 className="mb-2">Questions</h5>
                {questions.map((q, idx) => (
                  <Button
                    key={q._id}
                    type="button"
                    variant="link"
                    className={
                      idx === currentIndex
                        ? "p-0 me-2 fw-bold"
                        : "p-0 me-2"
                    }
                    onClick={() => setCurrentIndex(idx)}
                  >
                    Question {idx + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
