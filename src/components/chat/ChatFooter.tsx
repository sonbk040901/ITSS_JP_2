import { useAppDispatch, useAppSelector } from "@/states";
import { selectChatSelectedFriend, sendMessage } from "@/states/slices/chat";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState, type FC, type FormEvent } from "react";

interface ChatFooterProps {}

const ChatFooter: FC<ChatFooterProps> = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const selectedChatFriend = useAppSelector(selectChatSelectedFriend);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !selectedChatFriend?.id) return;
    dispatch(
      sendMessage({
        id: selectedChatFriend?.id,
        content: message,
      }),
    );
    setMessage("");
  };
  return (
    <form
      className=""
      onSubmit={handleSubmit}
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        size="large"
        className="rounded-lg"
        placeholder="ここにメッセージ内容を入力..."
        suffix={
          <Button
            type="primary"
            ghost
            shape="circle"
            htmlType="submit"
          >
            <SendOutlined />
          </Button>
        }
      />
    </form>
  );
};

export default ChatFooter;
