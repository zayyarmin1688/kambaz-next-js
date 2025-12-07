/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Take/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";

import type { RootState } from "../../../../../store";
import * as client from "../../client";
import type {
  Quiz,
  QuizQuestion,
  QuizQuestionChoice,
} from "../../reducer";

import QuestionNavigator from "./QuestionNavigator";
import TakingQuestionCard from "./TakingQuestionCard";
import LockedOutReview from "./LockedOutReview";
import type { AnswersMap, QuizAttempt } from "./types";

export default function TakeQuizPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const isStudent = currentUser?.role === "STUDENT";

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
  const [selectedAttemptIndex, setSelectedAttemptIndex] =
    useState<number>(0);

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
    question: QuizQuestion,
    ans: string | boolean | undefined
  ) => {
    // multiple choice
    if (
      question.type === "multiple-choice" &&
      Array.isArray(question.choices) &&
      typeof ans === "string"
    ) {
      const correctChoice = (question.choices as QuizQuestionChoice[]).find(
        (c) => c.correct
      );
      return !!correctChoice && correctChoice._id === ans;
    }

    // true false
    if (
      question.type === "true-false" &&
      typeof question.correctBoolean === "boolean" &&
      typeof ans === "boolean"
    ) {
      return question.correctBoolean === ans;
    }

    // fill in the blanks
    if (
      question.type === "fill-blank" &&
      Array.isArray(question.correctAnswers) &&
      typeof ans === "string"
    ) {
      const normalizedAns = ans.trim().toLowerCase();
      return question.correctAnswers
        .map((score) => score.trim().toLowerCase())
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
        ""
      )) as QuizAttempt[];

      const sorted = [...data].sort(
        (a, b) => b.attemptNumber - a.attemptNumber
      );
      setAttempts(sorted);

      const maxAllowed = computeMaxAttemptsAllowed(quizObj);
      const used = sorted.length;

      if (used >= maxAllowed) {
        setLockedOut(true);
        setSelectedAttemptIndex(0);
      } else {
        setLockedOut(false);
      }
    } catch (e) {
      console.error("Failed to load attempts", e);
    }
  };

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

  const handleSubmit = async (e: FormEvent | null, fromTimer = false) => {
    if (e) e.preventDefault();
    if (!quiz) return;

    const earned = scoreQuiz(quiz, answers);
    setEarnedPoints(earned);
    setSubmitted(true);

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

      await refreshAttempts(quiz._id, quiz);
    } catch (err: any) {
      console.error(err);
      if (err && err.code === "MAX_ATTEMPTS_REACHED") {
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

  if (isStudent && !quiz.published) {
    return (
      <div className="p-3">
        <Alert variant="warning">
          This quiz is not available.
        </Alert>
        <Button variant="secondary" onClick={goBack}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  const maxAllowed = computeMaxAttemptsAllowed(quiz);
  const attemptsUsed = attempts.length;

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
                secondsLeft !== null && secondsLeft < 60
                  ? "text-danger"
                  : ""
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

      {/* ----------Taking the quiz---------- */}
      {!lockedOut && (
        <Form onSubmit={handleSubmit}>
          <QuestionNavigator
            questions={questions}
            currentIndex={currentIndex}
            onSelectIndex={setCurrentIndex}
          />

          <TakingQuestionCard
            question={currentQuestion}
            index={currentIndex}
            answers={answers}
            onSetAnswer={setAnswer}
          />

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

      {/* ----------Review when locked out ---------- */}
      {lockedOut && attempts.length > 0 && (
        <LockedOutReview
          quiz={quiz}
          attempts={attempts}
          selectedAttemptIndex={selectedAttemptIndex}
          onSelectAttemptIndex={setSelectedAttemptIndex}
        />
      )}

      <div className="mt-3">
        <Button variant="outline-secondary" onClick={goBack}>
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}
