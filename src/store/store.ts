import { configureStore } from "@reduxjs/toolkit";

import synonymsSlice from "./synonymsSlice";

export const store = configureStore({
  reducer: {
    synonyms: synonymsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
