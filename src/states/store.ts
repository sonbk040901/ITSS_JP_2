import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import authForm from "./slices/authForm";
import bookmark from "./slices/bookmark";
import chat from "./slices/chat";
import filter from "./slices/filter";
import notification from "./slices/notification";
import personalProfile from "./slices/personalProfile";
import profile from "./slices/profile";
const store = configureStore({
  reducer: {
    auth,
    filter,
    authForm,
    profile,
    bookmark,
    notification,
    chat,
    personalProfile,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
