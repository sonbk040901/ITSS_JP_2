import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Header from "components/layout/Header";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthStatus } from "states/slices/auth";
import bg from "assets/bg.jpg";
const AuthLayout: FC = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  if (authStatus !== "error") return <Navigate to="/" />;
  return (
    <Layout className="h-screen">
      <Header />
      <Content
        className="bg-cover bg-center bg-no-repeat h-full grid place-items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
