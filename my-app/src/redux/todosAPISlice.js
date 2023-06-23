import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todosAPI/fetchTodos",
  async function (_, { rejectWithValue }) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw data;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAddToDoAPI = createAsyncThunk(
  "todos/addToDoAPI",
  async function (title, { rejectWithValue, dispatch }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(addTodo({ title }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteToDoAPI = createAsyncThunk(
  "todosAPI/fetchDeleteToDoAPI",
  async function (id, { rejectWithValue, dispatch }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      dispatch(deleteToDo(id));

      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditTask = createAsyncThunk(
  "todosAPI/fetchEditTask",
  async function ({ id, text }, { rejectWithValue, dispatch }) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: text }),
        }
      );
      dispatch(saveEditTask(id, text));
      console.log({ id, text });
      if (!response.ok) {
        const data = await response.json();

        console.log(data);
        throw new Error("Can't delete task. Server error.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  todosAPI: [],
  status: null,
  error: null,
};

export const todosAPISlice = createSlice({
  name: "todosAPI",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todosAPI.push({
        id: action.payload.id,
        title: action.payload.title,
      });
    },
    deleteToDo: (state, action) => {
      state.todosAPI = state.todosAPI.filter(
        (item) => item.id !== action.payload
      );
    },
    saveEditTask: (state, action) => {
      state.todosAPI = state.todosAPI.map((item) =>
        item.id === action.payload.id
          ? { ...state.todosAPI, title: action.payload.text }
          : item
      );
      console.log(action.payload);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todosAPI = [...action.payload];
    },

    [fetchTodos.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [fetchAddToDoAPI.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
    [fetchDeleteToDoAPI.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
  },
});
export const { addTodo, deleteToDo, saveEditTask } = todosAPISlice.actions;

export default todosAPISlice.reducer;
