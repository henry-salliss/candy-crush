import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardConfig: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    setBoardConfig(state, action) {
      state.boardConfig = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});
export const boardActions = boardSlice.actions;
export default store;
