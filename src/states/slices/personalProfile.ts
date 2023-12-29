import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import { userService } from "services";
import { User } from "types/domain";
import { RootState } from "..";

interface PersonalProfileState {
  status: "loading" | "idle" | "modify";
  userInfo?: User;
}
const initialState: PersonalProfileState = {
  status: "loading",
  userInfo: undefined,
};
export const fetchUserInfo = createAsyncThunk(
  "personalProfile/fetchUserInfo",
  userService.auth,
);

export const personalProfileSlice = createSlice({
  name: "personalProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
});
export const selectPersonalProfile = (state: RootState) =>
  state.personalProfile;

export default personalProfileSlice.reducer;
