// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Take/QuestionNavigator.tsx
"use client";

import { Button } from "react-bootstrap";
import type { QuizQuestion } from "../../reducer";

type Props = {
  questions: QuizQuestion[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
};

export default function QuestionNavigator({
  questions,
  currentIndex,
  onSelectIndex,
}: Props) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="mb-3">
      {questions.map((q, idx) => (
        <Button
          key={q._id}
          type="button"
          size="sm"
          className="me-2 mb-1"
          variant={idx === currentIndex ? "primary" : "outline-primary"}
          onClick={() => onSelectIndex(idx)}
        >
          {idx + 1}
        </Button>
      ))}
    </div>
  );
}
