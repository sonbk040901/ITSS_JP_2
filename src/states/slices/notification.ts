import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Notification } from "types";
import { RootState } from "..";
import { notificationService } from "services";
interface NotificationState {
  status: "idle" | "loading" | "success" | "error";
  data: Notification[];
}
const initialState: NotificationState = {
  status: "idle",
  data: [],
};
export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  notificationService.getAll,
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchNotification.rejected, (state) => {
        state.status = "error";
      }),
});
export const selectNotification = (state: RootState) => state.notification;
export const selectNotificationData = createSelector(
  selectNotification,
  (notification) => notification.data,
);
export default notificationSlice.reducer;
