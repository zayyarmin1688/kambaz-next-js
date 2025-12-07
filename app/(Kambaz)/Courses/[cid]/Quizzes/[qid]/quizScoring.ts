// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/quizScoring.ts
import type {
  Quiz,
  QuizQuestion,
  QuizQuestionChoice,
} from "../reducer";

export type AnswersMap = Record<string, string | boolean>;

export function scoreQuestion(
  q: QuizQuestion,
  ans: string | boolean | undefined
): boolean {
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

  if (
    q.type === "true-false" &&
    typeof q.correctBoolean === "boolean" &&
    typeof ans === "boolean"
  ) {
    return q.correctBoolean === ans;
  }

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
}

export function scoreQuiz(quizObj: Quiz, ansMap: AnswersMap): number {
  let earned = 0;
  for (const q of (quizObj.questions ?? []) as QuizQuestion[]) {
    const ans = ansMap[q._id];
    const pts = q.points ?? 1;
    if (scoreQuestion(q, ans)) {
      earned += pts;
    }
  }
  return earned;
}
