import { userService } from "services";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "types/domain";
import { RootState } from "..";

interface AuthState {
  status: "loading" | "success" | "error";
  updateStatus: "idle" | "loading" | "success" | "error";
  userInfo: null | User; // for user object
  userToken: null | string; // for storing the JWT
  error: null | object;
}
const initialState: AuthState = {
  status: "loading",
  updateStatus: "idle",
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
};
export const fetchUser = createAsyncThunk("auth/fetchUser", userService.auth);
export const logout = createAsyncThunk("auth/logout", userService.logout);
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  userService.updateUserInfo,
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.status = "error";
        state.userInfo = null;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error;
      }),
});
export const selectAuth = (state: RootState) => state.auth;
export const selectAuthStatus = createSelector(
  selectAuth,
  (auth) => auth.status,
);
export const selectAuthUserInfo = createSelector(
  selectAuth,
  (auth) => auth.userInfo,
);
export const selectAuthUserId = createSelector(
  selectAuthUserInfo,
  (userInfo) => userInfo?.id,
);
export const selectAuthUpdateStatus = createSelector(
  selectAuth,
  (auth) => auth.updateStatus,
);
export default authSlice.reducer;
