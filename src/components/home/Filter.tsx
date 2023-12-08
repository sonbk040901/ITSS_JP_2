import { Popover } from "antd";
import filterIcon from "assets/filter.svg";
import { FC } from "react";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  return (
    <div className="self-end">
      <Popover
        content={
          <div className="flex items-stretch justify-between flex-col w-48">
            <span className="border-b-[1px] text-center font-bold text-lg">
              フィルター
            </span>
          </div>
        }
        trigger={["click"]}
        placement="bottomRight"
        arrow={false}
      >
        <img
          className="w-6 h-6 cursor-pointer drop-shadow-sm hover:drop-shadow-md"
          src={filterIcon}
          alt=""
        />
      </Popover>
    </div>
  );
};
export default Filter;
