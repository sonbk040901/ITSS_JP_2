import Loading from "components/common/Loading";
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
export default InitAppWrapper;
