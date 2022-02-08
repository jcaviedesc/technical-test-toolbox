import { configureStore } from '@reduxjs/toolkit'
import fileReducer from './filesSlice';

const store = configureStore({
  reducer: fileReducer
})

export default store;
