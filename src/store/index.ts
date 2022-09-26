import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubReducer } from "./github/github.slice";

const rootReducer = combineReducers({
  [githubApi.reducerPath]: githubApi.reducer,
  github: githubReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  });
};
setupListeners(setupStore().dispatch);
const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
