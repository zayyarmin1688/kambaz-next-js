import { createSlice } from "@reduxjs/toolkit";
import { courses as seed } from "../Database";

export type Course = {
  _id: string;
  name: string;
  description: string;
  image?: string;
};

type CoursesState = {
  courses: Course[];
};

const initialState: CoursesState = { courses: seed as Course[] };

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload }: { payload: Course }) => {
      state.courses = [...state.courses, payload];
    },
    deleteCourse: (state, { payload }: { payload: string }) => {
      state.courses = state.courses.filter(c => c._id !== payload);
    },
    updateCourse: (state, { payload }: { payload: Course }) => {
      state.courses = state.courses.map(c => (c._id === payload._id ? payload : c));
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
