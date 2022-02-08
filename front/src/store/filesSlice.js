import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: true,
  },
  reducers: {
    loadFiles: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.files = action.payload;
    },
  }
})

export const selectFiles = state => state.files;

export const { loadFiles } = filesSlice.actions

export default filesSlice.reducer;
