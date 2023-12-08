import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./Loader";
const PrivateLayout = Loader(lazy(async () => import("layouts/PrivateLayout")));
const AuthLayout = Loader(lazy(async () => import("layouts/AuthLayout")));
const Home = Loader(lazy(async () => import("pages/private/Home")));
const Hello = Loader(lazy(async () => import("pages/auth/Hello")));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <div>login</div>,
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
    element: <div>404</div>,
  },
]);

export default Router;
