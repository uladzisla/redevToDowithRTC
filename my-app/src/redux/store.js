import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import todosSlice from "./todosSlice";
import editTextSlice from "./editTextSlice";
import loginSlice from "./loginSlice";
import todosAPISlice from "./todosAPISlice";
import registrSlice from "./registrSlice";
export const store = configureStore({
  reducer: {
    text: textSlice,
    todos: todosSlice,
    editText: editTextSlice,
    login: loginSlice,
    todosAPI: todosAPISlice,
    registr: registrSlice,
  },
});
