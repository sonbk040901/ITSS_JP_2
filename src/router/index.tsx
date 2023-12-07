import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./Loader";
const PrivateLayout = Loader(lazy(async () => import("layouts/PrivateLayout")));
const AuthLayout = Loader(lazy(async () => import("layouts/AuthLayout")));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <div className="text-2xl font-bold">Home</div>,
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
        element: <div>hello</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default Router;
