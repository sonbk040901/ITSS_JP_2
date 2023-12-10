import { userService } from "services";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { User } from "types/domain";
import { RootState } from "..";

interface ProfileState {
  status: "loading" | "idle" | "modify";
  userInfo?: User;
}
const initialState: ProfileState = {
  status: "loading",
  userInfo: undefined,
};
export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  userService.getUser,
);

export const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "idle";
      }),
});
export const selectProfile = (state: RootState) => state.profile;
export const selectProfileStatus = createSelector(
  selectProfile,
  (auth) => auth.status,
);
export const selectProfileUserInfo = createSelector(
  selectProfile,
  (auth) => auth.userInfo,
);

export default profileSlice.reducer;
