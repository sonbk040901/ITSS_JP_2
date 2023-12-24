import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./Loader";
import Login from "pages/auth/Login";
import ChatBox from "@/components/chat/ChatBox";

const PrivateLayout = Loader(lazy(async () => import("layouts/PrivateLayout")));
const AuthLayout = Loader(lazy(async () => import("layouts/AuthLayout")));
const Home = Loader(lazy(async () => import("pages/private/Home")));
const Profile = Loader(lazy(async () => import("pages/private/Profile")));
const PersonalProfile = Loader(
  lazy(async () => import("pages/private/PersonalProfile")),
);
const Chat = Loader(lazy(async () => import("pages/private/Chat")));
const Hello = Loader(lazy(async () => import("pages/auth/Hello")));
const Notfound = Loader(lazy(async () => import("pages/Notfound")));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <PersonalProfile />,
      },
      {
        path: "chat",
        element: <Chat />,
        children: [
          {
            path: "",
            element: <h1>チャットしたい友達を選択しなさい!!!</h1>,
          },
          {
            path: ":id",
            element: <ChatBox />,
          },
          {
            path: "*",
            element: <Notfound />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <div>Register</div>,
      },
      {
        path: "hello",
        element: <Hello />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Router;
