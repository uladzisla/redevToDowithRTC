import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const editTextSlice = createSlice({
  name: "editText",
  initialState,
  reducers: {
    enterEditText: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { enterEditText } = editTextSlice.actions;

export default editTextSlice.reducer;
