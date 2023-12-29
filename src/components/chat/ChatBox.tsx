import { useAppDispatch, useAppSelector } from "@/states";
import {
  selectChatFriend,
  selectChatFriends,
  selectChatSelectedFriend,
  selectChatStatus,
} from "@/states/slices/chat";
import { useEffect, type FC, useRef } from "react";
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
  const lastestChatFriends = useAppSelector(selectChatFriends);
  const lastestChatFriendsRef = useRef(lastestChatFriends);
  const idRef = useRef<number | null>(null);
  useEffect(() => {
    const isChanged = lastestChatFriendsRef.current.some(
      (friend, index) =>
        friend.latestMessage?.id !==
        lastestChatFriends[index].latestMessage?.id,
    );
    lastestChatFriendsRef.current = lastestChatFriends;
    if ((chatStatus === "success" && isChanged) || idRef.current !== userId) {
      idRef.current = userId;
      userId && dispatch(selectChatFriend(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
