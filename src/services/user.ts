import { Pagination, User, UserBasic, Response, RawFilterUser } from "types";
import { storeService } from "utils";
import { getAxiosInstance, axiosInstance } from "./axios";
import { Filter } from "@/states/slices/filter";
import { FriendLatestChat, Message, UserProfile } from "@/types/domain";
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
        isBookmarked: u.bookmarked == "1",
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
      isBookmarked: response.data.data.bookmarked == "1",
      friendStatus: (["none", "pending", "rejected", "accepted"] as const)[
        response.data.data.friend_status || 0
      ],
    };
  },
  bookmarkUser: async (id: number, bookmark: boolean): Promise<void> => {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance[bookmark ? "post" : "delete"](`/users/${id}/bookmarks`);
  },
  getLatestChats: async (): Promise<FriendLatestChat[]> => {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<
      Response<
        {
          id: number;
          name: string;
          avatar: string;
          friend_updated_at: string;
          last_message: null | {
            id: number;
            sender_id: number;
            receiver_id: number;
            content: string;
            created_at: string;
          };
        }[]
      >
    >("/users/friends");
    return response.data.data
      .map((c) => ({
        ...c,
        latestMessage: c.last_message
          ? {
              ...c.last_message,
              senderId: c.last_message.sender_id,
              receiverId: c.last_message.receiver_id,
              createdAt: c.last_message.created_at,
            }
          : undefined,
      }))
      .sort((a, b) => {
        if (!a.latestMessage) {
          return 1;
        }
        if (!b.latestMessage) {
          return -1;
        }
        return (
          new Date(b.latestMessage.createdAt).getTime() -
          new Date(a.latestMessage.createdAt).getTime()
        );
      });
  },
  getChat: async (id: number): Promise<Message[]> => {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get<
      Response<
        {
          id: number;
          sender_id: number;
          receiver_id: number;
          content: string;
          created_at: string;
        }[]
      >
    >(`/users/${id}/chats`);
    return response.data.data.map(
      ({ receiver_id, sender_id, created_at, ...m }) => ({
        ...m,
        senderId: sender_id,
        receiverId: receiver_id,
        createdAt: created_at,
      }),
    );
  },
  sendMessage: async ({
    id,
    content,
  }: {
    id: number;
    content: string;
  }): Promise<Message> => {
    const axiosInstance = await getAxiosInstance();
    const res = await axiosInstance.post<{
      data: {
        id: number;
        sender_id: number;
        receiver_id: number;
        content: string;
        created_at: string;
      };
    }>(`/users/${id}/chats`, { content });
    return {
      ...res.data.data,
      senderId: res.data.data.sender_id,
      receiverId: res.data.data.receiver_id,
      createdAt: res.data.data.created_at,
    };
  },
};
export default userService;
