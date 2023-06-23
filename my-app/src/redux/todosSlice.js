import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: 1,
      text: "first task",
      status: true,
    },
  ],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value.push({
        id: Math.random(),
        text: action.payload,
        status: false,
      });
    },
    deleteToDo: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    saveEditTask: (state, action) => {
      console.log("text", action.payload);
      state.value = state.value.map((item) =>
        item.id === action.payload.id
          ? { ...item, text: action.payload.text }
          : item
      );
    },
  },
});
export const { addTodo, deleteToDo, saveEditTask } = todosSlice.actions;

export default todosSlice.reducer;
