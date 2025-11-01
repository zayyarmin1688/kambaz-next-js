"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";

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
  assignments: (db.assignments as Assignment[]) ?? [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<
        Omit<Assignment, "_id"> & { _id?: string }
      >
    ) => {
      const a = action.payload;
      const newAssignment: Assignment = {
        _id: a._id ?? uuidv4(),
        course: a.course,
        title: a.title,
        description: a.description,
        points: a.points,
        availableFrom: a.availableFrom,
        availableUntil: a.availableUntil,
        due: a.due,
      };
      state.assignments = [newAssignment, ...state.assignments];
    },

    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const updated = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === updated._id ? { ...a, ...updated } : a
      );
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
