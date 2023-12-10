import { Nullable, Range } from "./util";
type _User = {
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
};
export type User = Nullable<_User, Exclude<keyof _User, "id" | "birthday">>;
export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};
