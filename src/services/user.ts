import { Pagination, User, UserBasic, Response, RawFilterUser } from "types";
import { storeService } from "utils";
import { getAxiosInstance, axiosInstance } from "./axios";
import { Filter } from "@/states/slices/filter";
import { UserProfile } from "@/types/domain";
const userService = {
  auth: async (): Promise<User> => {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<User>("/auth/profile");
    return response.data;
  },
  login: async (form: {
    username?: string;
    password?: string;
  }): Promise<void> => {
    const response = await axiosInstance.post("/auth/login", form);
    storeService.store("token", response.data.access_token);
  },
  logout: async (): Promise<void> => {
    storeService.remove("token");
  },
  filterUsers: async (
    filter: Filter,
    pagination?: Pagination,
    search?: string,
  ): Promise<{ users: UserBasic[] } & Pagination> => {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<
      Response<RawFilterUser[]> & {
        meta: {
          take?: number;
          itemCount: number;
          pageCount: number;
          hasPreviousPage: boolean;
          hasNextPage: boolean;
        };
      }
    >("/users", {
      params: {
        take: pagination?.pageSize,
        skip: pagination
          ? (pagination?.currentPage - 1) * pagination.pageSize
          : 0,
        ...filter,
        search,
      },
    });
    const data = response.data;
    const users = data.data.map((u): UserBasic => {
      return {
        ...u,
        isBookmarked: u.bookmarked === "1",
        numberOfBookmarks: Number(u.bookmark_count),
      };
    });
    return {
      users,
      currentPage: pagination?.currentPage || 1,
      totalPages: data.meta.pageCount,
      pageSize: data.meta.take || 6,
    };
  },
  getUserProfile: async (id: string): Promise<UserProfile> => {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<
      Response<
        Omit<UserProfile, "isBookmarked"> & {
          bookmarked: "0" | "1";
          friend_status: 1 | 2 | 3;
        }
      >
    >(`/users/${id}`);
    return {
      ...response.data.data,
      isBookmarked: response.data.data.bookmarked === "1",
      friendStatus: (["none", "pending", "rejected", "accepted"] as const)[
        response.data.data.friend_status || 0
      ],
    };
  },
  bookmarkUser: async (id: number, bookmark: boolean): Promise<void> => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance[bookmark ? "post" : "delete"](`/users/${id}/bookmarks`);
  },
};
export default userService;
