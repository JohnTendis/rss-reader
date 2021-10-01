import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimpleState } from "../../types/simple";

export const initialState: SimpleState = {
  currentRssFeedUrl: "",
};

const simpleSlice = createSlice({
  name: "simple",
  initialState,
  reducers: {
    setCurrentRssFeedUrl(state: SimpleState, action: PayloadAction<string>) {
      state.currentRssFeedUrl = action.payload;
    },
  },
});

export default simpleSlice;
