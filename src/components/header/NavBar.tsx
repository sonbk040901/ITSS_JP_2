import { useAppDispatch, useAppSelector } from "@/states";
import { logout, selectAuthUserInfo } from "@/states/slices/auth";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import avt from "assets/avt.png";
import bellIcon from "assets/bell.svg";
import logoutIcon from "assets/logout.svg";
import messIcon from "assets/mess.svg";
import profileIcon from "assets/profile.svg";
import { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserOptionItem from "./UserOptionItem";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const user = useAppSelector(selectAuthUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items: ItemType[] = useMemo(
    () => [
      {
        key: 1,
        label: (
          <UserOptionItem
            icon={profileIcon}
            title="プローフィル"
            onClick={() => navigate("/profile")}
          />
        ),
      },
      {
        key: 2,
        label: (
          <UserOptionItem
            icon={logoutIcon}
            title="ログアウト"
            onClick={() => dispatch(logout())}
          />
        ),
      },
    ],
    [dispatch, navigate],
  );
  return (
    <div className="flex flex-row items-center gap-3">
      <Input
        className="mr-2"
        placeholder="検索"
        suffix={<SearchOutlined />}
      />
      <Link
        className="grid place-items-center"
        to="/chat"
      >
        <img
          className="h-6 aspect-auto"
          src={messIcon}
        />
      </Link>
      <img
        className="h-6 aspect-auto"
        src={bellIcon}
      />
      <span className="cursor-pointer">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <Avatar
            className="border-slate-400 border-[1px] shadow-sm"
            src={user?.avatar ?? avt}
          />
        </Dropdown>
      </span>
    </div>
  );
};
export default NavBar;
