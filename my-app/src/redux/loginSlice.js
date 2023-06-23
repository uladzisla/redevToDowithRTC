import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { useNavigate } from "react-router-dom";

const initialState = {
  value: { login: "", password: "" },
  data: {},
  status: null,
  errors: [],
};

export const fetchLogin = createAsyncThunk(
  "value/fetchLogin",
  async function (_, { rejectWithValue, dispatch, getState }) {
    // const token = localStorage.getItem("token");
    // const navigate = useNavigate();
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: getState().login.value.email,
            password: getState().login.value.password,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw data;
      }
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    enterLoginForm: (state, action) => {
      state.value = {
        email: action.payload.email,
        password: action.payload.password,
      };
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "resolved";

      localStorage.setItem("token", action.payload.token);
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "rejected";
      // console.log(action.payload);
      if (action.payload.message) {
        state.errors = action.payload.message;
      } else {
        action.payload.errors.forEach((error) => {
          console.log(error);
          return state.errors.push(error);
        });
      }

      // action.payload.errors.forEach((error) => state.errors.push(error));
    },
  },
});
export const { enterLoginForm } = loginSlice.actions;

export default loginSlice.reducer;
