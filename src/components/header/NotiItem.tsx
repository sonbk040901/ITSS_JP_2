import { Button } from "antd";
import avtIcon from "assets/avatar/a1.svg";
import { FC } from "react";
import { Notification } from "types";

interface NotiItemProps {
  notification: Notification;
}

const NotiItem: FC<NotiItemProps> = ({ notification }) => {
  const { user, time, type } = notification;
  const timeString = new Date(time).toLocaleString("ja-JP");
  const mess =
    type === 1
      ? "友達リクエストを送信しました。"
      : type === 2
      ? "は友達リクエストに同意しました。"
      : "は友達リクエストを拒否しました。";
  return (
    <div className="border-b-[1px] w-full flex flex-col items-stretch gap-[1px] pt-1">
      <div className="flex flex-row justify-between gap-2">
        <span>
          <img
            src={user.avatar ?? avtIcon}
            className="w-7 rounded-full shadow-sm border-[1px]"
            alt=""
          />
        </span>
        <span className="font-semibold text-xs">
          {user.name}
          {mess}
        </span>
      </div>
      {type === 1 && (
        <div className="flex justify-around">
          <Button
            shape="round"
            size="small"
          >
            キャンセル
          </Button>
          <Button
            shape="round"
            size="small"
            type="primary"
            className=""
          >
            アクセプト
          </Button>
        </div>
      )}
      <div>
        <span className="text-xs text-slate-500">{timeString}</span>
      </div>
    </div>
  );
};

export default NotiItem;
