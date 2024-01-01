import heartBlack from "@/assets/heart-black.svg";
import heartRed from "@/assets/heart-red.svg";
import { useAppDispatch, useAppSelector } from "@/states";
import { selectAuthUserInfo } from "@/states/slices/auth";
import {
  resetBookmark,
  selectBookmarkId,
  selectBookmarkStatus,
  toggleBookmard,
} from "@/states/slices/bookmark";
import { updateUserInfo } from "@/states/slices/filter";
import {
  addFriend,
  cancelFriendRequest,
  fetchUserInfo,
  // selectProfileStatus,
  selectProfileUserInfo,
} from "@/states/slices/profile";
import { nationality } from "@/utils";
import { getProvinceByValue } from "@/utils/province";
import { Badge, Button, ConfigProvider, Image, Popover } from "antd";
import Card from "antd/es/card/Card";
import useMessage from "antd/es/message/useMessage";
import Link from "antd/es/typography/Link";
import avt from "assets/avatar/a1.svg";
import back from "assets/back.svg";
import jlpt from "assets/jlpt.svg";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectAuthUserInfo)?.id;
  const userInfo = useAppSelector(selectProfileUserInfo);
  // const profileStatus = useAppSelector(selectProfileStatus);
  const bookmarkStatus = useAppSelector(selectBookmarkStatus);
  const bookMarkId = useAppSelector(selectBookmarkId);
  const [messApi, messContextHolder] = useMessage();
  useEffect(() => {
    if (id == currentUserId || !id) {
      navigate("/profile");
    } else dispatch(fetchUserInfo(id));
  }, [currentUserId, dispatch, id, navigate]);
  useEffect(() => {
    if (bookmarkStatus === "success" && bookMarkId === userInfo?.id) {
      messApi.success({
        content: userInfo?.isBookmarked
          ? "ブックマークされました"
          : "ブックマークを解除しました",
        duration: 2,
      });
      dispatch(
        updateUserInfo({
          id: userInfo.id,
          user: { isBookmarked: !userInfo.isBookmarked },
        }),
      );
      id && dispatch(fetchUserInfo(id));
      dispatch(resetBookmark());
      return;
    }
    if (bookmarkStatus === "error") {
      messApi.error({
        content: "ブックマークに失敗しました",
        duration: 2,
      });
      dispatch(resetBookmark());
    }
  }, [
    bookMarkId,
    bookmarkStatus,
    dispatch,
    id,
    userInfo?.id,
    userInfo?.isBookmarked,
    messApi,
  ]);
  const renderInfo = () => {
    const info = [
      { label: "電話番号", value: userInfo?.phone },
      { label: "メールアドレス", value: userInfo?.email },
      { label: "市", value: getProvinceByValue(userInfo?.province || 0) },
      {
        label: "レベル",
        value: userInfo?.level ? `N${userInfo?.level}` : "N/A",
      },
    ] satisfies { label: string; value: unknown }[];
    return info.map(({ label, value }, i) => (
      <div
        key={(id || "0") + i}
        className="flex items-center justify-between border-b-2 my-4"
      >
        <span style={{ fontSize: 20 }}>{label}</span>
        <span style={{ fontSize: '16px', fontWeight: 400 }}>{value}</span>
      </div>
    ));
  };
  const handleAddFriend = () => id && dispatch(addFriend(Number(id)));
  const handleCancelFriend = () =>
    id && dispatch(cancelFriendRequest(Number(id)));
  const handleBookmark = () => {
    userInfo?.id &&
      dispatch(
        toggleBookmard({ id: userInfo.id, bookmark: !userInfo.isBookmarked }),
      );
  };
  return (
    <div className="flex flex-col h-full max-w-[80%] w-[1000px]">
      {messContextHolder}
      <div
        className="inline-flex flex-row items-center h-16 gap-2 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          src={back}
          className="h-6 aspect-auto"
        />
        <span className="font-bold text-xl text-[#5591EB]">戻る</span>
      </div>
      <div className="flex flex-row justify-between items-start py-2 gap-10 overflow-scroll">
        <Card className="shadow-md w-[300px] bg-[#EFF6FC] border-[#5591EB]">
          <div className="flex flex-col">
            <Badge
              offset={[10, 70]}
              count={
                <img
                  className="h-6 aspect-auto cursor-pointer"
                  src={userInfo?.isBookmarked ? heartRed : heartBlack}
                  onClick={handleBookmark}
                />
              }
              className="h-20 w-20 grid self-center"
            >
              <img
                className="w-full h-full rounded-full shadow-md object-contain"
                src={userInfo?.avatar ?? avt}
                alt="avatar"
              />
            </Badge>
            <div className=" m-2 px-2 text-center text-xl font-semibold ">{userInfo?.name}</div>
            <div className=" m-2 px-2 flex flex-col">
              <div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1] text-base " >性別</div>
                  <div className="flex-grow-[1] text-base">
                    {["男性", "女性"][(userInfo?.gender || 1) - 1]}
                  </div>
                </div>
                <hr style={{ backgroundColor: "#ccc", height: 1 }} />
              </div>
            </div>
            <div className=" m-2 px-2 flex flex-col">
              <div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1] text-base">歳</div>
                  <div className="flex-grow-[1] text-base">
                    {new Date().getFullYear() -
                      new Date(userInfo?.birthday || 1900).getFullYear()}
                  </div>
                </div>
                <hr style={{ backgroundColor: "#ccc", height: 1 }} />
              </div>
            </div>
            <div className=" m-2 px-2 flex flex-col">
              <div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1] text-base">国籍</div>
                  <div className="flex-grow-[1] text-base">
                    {
                      nationality.nationality.find(
                        (n) => n.value === userInfo?.nationality,
                      )?.label
                    }
                  </div>
                </div>
                <hr style={{ backgroundColor: "#ccc", height: 1 }} />
              </div>
            </div>
            <div className="self-center">
              {userInfo?.friendStatus === "none" ? (
                <Button
                  type="primary"
                  className="font-bold"
                  onClick={handleAddFriend}
                >
                  友達になる
                </Button>
              ) : userInfo?.friendStatus === "accepted" ? (
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: "#F24E1E",
                        algorithm: true,
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    className="font-bold"
                  // danger
                  >
                    友達になった
                  </Button>
                </ConfigProvider>
              ) : userInfo?.friendStatus === "pending" ? (
                <Popover
                  trigger="contextMenu"
                  content={<Link onClick={handleCancelFriend}>キャンセル</Link>}
                >
                  <Button
                    type="primary"
                    className="font-bold"
                    disabled
                  >
                    未処理
                  </Button>
                </Popover>
              ) : (
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorBgContainerDisabled: "#A4A4AC",
                        colorTextDisabled: "#fff",
                        algorithm: true,
                      },
                    },
                  }}
                >
                  <Button
                    type="primary"
                    className="font-bold"
                    disabled
                  >
                    拒否された
                  </Button>
                </ConfigProvider>
              )}
            </div>
          </div>
        </Card>

        <Card className="w-[600px] text-2xl font-semibold h-fit shadow-md">
          {renderInfo()}
          <div className="flex items-start justify-between my-4">
            <span style={{ fontSize: 20 }}>証明書</span>
            <span className="w-96">
              <Image
                src={jlpt}
                alt=""
              />
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
