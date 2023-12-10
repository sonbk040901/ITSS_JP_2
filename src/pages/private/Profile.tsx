import { useAppDispatch, useAppSelector } from "@/states";
import { selectAuthUserInfo } from "@/states/slices/auth";
import { fetchUserInfo, selectProfileUserInfo } from "@/states/slices/profile";
import { nationality } from "@/utils";
import { getProvinceByValue } from "@/utils/province";
import { Button, Image, message } from "antd";
import Card from "antd/es/card/Card";
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
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (id == currentUserId || !id) {
      navigate("/profile");
    } else dispatch(fetchUserInfo(id));
  }, [currentUserId, dispatch, id, navigate]);
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
        <span>{label}</span>
        <span>{value}</span>
      </div>
    ));
  };
  const success = () => {
    messageApi
      .open({
        type: "loading",
        content: "Kết bạn nhé..",
        duration: 2.5,
      })
      .then(() => message.success("Chờ nó phản hồi nhé", 2.5));
  };

  return (
    <div className="flex flex-col h-full max-w-[80%] w-[1000px]">
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
        <span className="font-bold text-xl text-[#5591EB]">BACK</span>
      </div>
      <div className="flex flex-row justify-between items-start py-2 gap-10 overflow-scroll">
        <Card className="shadow-md w-[300px] bg-[#EFF6FC] border-[#5591EB]">
          {contextHolder}
          <div className="flex flex-col">
            <div className="h-20 w-20 rounded-full grid overflow-hidden bg-white shadow-md self-center">
              <img
                className="w-full h-full object-contain shadow-sm"
                src={avt}
                alt="avatar"
              />
            </div>
            <div className=" m-2 px-2 text-center">{userInfo?.name}</div>
            <div className=" m-2 px-2 flex flex-col">
              <div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">性別</div>
                  <div className="flex-grow-[1]">
                    {["男性", "女性"][(userInfo?.gender || 1) - 1]}
                  </div>
                </div>
                <hr style={{ backgroundColor: "#ccc", height: 1 }} />
              </div>
            </div>
            <div className=" m-2 px-2 flex flex-col">
              <div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">歳</div>
                  <div className="flex-grow-[1]">
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
                  <div className="flex-grow-[1]">国籍</div>
                  <div className="flex-grow-[1]">
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
              <Button
                type="primary"
                onClick={success}
              >
                友達になる
              </Button>
            </div>
          </div>
        </Card>

        <Card className="w-[600px] text-2xl font-semibold h-fit shadow-md">
          {renderInfo()}
          <div className="flex items-start justify-between my-4">
            <span>証明書</span>
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
