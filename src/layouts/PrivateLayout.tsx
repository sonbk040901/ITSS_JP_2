import Header from "@/components/layout/Header";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthStatus } from "states/slices/auth";
const PrivateLayout: FC = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  if (authStatus !== "success")
    return (
      <Navigate
        to="/hello"
        state={{ isAuth: false }}
      />
    );
  return (
    <Layout className="h-screen w-screen">
      <Header />
      <Content className="h-full w-full flex items-center justify-center">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PrivateLayout;
