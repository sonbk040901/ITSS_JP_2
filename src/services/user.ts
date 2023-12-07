import { User } from "types/domain";
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
  }
};

export default userService;
