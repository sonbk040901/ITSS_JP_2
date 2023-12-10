import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./Loader";
import Login from "pages/auth/Login";

const PrivateLayout = Loader(lazy(async () => import("layouts/PrivateLayout")));
const AuthLayout = Loader(lazy(async () => import("layouts/AuthLayout")));
const Home = Loader(lazy(async () => import("pages/private/Home")));
const Profile = Loader(lazy(async () => import("pages/private/Profile")));
const PersonalProfile = Loader(
  lazy(async () => import("pages/private/PersonalProfile")),
);
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
