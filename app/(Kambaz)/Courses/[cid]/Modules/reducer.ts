import { createSlice } from "@reduxjs/toolkit";

export type Lesson = {
  _id: string;
  name: string;
};

export type Module = {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
};

type ModulesState = {
  modules: Module[];
};

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // NEW: overwrite modules from server
    setModules: (state, { payload }: { payload: Module[] }) => {
      state.modules = payload;
    },
    addModule: (state, { payload }: { payload: Module }) => {
      state.modules = [...state.modules, payload];
    },
    deleteModule: (state, { payload }: { payload: string }) => {
      state.modules = state.modules.filter((m) => m._id !== payload);
    },
    editModule: (state, { payload }: { payload: string }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload ? { ...m, editing: true } : m
      );
    },
    updateModule: (state, { payload }: { payload: Module }) => {
      state.modules = state.modules.map((m) =>
        m._id === payload._id ? payload : m
      );
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  editModule,
  updateModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;
