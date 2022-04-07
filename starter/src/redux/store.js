import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  }
})
// CREATE THE STORE, HOLD STATE AND COMBINE THE REDUCERS