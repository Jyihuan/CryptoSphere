import { createSlice } from "@reduxjs/toolkit";

export const holdingsSlice = createSlice({
  name: "holdings",
  initialState: {
    holdings: [{ symbol: "ARKB" }], //收藏列表
    cryptoList: [], // 所有的虚拟币的列表
  },
  reducers: {
    addHoding: (state, { payload }) => {
      state.holdings = [...state.holdings, payload];
    },
    removeHoding: (state, { payload }) => {
      state.holdings = state.holdings.filter((hold) => hold.symbol !== payload.symbol);
    },
    removeAll: (state) => {
      state.holdings = [];
    },
    saveCryptoList: (state, { payload }) => {
      state.cryptoList = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHoding, removeHoding, removeAll, saveCryptoList } = holdingsSlice.actions;

export default holdingsSlice.reducer;
