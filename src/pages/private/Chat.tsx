import { useAppDispatch, useAppSelector } from "@/states";
import { fetchLatestChat, selectChatStatus } from "@/states/slices/chat";
import Nav from "components/chat/Nav";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Chat: FC = () => {
  const dispatch = useAppDispatch();
  const chatStatus = useAppSelector(selectChatStatus);
  useEffect(() => {
    const sti = setInterval(() => {
      dispatch(fetchLatestChat());
    }, 1000);
    return () => {
      clearInterval(sti);
    };
  }, [dispatch]);
  if (chatStatus === "idle") {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex-1 self-stretch flex items-stretch gap-3 mx-16 my-2">
      <div className="bg-white shadow-md rounded-lg p-3 transition-all duration-300 flex-1 max-md:flex-grow-0 max-md:p-0 overflow-hidden">
        <Nav />
      </div>
      <div className="flex-[2] bg-white shadow-lg rounded-md p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
