import { Typography } from "antd";
import { FC } from "react";

interface UserOptionItemProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

const UserOptionItem: FC<UserOptionItemProps> = ({
  icon,
  title,
  onClick,
}) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      onClick={onClick}
    >
      <img
        src={icon}
        className="h-6 aspect-auto"
      />
      <Typography.Link color="primary" className="font-medium">{title}</Typography.Link>
    </div>
  );
};

export default UserOptionItem;
