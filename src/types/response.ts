import { User } from "./domain";
export type RawFilterUser = (Omit<
  User,
  "email" | "phone" | "certificate" | "province"
> & {
  bookmarked: "0" | "1";
  bookmark_count: `${number}`;
});
export type UserBasic = Omit<
  User,
  "email" | "phone" | "certificate" | "province"
> & { isBookmarked: boolean; numberOfBookmarks: number };
export type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
};
export type Response<D = unknown> = {
  statusCode: number;
  message: string;
  data: D;
  [key: string]: unknown;
};
