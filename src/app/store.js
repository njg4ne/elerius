import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import pageReducer from "../features/pageSlice";
import filesystemReducer from "../features/filesystemSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    filesystem: filesystemReducer,
  },
});
