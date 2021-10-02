import { configureStore } from "@reduxjs/toolkit";
import { redditApi } from "../features/reddit/redditApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: { [redditApi.reducerPath]: redditApi.reducer },
});

setupListeners(store.dispatch);
