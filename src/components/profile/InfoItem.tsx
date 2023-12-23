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
import { FC, useId } from "react";

type InfoItemInputProps = Omit<InputProps, "type"> & {
  type?: "text" | "number" | "password";
};
type InfoItemUploadProps = Omit<UploadProps, "type"> & { type: "file" };
type InfoItemDateProps = DatePickerProps & { type: "date" };
type InfoItemSelectProps = Omit<SelectProps, "type"> & { type: "select" };
type InfoItemProps = (
  | InfoItemInputProps
  | InfoItemUploadProps
  | InfoItemDateProps
  | InfoItemSelectProps
) & { label: string; viewOnly?: boolean };
const InfoItem: FC<InfoItemProps> = ({ label, viewOnly = true, ...props }) => {
  const id = useId();
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
        <Select
          {...props}
          disabled={viewOnly}
        />
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
