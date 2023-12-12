import avt from "@/assets/avatar/a1.svg";
import heartBlack from "@/assets/heart-black.svg";
import heartRed from "@/assets/heart-red.svg";
import { useAppDispatch, useAppSelector } from "@/states";
import {
  resetBookmark,
  selectBookmarkId,
  selectBookmarkStatus,
  togleBookmard,
} from "@/states/slices/bookmark";
import { nationality } from "@/utils";
import { Badge, Button, Card, Skeleton, message } from "antd";
import { ArgsProps } from "antd/es/message";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserBasic } from "types";
type UserItemProps = UserBasic & { loading?: boolean };

const UserItem: FC<UserItemProps> = ({
  id,
  avatar,
  name,
  gender,
  birthday,
  level,
  nationality: nationalityProp,
  isBookmarked: isBookmarkedProp,
  numberOfBookmarks,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const bookmarkStatus = useAppSelector(selectBookmarkStatus);
  const bookmarkId = useAppSelector(selectBookmarkId);
  const dispatch = useAppDispatch();
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedProp);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const navigate = useNavigate();
  useEffect(() => {
    if (bookmarkId !== id || bookmarkStatus === "idle") return;
    const messProps: ArgsProps =
      bookmarkStatus === "loading"
        ? {
            key,
            type: "loading",
            content: isBookmarked
              ? "ブックマークを解除しています"
              : "ブックマークしています",
          }
        : bookmarkStatus === "success"
        ? {
            key,
            type: "success",
            content: isBookmarked
              ? "ブックマークしました"
              : "ブックマークを解除しました",
          }
        : {
            key,
            type: "error",
            content: isBookmarked
              ? "ブックマークに失敗しました"
              : "友達ではありませんのでブックマークできませんでした",
          };
    if (bookmarkStatus === "error" || bookmarkStatus === "success") {
      dispatch(resetBookmark());
    }
    if (bookmarkStatus === "success") {
      setIsBookmarked(!isBookmarked);
    }
    messageApi.open({ ...messProps, duration: 1.5 });
  }, [bookmarkId, bookmarkStatus, dispatch, id, isBookmarked, messageApi]);
  const age = birthday
    ? new Date().getFullYear() - new Date(birthday).getFullYear()
    : "N/A";
  const flag = nationality.nationality.find(
    (item) => item.value === nationalityProp || item.value === "OTHER",
  )?.flag;
  return (
    <Card
      bordered
      hoverable
      className="w-[200px] bg-[#EFF6FC] border-[#5591EB] hover:border-[#5591EB]
      relative"
    >
      {contextHolder}
      <img
        className="h-6 aspect-auto absolute top-3 left-3"
        style={{
          filter: "drop-shadow(0px 1px 1.5px rgba(37, 37, 37, 0.25))",
        }}
        src={flag}
        alt="ds"
      />
      <div className="flex flex-col items-center w-full h-full">
        <Badge
          offset={[10, 70]}
          count={
            <img
              className="h-6 aspect-auto"
              src={isBookmarked ? heartRed : heartBlack}
              onClick={() => {
                dispatch(togleBookmard(id));
              }}
            />
          }
        >
          <div className="h-20 w-20 rounded-full grid overflow-hidden bg-white ">
            {!isLoaded && (
              <Skeleton.Image
                active
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <img
              className={`w-full h-full object-contain shadow-sm ${
                !isLoaded ? "hidden" : ""
              }`}
              src={avatar ?? avt}
              alt="avatar"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </Badge>
        <div className="flex flex-col items-center mb-1">
          <h3 className="m-2 text-[#5591EB] whitespace-nowrap">{name}</h3>
          <span className="m-[1.5px] text-[#5591EB]">{age} 歳</span>
          <span className="m-[1.5px] text-[#5591EB]">
            {level ? `N${level}` : "N/A"}
          </span>
          <span className="m-[1.5px] text-[#5591EB]">
            <span className="font-bold">{numberOfBookmarks}</span> お気に入り人
          </span>
          <span className="m-[1.5px] text-[#5591EB]">
            {gender ? ["男性", "女性"][gender - 1] : "N/A"}
          </span>
        </div>
        <Button
          size="small"
          type="primary"
          onClick={() => navigate(`/profile/${id}`)}
        >
          見る
        </Button>
      </div>
    </Card>
  );
};

export default UserItem;
