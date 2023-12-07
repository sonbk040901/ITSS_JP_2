import { Range } from "./util";

export type User = {
  id: number;
  name: string;
  email: string;
  gender?: "male" | "female";
  avatar?: string;
  phone?: string;
  level?: `N${Range<1, 6>[number]}`;
  certificate?: string;
  province?: Range<1, 64>[number];
  birthday?: string;
  nationality?: string;
};
export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};
