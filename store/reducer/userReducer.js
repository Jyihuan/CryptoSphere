import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    isLogin: false,
    userInfo: {
      username: "ttttt",
    },
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setUserInfo } = counterSlice.actions;

export default counterSlice.reducer;
