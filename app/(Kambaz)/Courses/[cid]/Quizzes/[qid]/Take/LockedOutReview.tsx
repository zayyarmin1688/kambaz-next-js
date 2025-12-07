// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Take/LockedOutReview.tsx
"use client";

import { Card, ListGroup } from "react-bootstrap";
import type { Quiz, QuizQuestion } from "../../reducer";
import type { QuizAttempt } from "./types";

type Props = {
  quiz: Quiz;
  attempts: QuizAttempt[];
  selectedAttemptIndex: number;
  onSelectAttemptIndex: (index: number) => void;
};

const findAnswerForQuestion = (
  attempt: QuizAttempt,
  questionId: string
) => {
  return attempt.answers.find((a) => a.questionId === questionId) || null;
};

const renderQuestionReview = (q: QuizQuestion, attempt: QuizAttempt) => {
  const ans = findAnswerForQuestion(attempt, q._id);
  const selectedIds = ans?.selectedOptionIds ?? [];
  const textAns = ans?.textAnswer ?? "";

  // Multiple choice
  if (q.type === "multiple-choice") {
    const correctChoice = (q.choices ?? []).find((c) => c.correct);
    const selectedId = selectedIds[0];
    const correct = correctChoice && selectedId === correctChoice._id;

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

  // True / False
  if (q.type === "true-false") {
    const selected = selectedIds[0];
    const studentBool = selected === "true";
    const correctBool = !!q.correctBoolean;
    const correct =
      selectedIds.length > 0 && studentBool === correctBool;

    return (
      <>
        <div className="mb-1">
          <strong>
            Your answer:{" "}
            <span className={correct ? "text-success" : "text-danger"}>
              {selectedIds.length === 0
                ? "No answer"
                : studentBool
                ? "True"
                : "False"}
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

  // Fill in the blank
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

export default function LockedOutReview({
  quiz,
  attempts,
  selectedAttemptIndex,
  onSelectAttemptIndex,
}: Props) {
  if (attempts.length === 0) return null;

  const selectedAttempt = attempts[selectedAttemptIndex];

  const questions = (quiz.questions ?? []) as QuizQuestion[];

  return (
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
            onClick={() => onSelectAttemptIndex(index)}
          >
            Attempt #{a.attemptNumber} •{" "}
            {new Date(a.submittedAt).toLocaleString()} • Score{" "}
            {a.score} / {a.maxScore}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
