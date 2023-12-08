import { useAppSelector } from "states";
import { selectFilterStatus } from "states/slices/filter";
import { FC } from "react";

interface UserListProps {}

const UserList: FC<UserListProps> = () => {
  const filterState = useAppSelector(selectFilterStatus);
  return <div className="self-stretch h-[500px] bg-gray-400">
    {filterState}
  </div>;
};

export default UserList;
