import type { FC } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface MessageItemProps {
  content: string;
  isMe: boolean;
  createdAt: string;
}

const MessageItem: FC<MessageItemProps> = (props) => {
  const { content, isMe, createdAt } = props;
  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div className="font-medium text-lg py-1 px-3 rounded-lg" style={{
        backgroundColor: isMe ? "#6E00FF" : "#E7E7E7",
        color: isMe ? "#fff" : "#000"
      }}>
        {content}
      </div>
      <span className="text-xs text-slate-400">
        {dayjs(createdAt).locale("ja").fromNow()}
      </span>
    </div>
  );
};

export default MessageItem;
