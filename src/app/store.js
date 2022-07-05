import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../sessiondata/userSlice";
import pageReducer from "../sessiondata/pageSlice";
import filesystemReducer from "../sessiondata/filesystemSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    filesystem: filesystemReducer,
  },
});
