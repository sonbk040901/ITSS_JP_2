import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  InputProps,
  Select,
  SelectProps,
  Upload,
  UploadProps,
} from "antd";
import { FC, useId, useRef } from "react";

type InfoItemInputProps = Omit<InputProps, "type"> & {
  type?: "text" | "number" | "password";
};
type InfoItemUploadProps = Omit<UploadProps, "type"> & { type: "file" };
type InfoItemDateProps = DatePickerProps & { type: "date" };
type InfoItemSelectProps = Omit<SelectProps, "type"> & {
  type: "select";
  name?: string;
};
type InfoItemProps = (
  | InfoItemInputProps
  | InfoItemUploadProps
  | InfoItemDateProps
  | InfoItemSelectProps
) & { label: string; viewOnly?: boolean };
const InfoItem: FC<InfoItemProps> = ({ label, viewOnly = true, ...props }) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col justify-around">
      <label
        className="font-semibold text-lg"
        htmlFor={props.id ?? id}
      >
        {label}
      </label>
      {props.type === "file" ? (
        <Upload
          {...props}
          type={undefined}
          disabled={viewOnly}
        >
          <Button
            className="w-full"
            icon={<UploadOutlined />}
          >
            アップロード
          </Button>
        </Upload>
      ) : props.type === "date" ? (
        <DatePicker
          {...props}
          disabled={viewOnly}
        />
      ) : props.type === "select" ? (
        <>
          <Select
            {...props}
            disabled={viewOnly}
            onChange={(value) => {
              if (inputRef.current) inputRef.current.value = value as string;
            }}
          />
          <input
            ref={inputRef}
            name={props.name}
            defaultValue={props.defaultValue}
            type="hidden"
          />
        </>
      ) : (
        <Input
          id={id}
          {...props}
          readOnly={viewOnly}
        />
      )}
    </div>
  );
};
export default InfoItem;
