import { Nullable, Range } from "./util";
export type _User = {
  id: number;
  name: string;
  email: string;
  gender: 1 | 2;
  avatar: string;
  phone: string;
  level: Range<1, 6>[number];
  certificate: string;
  province: Range<1, 64>[number];
  birthday: string;
  nationality: string;
  filter?: `${number}`;
};
export type UserProfile = User & {
  friendStatus: "pending" | "accepted" | "rejected" | "none";
  isBookmarked: boolean;
};
export type User = Nullable<
  _User,
  Exclude<keyof _User, "id" | "birthday" | "filter">
>;
export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};
/**
  type: 1: friend request, 2: add friend req has been accepted, 3: add friend req has been rejected
 */
export type Notification = {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  type: Range<1, 4>[number];
  time: string;
};
