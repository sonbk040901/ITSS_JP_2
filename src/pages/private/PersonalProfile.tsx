import { Avatar, Button, ConfigProvider, Image } from "antd";
import { DefaultOptionType } from "antd/es/select";
import jlpt from "assets/jlpt.svg";
import InfoItem from "components/profile/InfoItem";
import dayjs from 'dayjs';
import { FC, useState } from "react";
import { useAppSelector } from "states";
import { selectAuthUserInfo } from "states/slices/auth";
import { nationality, province } from "utils";

interface PersonalProfileProps {}

const PersonalProfile: FC<PersonalProfileProps> = () => {
  const [isView, setIsView] = useState<boolean>(true);
  const profile = useAppSelector(selectAuthUserInfo)
  const nationalityOptions: DefaultOptionType[] = [
    ...nationality.nationality,
  ];  
  const addressOptions: DefaultOptionType[] = province.province
  .map((v: string, i) => ({
    label: v,
    value: (i + 1) as number | null,
  }));

  const levelOptions: DefaultOptionType[] = [
    { label: "N1", value: 1 },
    { label: "N2", value: 2 },
    { label: "N3", value: 3 },
    { label: "N4", value: 4 },
    { label: "N5", value: 5 },
  ];
  return (
    <form className="self-stretch max-w-[80%] w-[1000px] py-3 flex flex-col">
      <div className="text-end">
        <Avatar size={64} src={profile?.avatar}/>
      </div>
      <div className="grid grid-cols-2 grid-rows-6 gap-4">
        <InfoItem label="名前" viewOnly={isView} defaultValue={profile?.name || ""}/>
        <InfoItem type="date" viewOnly={isView} picker="date" label="誕生日" defaultValue={dayjs(profile?.birthday)}/>
        <InfoItem label="メール" viewOnly={isView} defaultValue={profile?.email || ""}/>
        <InfoItem type="select" label="国籍" viewOnly={isView} defaultValue={profile?.nationality} options={nationalityOptions}/>
        <InfoItem label="パスワード" type="password" viewOnly={isView}/>
        <InfoItem label="証明書" type="file" accept="image/png" viewOnly={isView}/>
        <InfoItem label="電話番号" viewOnly={isView} defaultValue={profile?.phone||""}/>
        <div className="row-span-3 overflow-scroll text-center">
          <Image height={230} src={jlpt} alt="avatar" />
        </div>
        <InfoItem label="市" type="select" viewOnly={isView} defaultValue={profile?.province} options={addressOptions}/>
        <InfoItem label="レベル" type="select" viewOnly={isView} defaultValue={profile?.level} options={levelOptions}/>
      </div>
      <div className="h-20 flex justify-center items-center gap-10">
        {isView ? 
        (<>
          <Button type="primary" onClick={() => setIsView(false)}>編集</Button>
        </>) 
        : 
        (<>
          <ConfigProvider theme={{token: {colorPrimary: "#F24E1E"} }}><Button type="primary" onClick={() => setIsView(true)}>キャンセル</Button></ConfigProvider>
          <Button type="primary" onClick={() => setIsView(false)}>確認</Button>
        </>)
        }
      </div>
    </form>
  );
};
export default PersonalProfile;
