import { FriendLatestChat } from "@/types";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import type { FC } from "react";
import { NavLink } from "react-router-dom";
dayjs.extend(relativeTime);

interface FriendItemProps extends FriendLatestChat {}

const FriendItem: FC<FriendItemProps> = (props) => {
  const { id, name, avatar, latestMessage } = props;
  return (
    <NavLink
      to={`/chat/${id}`}
      className="p-2 rounded-md shadow-sm border-b-2 flex gap-2 items-center transition-all duration-300 hover:bg-slate-50 [&.active]:bg-slate-200"
    >
      <img
        className="rounded-full w-8 h-8"
        src={avatar}
        alt="avatar"
      />
      <div className="flex flex-col flex-1">
        <span className="text-slate-950 font-semibold">{name}</span>
        <span className=" text-slate-600 truncate">
          {latestMessage?.content}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch text-xs">
        <span className="text-slate-400">
          {latestMessage &&
            dayjs(latestMessage.createdAt).locale("ja").fromNow()}
        </span>
        <CheckOutlined/>
      </div>
    </NavLink>
  );
};

export default FriendItem;
