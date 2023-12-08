import { Pagination, User, UserBasic } from "types";
import { storeService } from "utils";
const userService = {
  auth: async (): Promise<User> => {
    // const token = storeService.get<string>("token");
    // if (!token) {
    //   throw new Error("No token found");
    // }
    // TODO: call API to get user info
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: 1,
      name: "John Doe",
      email: "leducson007@gmai.com",
      avatar: "https://i.pravatar.cc/300",
      phone: "0123456789",
    };
  },
  logout: async (): Promise<void> => {
    storeService.remove("token");
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterUsers: async (
    filter: unknown,
    pagination?: Pagination,
  ): Promise<{ users: UserBasic[] } & Pagination> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      users: [
        {
          id: 1,
          name: "John Doe 1",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
        {
          id: 2,
          name: "John Doe 2",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
        {
          id: 3,
          name: "John Doe 3",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
        {
          id: 4,
          name: "John Doe 4",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
        {
          id: 5,
          name: "John Doe 5",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
        {
          id: 6,
          name: "John Doe 6",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
        },
      ],
      currentPage: pagination?.currentPage || 1,
      totalPages: 10,
      pageSize: 6,
    };
  },
};

export default userService;
