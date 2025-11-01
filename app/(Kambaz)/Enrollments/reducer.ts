"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";
import { v4 as uuidv4 } from "uuid";

export type Enrollment = {
  _id: string;
  user: string; 
  course: string;
};

type EnrollmentsState = {
  enrollments: Enrollment[];
};

const STORAGE_KEY = "kambaz_enrollments";

function load(): Enrollment[] {
  if (typeof window === "undefined") return (db.enrollments as Enrollment[]) ?? [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Enrollment[]) : ((db.enrollments as Enrollment[]) ?? []);
  } catch {
    return (db.enrollments as Enrollment[]) ?? [];
  }
}

function save(list: Enrollment[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

const initialState: EnrollmentsState = {
  enrollments: load(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      if (!state.enrollments.some(e => e.user === user && e.course === course)) {
        state.enrollments = [{ _id: uuidv4(), user, course }, ...state.enrollments];
        save(state.enrollments);
      }
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(e => !(e.user === user && e.course === course));
      save(state.enrollments);
    },
    setAll: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
      save(state.enrollments);
    },
  },
});

export const { enroll, unenroll, setAll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
