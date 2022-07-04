import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folder: false,
  file: false,
  saved: null,
};

const filesystemSlice = createSlice({
  name: "filesystem",
  initialState,
  reducers: {
    setFolder: (state, action) => {
      state.folder = action.payload.folder;
    },
  },
});

export const { setFolder } = filesystemSlice.actions;
export const selectFolder = (state) => state.filesystem.folder;
export default filesystemSlice.reducer;
