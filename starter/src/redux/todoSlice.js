import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://localhost:7000/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			return { id: payload.id };
		}
	}
);

const todoSlice = createSlice({
  // THE CREATESLICE FUNCTION CREATES ACTIONS BASED ON THE REDUCER NAMES
  name: "todos",
  initialState: [],

  reducers: {
    // RESPONDS TO THE ACTION, TAKES THE CURRENT STATE, AND CREATES NEW STATE BASED ON THE ACTION PAYLOAD

    // THE STATE IS THE CURRENT STATE OF THIS SLICE, AND THE ACTION CONTAINS THE TYPE AND THE PAYLOAD

    //WHEN WE DISPATCH THE ADDTODO ACTION, THIS IS THE REDUCER THAT HANDLES THAT ACTION
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
      // REDUX WILL TAKE THIS NEW STATE AND UPDATE THE STORE
    },
    // CHECK DONE
    toggleComplete: (state, action) => {
      //WILL PASS AND ID AS PART OF THE ACTION PAYLOAD
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      // RETURN BECAUSE GIVE A NEW ARRAY
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
