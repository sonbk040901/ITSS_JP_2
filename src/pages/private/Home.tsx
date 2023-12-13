import { useAppDispatch, useAppSelector } from "@/states";
import { filterUsers, selectFilterStatus } from "@/states/slices/filter";
import { Filter, Pagination, UserList } from "components/home";
import { FC, useEffect } from "react";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(selectFilterStatus);
  useEffect(() => {
    if (filterStatus === "idle") dispatch(filterUsers("filter"));
  }, [dispatch, filterStatus]);
  return (
    <div className="flex py-2 flex-col items-center gap-5 h-full w-[1000px] max-w-[80%] z-[1]">
      <Filter />
      <UserList />
      <Pagination />
    </div>
  );
};

export default Home;
