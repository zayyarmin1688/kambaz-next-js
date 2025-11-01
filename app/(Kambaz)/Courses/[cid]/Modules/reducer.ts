"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export type Lesson = { _id: string; name: string };
export type Module = {
  _id: string;
  course: string;   
  name: string;
  lessons?: Lesson[];
  editing?: boolean;   
};

type ModulesState = {
  modules: Module[];
};

const initialState: ModulesState = {
  modules: db.modules as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<{ course: string; name: string }>) => {
      const { course, name } = action.payload;
      const newModule: Module = {
        _id: uuidv4(),
        course,
        name,
        lessons: [],
      };
      state.modules = [newModule, ...state.modules] as Module[];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.modules = state.modules.filter((m) => m._id !== id) as Module[];
    },
    editModule: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === id ? { ...m, editing: true } : m
      ) as Module[];
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const mod = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === mod._id ? { ...m, ...mod } : m
      ) as Module[];
    },
  },
});

export const { addModule, deleteModule, editModule, updateModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
