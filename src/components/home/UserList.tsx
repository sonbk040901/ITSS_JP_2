import { useAppSelector } from "states";
import { selectFilterResults, selectFilterStatus } from "states/slices/filter";
import { FC } from "react";
import { UserItem } from ".";

interface UserListProps {}

const UserList: FC<UserListProps> = () => {
  const filterState = useAppSelector(selectFilterStatus);
  const result = useAppSelector(selectFilterResults);
  return (
    <div className="flex-1 self-stretch h-[500px] grid place-items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 overflow-y-auto p-3">
      {result.map((user) => (
        <UserItem
          {...user}
          loading={filterState === "loading"}
          key={user.id}
        />
      ))}
    </div>
  );
};

export default UserList;
