import { useAppDispatch, useAppSelector } from "@/states";
import {
  selectChatFriend,
  selectChatSelectedFriend,
  selectChatStatus,
} from "@/states/slices/chat";
import { useEffect, type FC } from "react";
import { useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

interface ChatBoxProps {}

const ChatBox: FC<ChatBoxProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userId = Number.isNaN(Number(id)) ? null : Number(id);
  const selectedChatFriend = useAppSelector(selectChatSelectedFriend);
  const chatStatus = useAppSelector(selectChatStatus);
  useEffect(() => {
    if (chatStatus === "success") userId && dispatch(selectChatFriend(userId));
  }, [dispatch, userId, chatStatus]);
  if (!selectedChatFriend) {
    return <h1>Not Found!!</h1>;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

export default ChatBox;
