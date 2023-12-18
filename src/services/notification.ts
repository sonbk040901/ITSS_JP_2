import { storeService } from "@/utils";
import { Notification, Response } from "types";
import { axiosInstance } from "./axios";
const notificationService = {
  getAxiosInstance: async () => {
    const token = storeService.get<string>("token");
    if (!token) {
      throw new Error("No token found");
    }
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosInstance;
  },
  getAll: async (): Promise<Notification[]> => {
    const axiosInstance = await notificationService.getAxiosInstance();
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
