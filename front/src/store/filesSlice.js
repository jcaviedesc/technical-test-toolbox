import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: true,
    errorMessage: "",
  },
  reducers: {
    loadFiles: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.files = action.payload;
      state.loading = false;
    },
    loadingFiles: state => {
      state.loading = true
    },
    loadFilesFailed: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload
    },
    cleanErrorMessage: state => {
      state.errorMessage = ""
    }
  }
})

export const selectFiles = state => state;

export const {
  loadFiles,
  loadingFiles,
  loadFilesFailed, 
  cleanErrorMessage
} = filesSlice.actions

export default filesSlice.reducer;
