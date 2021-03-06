import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import commonSlice from "./slices/common";
import simpleSlice from "./slices/simple";

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  simple: simpleSlice.reducer,
});

const logger = createLogger();

const middlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
