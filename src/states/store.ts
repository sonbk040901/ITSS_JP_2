import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import filter from "./slices/filter";
import authForm from "./slices/authForm";
import profile from "./slices/profile";
import bookmark from "./slices/bookmark";
const store = configureStore({
  reducer: {
    auth,
    filter,
    authForm,
    profile,
    bookmark
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
