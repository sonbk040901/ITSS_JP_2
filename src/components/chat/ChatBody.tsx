import { useAppDispatch, useAppSelector } from "@/states";
import { selectAuthUserId } from "@/states/slices/auth";
import {
  resetChatSelectedFriendMessagesStatus,
  selectChatSelectedFriendMessages,
  selectChatSelectedFriendMessagesStatus,
} from "@/states/slices/chat";
import { Spin } from "antd";
import { useEffect, useRef, type FC } from "react";
import MessageItem from "./MessageItem";
interface ChatBodyProps {}

const ChatBody: FC<ChatBodyProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectChatSelectedFriendMessagesStatus);
  const messages = useAppSelector(selectChatSelectedFriendMessages);
  const authUser = useAppSelector(selectAuthUserId)!;
  useEffect(() => {
    if (status !== "success") {
      return;
    }
    ref.current?.scrollTo({
      behavior: "smooth",
      top: ref.current.scrollHeight,
    }); 
  }, [dispatch, status]);
  if (status === "idle") {
    return (
      <div className="flex-1 grid place-items-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className="flex-1 flex flex-col-reverse gap-5 overflow-scroll p-2"
    >
      {messages.map((message) => {
        return (
          <MessageItem
            key={message.id}
            {...message}
            isMe={authUser === message.senderId}
          />
        );
      })}
    </div>
  );
};

export default ChatBody;
