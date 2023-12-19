import { Notification, Response } from "types";
import { getAxiosInstance } from "./axios";
const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    const axiosInstance = await getAxiosInstance();
    const { data } = await axiosInstance.get<
      Response<(Omit<Notification, "user"> & Notification["user"])[]>
    >("/notifications");
    return data.data.map(({ time, type, ...user }) => ({
      id: user.id,
      time,
      type,
      user,
    }));
  },
} satisfies Record<string, (...args: never[]) => Promise<unknown>>;
export default notificationService;
