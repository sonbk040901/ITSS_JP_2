import { useAppDispatch } from "@/states";
import { filterUsers } from "@/states/slices/filter";
import { Filter, Pagination, UserList } from "components/home";
import { FC, useEffect } from "react";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(filterUsers("filter"));
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center gap-7 w-[1000px] max-w-[80%]">
      <Filter />
      <UserList />
      <Pagination />
    </div>
  );
};

export default Home;
