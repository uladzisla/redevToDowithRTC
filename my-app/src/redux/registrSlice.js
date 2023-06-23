import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { login: "", password: "" },
};

export const fetchRegistr = createAsyncThunk(
  "value/fetchRegistr",
  async function (_, { rejectWithValue, dispatch, getState }) {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: getState().registr.value.username,
            email: getState().registr.value.email,
            password: getState().registr.value.password,
            gender: getState().registr.value.gender,
            age: getState().registr.value.age,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("error");
      }

      const data = response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const registrSlice = createSlice({
  name: "registr",
  initialState,
  reducers: {
    enterRegistrForm: (state, action) => {
      state.value = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        gender: action.payload.gender,
        age: action.payload.age,
      };
      console.log(state.value);
    },
  },
  extraReducers: {},
});
export const { enterRegistrForm } = registrSlice.actions;

export default registrSlice.reducer;
