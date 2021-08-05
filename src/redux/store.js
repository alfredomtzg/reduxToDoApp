import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './ToDoSlice'

export default configureStore({
  reducer:{
    todos: todoReducer, 
  }
})