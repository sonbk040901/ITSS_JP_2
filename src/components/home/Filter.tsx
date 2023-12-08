import { FC } from "react";
import filterIcon from "assets/filter.svg";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  return (
    <div className="self-end">
      <img
        className="w-6 h-6 cursor-pointer drop-shadow-sm hover:drop-shadow-md"
        // style={{ filter: "drop-shadow(.5px .5px 1px #868686)" }}
        src={filterIcon}
        alt=""
      />
    </div>
  );
};

export default Filter;
