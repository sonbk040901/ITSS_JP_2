import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import filter from "./slices/filter";
const store = configureStore({
  reducer: {
    auth,
    filter,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
