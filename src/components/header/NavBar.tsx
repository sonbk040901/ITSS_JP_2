import { useAppDispatch, useAppSelector } from "@/states";
import { logout, selectAuthUserInfo } from "@/states/slices/auth";
import {
  fetchNotification,
  selectNotificationData,
} from "@/states/slices/notification";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, Popover } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import avt from "assets/avt.png";
import bellIcon from "assets/bell.svg";
import logoutIcon from "assets/logout.svg";
import messIcon from "assets/mess.svg";
import profileIcon from "assets/profile.svg";
import { FC, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotiItem from "./NotiItem";
import UserOptionItem from "./UserOptionItem";

const NavBar: FC = () => {
  const user = useAppSelector(selectAuthUserInfo);
  const notifications = useAppSelector(selectNotificationData);
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
      {
        key: 0,
        label: (
          <div className="">
            <div className="font-semibold text-sm text-slate-500">
              {user?.name}
            </div>
            <div className="text-xs text-slate-400">{user?.email}</div>
          </div>
        ),
        disabled: true,
      },
    ],
    [dispatch, navigate, user],
  );
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);
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
          className="h-5 aspect-auto"
          src={messIcon}
        />
      </Link>
      <Popover
        title="通知"
        trigger={"click"}
        content={
          <div className="w-52 pb-3">
            {notifications.map((notification) => (
              <NotiItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        }
        placement="bottomRight"
        arrow
      >
        <Badge
          className="grid place-items-center"
          color="orange"
          size="small"
          status="processing"
          count={notifications.length}
        >
          <img
            className="h-5 aspect-auto cursor-pointer"
            src={bellIcon}
          />
        </Badge>
      </Popover>
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
