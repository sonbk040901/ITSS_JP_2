import { useAppDispatch, useAppSelector } from "@/states";
import {
  filterUsers,
  selectFilterValue,
  setFilter,
} from "@/states/slices/filter";
import { Button, Input, Popover, Select, Tooltip } from "antd";
import { DefaultOptionType } from "antd/es/select";
import filterIcon from "assets/filter.svg";
import { ChangeEvent, FC } from "react";

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const filter = useAppSelector(selectFilterValue);
  const dispatch = useAppDispatch();
  const levelOptions: DefaultOptionType[] = [
    { label: "N1", value: "N1" },
    { label: "N2", value: "N2" },
    { label: "N3", value: "N3" },
    { label: "N4", value: "N4" },
    { label: "N5", value: "N5" },
    { label: "全部", value: "All" },
  ];
  const genderOptions: DefaultOptionType[] = [
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
    { label: "全部", value: "All" },
  ];
  const addressOptions: DefaultOptionType[] = [{ label: "全部", value: "All" }];
  const nationalityOptions: DefaultOptionType[] = [
    { label: "ベトナム", value: "vietnam" },
    { label: "全部", value: "All" },
  ];
  const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === "" || value === "-") {
      dispatch(setFilter({ ...filter, age: Number(value) }));
    }
  };
  return (
    <div className="self-end">
      <Popover
        content={
          <div className="flex items-stretch justify-between flex-col w-56 gap-2">
            <span className="border-b-[1px] text-center font-bold text-lg pb-1">
              フィルター
            </span>
            <div className="flex flex-col gap-1">
              <label
                className="font-[600]"
                htmlFor="level"
              >
                JLPT レベル
              </label>
              <Select
                id="level"
                value={filter.level || ("All" as typeof filter.level | "All")}
                options={levelOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      level: value !== "All" ? value : undefined,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-[600]"
                htmlFor="gender"
              >
                性別
              </label>
              <Select
                id="gender"
                value={filter.gender || ("All" as typeof filter.gender | "All")}
                options={genderOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      gender: value !== "All" ? value : undefined,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-[600]"
                htmlFor="age"
              >
                年齢
              </label>
              <Input
                id="age"
                value={filter.age || ""}
                onChange={onChangeAge}
                placeholder="年齢を入力してください"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-[600]"
                htmlFor="nationality"
              >
                国籍
              </label>
              <Select
                id="nationality"
                value={
                  filter.nationality ||
                  ("All" as typeof filter.nationality | "All")
                }
                options={nationalityOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      nationality: value !== "All" ? value : undefined,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-[600]"
                htmlFor="address"
              >
                アドレス
              </label>
              <Select
                id="address"
                value={
                  filter.province || ("All" as typeof filter.province | "All")
                }
                options={addressOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      province: value !== "All" ? value : undefined,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <Button
                shape="round"
                type="primary"
                onClick={() => dispatch(filterUsers("filter"))}
              >
                申し込み
              </Button>
              <Button
                danger
                shape="round"
                type="default"
                onClick={() => {
                  dispatch(setFilter({}));
                }}
              >
                キャンセル
              </Button>
            </div>
          </div>
        }
        trigger={["click"]}
        placement="bottomRight"
        arrow={false}
      >
        <Tooltip title="クリックしてフィルターを開きます" placement="bottom">
          <img
            className="w-6 h-6 cursor-pointer drop-shadow-sm hover:drop-shadow-md"
            src={filterIcon}
            alt=""
          />
        </Tooltip>
      </Popover>
    </div>
  );
};
export default Filter;
