import { useAppDispatch, useAppSelector } from "@/states";
import {
  filterUsers,
  selectFilterValue,
  setFilter,
} from "@/states/slices/filter";
import { nationality, province } from "@/utils";
import { Button, Input, Popover, Select, Tooltip } from "antd";
import { DefaultOptionType } from "antd/es/select";
import filterIcon from "assets/filter.svg";
import { ChangeEvent, FC, FormEvent, useState } from "react";

const Filter: FC = () => {
  const [open, setOpen] = useState(false);
  const filter = useAppSelector(selectFilterValue);
  const dispatch = useAppDispatch();
  const levelOptions: DefaultOptionType[] = [
    { label: "N1", value: 1 },
    { label: "N2", value: 2 },
    { label: "N3", value: 3 },
    { label: "N4", value: 4 },
    { label: "N5", value: 5 },
    { label: "全部", value: null },
  ];
  const genderOptions: DefaultOptionType[] = [
    { label: "男性", value: 1 },
    { label: "女性", value: 2 },
    { label: "全部", value: null },
  ];
  const addressOptions: DefaultOptionType[] = province.province
    .map((v: string, i) => ({
      label: v,
      value: (i + 1) as number | null,
    }))
    .concat([{ label: "全部", value: null }]);
  const nationalityOptions: DefaultOptionType[] = [
    ...nationality.nationality,
    { label: "全部", value: null },
  ];
  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === "" || value === "-") {
      dispatch(setFilter({ ...filter, age: Number(value) }));
    }
  };
  const handleSubmitFilter = (e: FormEvent) => {
    e.preventDefault();
    dispatch(filterUsers("filter"));
    setOpen(false);
  };
  const handleCancelFilter = () => {
    dispatch(
      setFilter({
        gender: null,
        level: null,
        nationality: null,
        province: null,
      }),
    );
    setOpen(false);
  };
  return (
    <div className="self-end">
      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <form
            onSubmit={handleSubmitFilter}
            className="flex items-stretch justify-between flex-col w-56 gap-2"
          >
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
                value={filter.level}
                options={levelOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      level: value,
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
                value={filter.gender}
                options={genderOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      gender: value,
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
                onChange={handleChangeAge}
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
                value={filter.nationality}
                options={nationalityOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      nationality: value,
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
                value={filter.province}
                options={addressOptions}
                onChange={(value) => {
                  dispatch(
                    setFilter({
                      ...filter,
                      province: value,
                    }),
                  );
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <Button
                shape="round"
                type="primary"
                htmlType="submit"
              >
                申し込み
              </Button>
              <Button
                danger
                shape="round"
                type="default"
                onClick={handleCancelFilter}
              >
                キャンセル
              </Button>
            </div>
          </form>
        }
        trigger={["click"]}
        placement="bottomRight"
        arrow={false}
      >
        <Tooltip
          title="クリックしてフィルターを開きます"
          placement="bottom"
        >
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
