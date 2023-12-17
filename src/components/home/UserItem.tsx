import avt from "@/assets/avatar/a1.svg";
import heartBlack from "@/assets/heart-black.svg";
import heartRed from "@/assets/heart-red.svg";
import { nationality } from "@/utils";
import { Badge, Button, Card, Skeleton } from "antd";
import { FC, useState } from "react";
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
  isBookmarked,
  numberOfBookmarks,
  filter,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const age = birthday
    ? new Date().getFullYear() - new Date(birthday).getFullYear()
    : "N/A";
  const flag = nationality.nationality.find(
    (item) => item.value === nationalityProp || item.value === "OTHER",
  )?.flag;
  const matchingRate = filter ? Number(Number(filter).toFixed()) : null;
  const matchingRateColor = matchingRate
    ? matchingRate < 50
      ? "red"
      : matchingRate < 90
      ? "orange"
      : "green"
    : "#ea00ff";
  return (
    <Card
      bordered
      hoverable
      className="w-[200px] bg-[#EFF6FC] border-[#5591EB] hover:border-[#5591EB]
      relative"
    >
      <img
        className="h-6 aspect-auto absolute top-3 left-3"
        style={{
          filter: "drop-shadow(0px 1px 1.5px rgba(37, 37, 37, 0.25))",
        }}
        src={flag}
        alt="ds"
      />
      {matchingRate !== null && (
        <div
          title={`マッチング率 ${matchingRate}%`}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white
                      grid place-items-center
                      shadow-sm border-[1px]"
        >
          <span
            className="text-xs"
            style={{ color: matchingRateColor }}
          >
            {matchingRate}%
          </span>
        </div>
      )}
      <div className="flex flex-col items-center w-full h-full">
        <Badge
          offset={[10, 70]}
          count={
            <img
              className="h-6 aspect-auto"
              src={isBookmarked ? heartRed : heartBlack}
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
