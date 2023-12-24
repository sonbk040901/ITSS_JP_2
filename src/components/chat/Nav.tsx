import { Empty, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import { useAppSelector } from "@/states";
import { selectChatFriends } from "@/states/slices/chat";
import FriendItem from "./FriendItem";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const lastestChatFriends = useAppSelector(selectChatFriends);
  const [search, setSearch] = useState("");
  const filteredFriends = lastestChatFriends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-3 h-full flex flex-col whitespace-nowrap">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="shadow-sm"
        prefix={<SearchOutlined />}
        placeholder="検索"
        size="large"
      />
      <div className="flex-1 overflow-y-scroll flex flex-col rounded-md shadow-md border-[.5px]">
        <h1 className="px-2 my-2">友達</h1>
        <div className="flex flex-col mt-1 p-2 gap-1 flex-1">
          {filteredFriends.length ? (
            filteredFriends.map((friend) => (
              <FriendItem
                key={friend.id}
                {...friend}
              />
            ))
          ) : (
            <Empty description={<p>見つかりませんでした</p>}></Empty>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
