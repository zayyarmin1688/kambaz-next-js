"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = [...state.enrollments, action.payload];
    },
    unenroll: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.enrollments = state.enrollments.filter((e) => e._id !== id);
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
