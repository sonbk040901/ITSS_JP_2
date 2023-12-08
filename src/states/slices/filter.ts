import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { userService } from "services";
import { Pagination, User, UserBasic } from "types";
import { RootState } from "..";
type Filter = Pick<User, "level" | "gender" | "nationality" | "province"> & {
  age?: number;
};
interface FilterState {
  status: "loading" | "success" | "error";
  filter: Filter;
  pagination: Pagination;
  results: UserBasic[];
}
const initialState: FilterState = {
  status: "loading",
  filter: {},
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 1,
  },
  results: [],
};
export const filterUsers = createAsyncThunk(
  "filter/filterUsers",
  async (type: "filter" | Pick<Pagination, "currentPage">, thunkApi) => {
    const state = thunkApi.getState() as FilterState;
    const { filter, pagination } = state;
    const response = await userService.filterUsers(
      filter,
      type !== "filter"
        ? { ...pagination, currentPage: type.currentPage }
        : pagination,
    );
    return response;
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
        state.status ="loading";
      })
      .addCase(filterUsers.fulfilled, (state, action) => {
        state.status = "success";
        const { users, ...pagination } = action.payload;
        state.results = users;
        state.pagination = pagination;
      })
      .addCase(filterUsers.rejected, (state) => {
        state.status = "error";
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
export default filterSlice.reducer;
