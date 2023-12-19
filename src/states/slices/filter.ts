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
  status: "loading" | "success" | "error" | "idle";
  filter: Filter;
  pagination: Pagination;
  results: UserBasic[];
}
const initialState: FilterState = {
  status: "idle",
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
};
export const filterUsers = createAsyncThunk(
  "filter/filterUsers",
  async (
    type:
      | "filter"
      | Partial<Pick<Pagination, "currentPage"> & { search: string }>,
    thunkApi,
  ) => {
    const state = thunkApi.getState() as RootState;
    const { filter, pagination } = state.filter;
    const response = await userService.filterUsers(
      filter,
      type === "filter"
        ? { ...pagination, currentPage: 1 }
        : type.search
        ? { ...pagination, currentPage: 1 }
        : { ...pagination, currentPage: type.currentPage || 1 },
      type !== "filter" ? type.search : undefined,
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
    clearFilter(state) {
      state.filter = initialState.filter;
    },
    updateUserInfo(
      state,
      action: PayloadAction<{ id: number; user: Partial<UserBasic> }>,
    ) {
      const index = state.results.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.results[index] = {
          ...state.results[index],
          ...action.payload.user,
        };
        state.results = [...state.results];
      }
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
export const { setFilter, clearFilter, updateUserInfo } = filterSlice.actions;
export default filterSlice.reducer;
