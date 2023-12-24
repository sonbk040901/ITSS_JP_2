import { useAppSelector } from "@/states";
import { selectChatSelectedFriend } from "@/states/slices/chat";
import { Avatar } from "antd";
import type { FC } from "react";

interface ChatHeaderProps {}

const ChatHeader: FC<ChatHeaderProps> = () => {
  const selectedChatFriend = useAppSelector(selectChatSelectedFriend);
  return (
    <div className="h-16 flex items-center gap-3 border-b-2">
      <Avatar
        size="large"
        className="h-14 w-14"
        src={selectedChatFriend?.avatar}
      />
      <h1>{selectedChatFriend?.name}</h1>
    </div>
  );
};

export default ChatHeader;
