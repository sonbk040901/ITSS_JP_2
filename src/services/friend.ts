import { getAxiosInstance } from "./axios";
const friendService = {
  addFriend: async (id: number) => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance.post(`/users/${id}/friends`);
  },
  cancelFriendRequest: async (id: number) => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance.delete(`/users/${id}/friends`);
  },
  acceptAddFriend: async (id: number) => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance.patch(`/users/${id}/friends`, {
      status: 3,
    });
  },
  rejectAddFriend: async (id: number) => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance.patch(`/users/${id}/friends`, {
      status: 2,
    });
  },
} satisfies Record<string, (...args: never[]) => Promise<unknown>>;
export default friendService;
