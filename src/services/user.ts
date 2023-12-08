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
    const id = Math.floor(Math.random() * 1000);
    return {
      users: [
        {
          id: id,
          name: "Lê Đức Sơn",
          avatar: "https://i.pravatar.cc/230",
          birthday: "2001-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
          numberOfBookmarks: 0,
        },
        {
          id: id + 1,
          name: "Lê Minh Đức",
          avatar: "https://i.pravatar.cc/200",
          birthday: "2000-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
          numberOfBookmarks: 10,
        },
        {
          id: id + 2,
          name: "Lương Thị Tâm",
          avatar: "https://i.pravatar.cc/250",
          birthday: "1997-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
          numberOfBookmarks: 24,
        },
        {
          id: id + 3,
          name: "Đinh Thị Thu Hà",
          avatar: "https://i.pravatar.cc/300",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: true,
          numberOfBookmarks: 5,
        },
        {
          id: id + 4,
          name: "Trịnh Huy Bằng",
          avatar: "https://i.pravatar.cc/350",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: false,
          numberOfBookmarks: 7,
        },
        {
          id: id + 5,
          name: "Ngô Bảo Đại",
          avatar: "https://i.pravatar.cc/400",
          birthday: "1999-01-01",
          gender: "male",
          level: "N2",
          nationality: "Vietnam",
          isBookmarked: true,
          numberOfBookmarks: 0,
        },
      ],
      currentPage: pagination?.currentPage || 1,
      totalPages: 10,
      pageSize: 6,
    };
  },
};

export default userService;
