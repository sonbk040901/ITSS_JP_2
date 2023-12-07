import { Spin } from "antd";
import { FC, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "states";
import { fetchUser, selectAuthStatus } from "states/slices/auth";

const InitAppWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  if (authStatus === "loading") return <Loading />;
  return children;
};
const Loading = () => (
  <div className="fixed top-0 right-0 h-full w-full bg-zinc-300 grid place-items-center">
    <Spin size="large" />
  </div>
);
export default InitAppWrapper;
