// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/Take/types.ts

export type AnswersMap = Record<string, string | boolean>;

export type QuizAttemptAnswer = {
  questionId: string;
  selectedOptionIds?: string[];
  textAnswer?: string;
};

export type QuizAttempt = {
  _id: string;
  quizId: string;
  userId: string;
  attemptNumber: number;
  submittedAt: string;
  score: number;
  maxScore: number;
  answers: QuizAttemptAnswer[];
};
