import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userId = action.payload.id;
    },
    setUserLogOutState: (state) => {
      console.log(state.userId);
      state.userId = null;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;
export const selectUserId = (state) => state.user.userId;
export default userSlice.reducer;
