import ChatBox from "components/chat/ChatBox";
import Nav from "components/chat/Nav";
import { FC } from "react";

const Chat: FC = () => {
  return (
    <div className="flex-1 self-stretch flex items-stretch gap-2 mx-16 my-2">
      <Nav />
      <ChatBox />
    </div>
  );
};

export default Chat;
