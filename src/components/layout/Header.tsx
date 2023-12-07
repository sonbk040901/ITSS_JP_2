import { Header as DefaultHeader } from "antd/es/layout/layout";
import { FC } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthStatus } from "states/slices/auth";
import logo from "/logo.png";
import NavBar from "../header/NavBar";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  // const location = useLocation();
  // const navigate = useNavigate();

  return (
    <DefaultHeader className="bg-white h-14 flex justify-between items-center border-b-[1.5px] shadow-sm z-10">
      <Link
        className="grid place-items-center"
        to="/"
      >
        <img
          className="h-8 aspect-auto drop-shadow-lg"
          src={logo}
        />
      </Link>
      {authStatus === "success" && <NavBar />}
    </DefaultHeader>
  );
};

export default Header;
