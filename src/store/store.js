import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const initialState = {
  boardConfig: [],
  selectedCandy: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    setBoardConfig(state, action) {
      state.boardConfig = action.payload;
    },
    setCurrentCandy(state, action) {
      state.selectedCandy = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});
export const boardActions = boardSlice.actions;
export default store;
