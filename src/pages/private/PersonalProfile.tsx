import { getCertificateImage } from "@/utils/certificate";
import { UploadOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, ConfigProvider, Image, Upload } from "antd";
import useMessage from "antd/es/message/useMessage";
import { DefaultOptionType } from "antd/es/select";
import InfoItem from "components/profile/InfoItem";
import dayjs from "dayjs";
import { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "states";
import {
  selectAuthUpdateStatus,
  selectAuthUserInfo,
  updateUserInfo,
} from "states/slices/auth";
import { nationality, province } from "utils";

interface PersonalProfileProps {}

const PersonalProfile: FC<PersonalProfileProps> = () => {
  const [isView, setIsView] = useState<boolean>(true);
  const profile = useAppSelector(selectAuthUserInfo);
  const updateStatus = useAppSelector(selectAuthUpdateStatus);
  const dispatch = useAppDispatch();
  const nationalityOptions: DefaultOptionType[] = [...nationality.nationality];
  const [message, context] = useMessage();
  const addressOptions: DefaultOptionType[] = province.province.map(
    (v: string, i) => ({
      label: v,
      value: (i + 1) as number | null,
    }),
  );

  const levelOptions: DefaultOptionType[] = [
    { label: "N1", value: 1 },
    { label: "N2", value: 2 },
    { label: "N3", value: 3 },
    { label: "N4", value: 4 },
    { label: "N5", value: 5 },
  ];
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(updateUserInfo(data));
  };
  useEffect(() => {
    if (updateStatus === "success") {
      setIsView(true);
      message.success("更新成功", 1);
    }
  }, [message, updateStatus]);
  return (
    <form
      onSubmit={handleSubmit}
      className="self-stretch max-w-[80%] w-[1000px] py-3 flex flex-col"
    >
      {context}
      <div className="text-end">
        <Badge
          offset={[-5, 60]}
          count={
            <span>
              <Upload
                showUploadList={false}
                disabled={isView}
                name="avatar"
              >
                <Button
                  type="default"
                  shape="circle"
                  icon={<UploadOutlined />}
                ></Button>
              </Upload>
            </span>
          }
        >
          <Avatar
            size={64}
            src={profile?.avatar}
          />
        </Badge>
      </div>
      <div className="grid grid-cols-2 grid-rows-6 gap-4">
        <InfoItem
          name="name"
          label="名前"
          viewOnly={isView}
          defaultValue={profile?.name || ""}
        />
        <InfoItem
          name="birthday"
          type="date"
          viewOnly={isView}
          picker="date"
          label="誕生日"
          defaultValue={dayjs(profile?.birthday)}
        />
        <InfoItem
          name="email"
          label="メール"
          viewOnly={isView}
          defaultValue={profile?.email || ""}
        />
        <InfoItem
          name="nationality"
          type="select"
          label="国籍"
          viewOnly={isView}
          defaultValue={profile?.nationality}
          options={nationalityOptions}
        />
        <InfoItem
          label="パスワード"
          type="password"
          viewOnly={isView}
        />
        <InfoItem
          label="証明書"
          type="file"
          accept="image/png"
          viewOnly={isView}
        />
        <InfoItem
          name="phone"
          label="電話番号"
          viewOnly={isView}
          defaultValue={profile?.phone || ""}
        />
        <div className="row-span-3 overflow-scroll text-center">
          <Image
            height={230}
            src={profile?.level ? getCertificateImage(profile?.level) : ""}
            alt="avatar"
          />
        </div>
        <InfoItem
          name="province"
          label="市"
          type="select"
          viewOnly={isView}
          defaultValue={profile?.province}
          options={addressOptions}
        />
        <InfoItem
          name="level"
          label="レベル"
          type="select"
          viewOnly={isView}
          defaultValue={profile?.level}
          options={levelOptions}
        />
      </div>
      <div className="h-20 flex justify-center items-center gap-10">
        {isView ? (
          <>
            <Button
              type="primary"
              onClick={() => setIsView(false)}
            >
              編集
            </Button>
          </>
        ) : (
          <>
            <ConfigProvider theme={{ token: { colorPrimary: "#F24E1E" } }}>
              <Button
                type="primary"
                onClick={() => setIsView(true)}
              >
                キャンセル
              </Button>
            </ConfigProvider>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setIsView(false)}
            >
              確認
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
export default PersonalProfile;
