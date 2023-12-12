import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { userService } from "services";
import { Pagination, User, UserBasic } from "types";
import { RootState } from "..";
export type Filter = Pick<
  User,
  "level" | "gender" | "nationality" | "province"
> & {
  age?: number;
};
interface FilterState {
  status: "loading" | "success" | "error";
  filter: Filter;
  pagination: Pagination;
  results: UserBasic[];
  bookmarkStatus: "idel" | "loading" | "success" | "error";
}
const initialState: FilterState = {
  status: "loading",
  filter: {
    level: null,
    gender: null,
    nationality: null,
    province: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 6,
  },
  results: [],
  bookmarkStatus: "idel",
};
export const filterUsers = createAsyncThunk(
  "filter/filterUsers",
  async (type: "filter" | Pick<Pagination, "currentPage">, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { filter, pagination } = state.filter;
    const response = await userService.filterUsers(
      filter,
      type !== "filter"
        ? { ...pagination, currentPage: type.currentPage }
        : { ...pagination, currentPage: 1 },
    );
    return response;
  },
);
export const bookmarkUser = createAsyncThunk(
  "filter/bookmarkUser",
  async (id: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { results } = state.filter;
    const index = results.findIndex((u) => u.id === id);
    const result = results[index];
    const bookmarked = result.isBookmarked;
    await userService.bookmarkUser(id);
    result.isBookmarked = !bookmarked;
    result.numberOfBookmarks += bookmarked ? -1 : 1;
    const a = { ...result } as unknown as UserBasic;
    const i = index as unknown as number;
    return {
      index: i,
      result: a,
    };
  },
);
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(filterUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterUsers.fulfilled, (state, action) => {
        state.status = "success";
        const { users, ...pagination } = action.payload;
        state.results = users;
        state.pagination = pagination;
      })
      .addCase(filterUsers.rejected, (state) => {
        state.status = "error";
      })
      .addCase(bookmarkUser.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(bookmarkUser.fulfilled, (state, action) => {
        state.bookmarkStatus = "success";
        const { index, result } = action.payload;
        const results = [...state.results];
        results[index] = result;
        state.results = results;
      })
      .addCase(bookmarkUser.rejected, (state) => {
        state.bookmarkStatus = "error";
      }),
});
export const selectFilter = (state: RootState) => state.filter;
export const selectFilterStatus = createSelector(
  selectFilter,
  (filter) => filter.status,
);
export const selectFilterValue = createSelector(
  selectFilter,
  (filter) => filter.filter,
);
export const selectFilterResults = createSelector(
  selectFilter,
  (filter) => filter.results,
);
export const selectFilterPagination = createSelector(
  selectFilter,
  (filter) => filter.pagination,
);
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
