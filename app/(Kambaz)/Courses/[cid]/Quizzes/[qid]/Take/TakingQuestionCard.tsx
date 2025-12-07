// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Take/TakingQuestionCard.tsx
"use client";

import { Card, Form } from "react-bootstrap";
import type { QuizQuestion, QuizQuestionChoice } from "../../reducer";
import type { AnswersMap } from "./types";

type Props = {
  question: QuizQuestion | null;
  index: number;
  answers: AnswersMap;
  onSetAnswer: (questionId: string, value: string | boolean) => void;
};

export default function TakingQuestionCard({
  question,
  index,
  answers,
  onSetAnswer,
}: Props) {
  if (!question) {
    return null;
  }

  const value = answers[question._id];

  const renderBody = () => {
    if (question.type === "multiple-choice") {
      return (
        <Form.Group>
          {(question.choices ?? []).map((opt: QuizQuestionChoice) => (
            <Form.Check
              key={opt._id}
              type="radio"
              name={question._id}
              label={opt.text}
              checked={value === opt._id}
              onChange={() => onSetAnswer(question._id, opt._id)}
              className="mb-1"
            />
          ))}
        </Form.Group>
      );
    }

    if (question.type === "true-false") {
      return (
        <Form.Group>
          <Form.Check
            type="radio"
            name={question._id}
            label="True"
            checked={value === true}
            onChange={() => onSetAnswer(question._id, true)}
            className="mb-1"
          />
          <Form.Check
            type="radio"
            name={question._id}
            label="False"
            checked={value === false}
            onChange={() => onSetAnswer(question._id, false)}
          />
        </Form.Group>
      );
    }

    if (question.type === "fill-blank") {
      return (
        <Form.Group>
          <Form.Control
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) =>
              onSetAnswer(question._id, e.target.value)
            }
          />
        </Form.Group>
      );
    }

    return null;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <span>
            Question {index + 1}
            {question.title ? ` – ${question.title}` : ""}
          </span>
          <span>{question.points ?? 1} pts</span>
        </Card.Title>

        {question.text && <Card.Text>{question.text}</Card.Text>}

        {renderBody()}
      </Card.Body>
    </Card>
  );
}
