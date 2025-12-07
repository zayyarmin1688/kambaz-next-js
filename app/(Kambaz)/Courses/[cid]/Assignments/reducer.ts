"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  availableFrom?: string;
  availableUntil?: string;
  due?: string;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  // now populated from the server, not from Database
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // used after calling findAssignmentsForCourse on the server
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },

    // used after createAssignmentForCourse returns the new assignment
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [action.payload, ...state.assignments];
    },

    // used after updating an assignment on the server
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? { ...a, ...updated } : a
      );
    },

    // used after deleteAssignmentOnServer succeeds
    deleteAssignment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
