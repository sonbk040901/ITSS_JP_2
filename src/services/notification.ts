import { Notification } from "types";
const notificationService = {
  getAll: async (): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: 1, senderId: 2, type: 1, time: "2023-11-20, 9:25:00" },
      {
        id: 2,
        senderId: 3,
        type: 2,
        time: "2023-11-20, 9:25:00",
      },
      {
        id: 3,
        senderId: 4,
        type: 3,
        time: "2023-11-20, 9:25:00",
      },
    ];
  },
} satisfies Record<string, (...args: never[]) => Promise<unknown>>;
export default notificationService;
