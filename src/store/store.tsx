import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from "../components/game/GameSlice";
import thunk from "redux-thunk";

export const reducer = combineReducers({ game: gameReducer });

export const store = configureStore({
  reducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof reducer>;

export default store;
