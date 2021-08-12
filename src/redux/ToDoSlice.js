import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = 
    await fetch( 'http://localhost:7000/todos')
    if ( response.ok) {
      const todos = await response.json();
      return { todos}
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: false },
    { id: 4, title: "todo4", completed: true },
    { id: 5, title: "todo 5", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false
      };
      state.push(newTodo);
    },
    toggleCompleted: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => state.filter((todo) => todo.id !== action.payload.id)
  },
  extraReducers: {
    [ getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    }
  }
});

export const {
  addTodo,
  toggleCompleted,
  deleteTodo
} = todoSlice.actions;

export default todoSlice.reducer;