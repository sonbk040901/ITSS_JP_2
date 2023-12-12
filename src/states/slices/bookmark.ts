import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { userService } from "services";
import { RootState } from "..";
interface BookmardState {
  status: "idle" | "loading" | "success" | "error";
  id: number | null;
}
const initialState: BookmardState = {
  status: "idle",
  id: null,
};
export const togleBookmard = createAsyncThunk(
  "bookmark/togleBookmard",
  async (id: number) => {
    await userService.bookmarkUser(id);
    return id;
  },
);
const bookmarkSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetBookmark: (state) => {
      state.status = "idle";
      state.id = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(togleBookmard.pending, (state, action) => {
        state.status = "loading";
        state.id = action.meta.arg;
      })
      .addCase(togleBookmard.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(togleBookmard.rejected, (state) => {
        state.status = "error";
      }),
});
export const selectBookmark = (state: RootState) => state.bookmark;
export const selectBookmarkId = createSelector(
  selectBookmark,
  (bookmark) => bookmark.id,
);
export const selectBookmarkStatus = createSelector(
  selectBookmark,
  (bookmark) => bookmark.status,
);
export const { resetBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
