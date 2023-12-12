import { Pagination, User, UserBasic, Response, RawFilterUser } from "types";
import { storeService } from "utils";
import { axiosInstance } from "./axios";
import { Filter } from "@/states/slices/filter";
const userService = {
  auth: async (): Promise<User> => {
    const token = storeService.get<string>("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axiosInstance.get<User>("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterUsers: async (
    filter: Filter,
    pagination?: Pagination,
  ): Promise<{ users: UserBasic[] } & Pagination> => {
    const token = storeService.get<string>("token");
    if (!token) {
      throw new Error("No token found");
    }
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
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    const users = data.data.map((u): UserBasic => {
      return {
        ...u,
        isBookmarked: u.bookmarked === "1",
        numberOfBookmarks: Number(u.bookmark_count),
      };
    });
    console.log(data);

    return {
      users,
      currentPage: pagination?.currentPage || 1,
      totalPages: data.meta.pageCount,
      pageSize: data.meta.take || 6,
    };
  },
  getUser: async (id: string): Promise<User> => {
    const token = storeService.get<string>("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axiosInstance.get<Response<User>>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // TODO: Data trả về thiếu mail, sai trường phone
    console.log(response.data.data);

    return response.data.data;
  },
  bookmarkUser: async (id: number): Promise<void> => {
    const token = storeService.get<string>("token");
    if (!token) {
      throw new Error("No token found");
    }
    await axiosInstance.post(
      `/bookmarks`,
      {
        receiver_id: id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  },
};

export default userService;
// {
//   users: [
//     {
//       id: id,
//       name: "Lê Đức Sơn",
//       avatar: "https://i.pravatar.cc/230",
//       birthday: "2001-01-01",
//       gender: 1,
//       level: 2,
//       nationality: "Vietnam",
//       isBookmarked: false,
//       numberOfBookmarks: 0,
//     },
//     {
//       id: id + 1,
//       name: "Lê Minh Đức",
//       avatar: "https://i.pravatar.cc/200",
//       birthday: "2000-01-01",
//       gender: "male",
//       level: "N2",
//       nationality: "Vietnam",
//       isBookmarked: false,
//       numberOfBookmarks: 10,
//     },
//     {
//       id: id + 2,
//       name: "Lương Thị Tâm",
//       avatar: "https://i.pravatar.cc/250",
//       birthday: "1997-01-01",
//       gender: "male",
//       level: "N2",
//       nationality: "Vietnam",
//       isBookmarked: false,
//       numberOfBookmarks: 24,
//     },
//     {
//       id: id + 3,
//       name: "Đinh Thị Thu Hà",
//       avatar: "https://i.pravatar.cc/300",
//       birthday: "1999-01-01",
//       gender: "male",
//       level: "N2",
//       nationality: "Vietnam",
//       isBookmarked: true,
//       numberOfBookmarks: 5,
//     },
//     {
//       id: id + 4,
//       name: "Trịnh Huy Bằng",
//       avatar: "https://i.pravatar.cc/350",
//       birthday: "1999-01-01",
//       gender: "male",
//       level: "N2",
//       nationality: "Vietnam",
//       isBookmarked: false,
//       numberOfBookmarks: 7,
//     },
//     {
//       id: id + 5,
//       name: "Ngô Bảo Đại",
//       avatar: "https://i.pravatar.cc/400",
//       birthday: "1999-01-01",
//       gender: "male",
//       level: "N2",
//       nationality: "Vietnam",
//       isBookmarked: true,
//       numberOfBookmarks: 0,
//     },
//   ],
//   currentPage: pagination?.currentPage || 1,
//   totalPages: 10,
//   pageSize: 6,
// };
