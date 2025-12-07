"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type QuizQuestionChoice = {
  _id: string;
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  _id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  title: string;
  points: number;
  text: string;
  choices?: QuizQuestionChoice[]; // for MCQ
  correctBoolean?: boolean;       // for T/F
  correctAnswers?: string[];      // for fill-in-the-blank
};

export type Quiz = {
  _id: string;
  course: string;
  title: string;
  description?: string;

  quizType?: string;
  assignmentGroup?: string;
  points?: number;

  shuffleAnswers?: boolean;
  timeLimitMinutes?: number;
  multipleAttempts?: boolean;
  maxAttempts?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;

  due?: string;
  availableFrom?: string;
  availableUntil?: string;

  published?: boolean;

  questions?: QuizQuestion[];
};

type QuizzesState = {
  quizzes: Quiz[];
};

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const updated = action.payload;
      state.quizzes = state.quizzes.map((q) =>
        q._id === updated._id ? { ...q, ...updated } : q
      );
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.quizzes = state.quizzes.filter((q) => q._id !== id);
    },
  },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
