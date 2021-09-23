import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState, RssFeed, RssFolder } from "../../types/common";

export const initialState: CommonState = {
  rssFeeds: [],
  rssFolders: [],
  currentFolderId: undefined,
  currentRssFeedId: undefined,
  loading: true,
  currentRssData: "",
  errors: {},
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    loadingStarted(state: CommonState) {
      state.loading = true;
    },
    loadingFinshed(state: CommonState) {
      state.loading = false;
    },
    setRssFeeds(state: CommonState, action: PayloadAction<RssFeed[]>) {
      state.rssFeeds = action.payload;
    },
    setRssFolders(state: CommonState, action: PayloadAction<RssFolder[]>) {
      state.rssFolders = action.payload;
    },
    setCurrentRssFeedId(state: CommonState, action: PayloadAction<string>) {
      state.currentRssFeedId = action.payload;
    },
    setCurrentFolderId(state: CommonState, action: PayloadAction<string>) {
      state.currentFolderId = action.payload;
    },
    setCurrentRssData(state: CommonState, action: PayloadAction<string>) {
      state.currentRssData = action.payload;
    },
    setError(state: CommonState, action: PayloadAction<any>) {
      state.errors = action.payload;
    },
  },
});

export default commonSlice;
