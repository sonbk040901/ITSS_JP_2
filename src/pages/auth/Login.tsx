import { FC, FormEvent, useEffect, useState } from "react";
import { Input, Button, notification } from "antd";
import { useAppDispatch, useAppSelector } from "@/states";
import {
  login,
  resetForm,
  selectAuthFormError,
  selectAuthFormStatus,
  selectAuthFormValue,
  setForm,
} from "@/states/slices/authForm";
import { fetchUser } from "@/states/slices/auth";

const Login: FC = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();
  const formValues = useAppSelector(selectAuthFormValue);
  const formStatus = useAppSelector(selectAuthFormStatus);
  const formError = useAppSelector(selectAuthFormError);
  const [api, contextHolder] = notification.useNotification();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login(formValues));
  };
  useEffect(() => {
    if (formStatus === "success") {
      dispatch(fetchUser());
      dispatch(resetForm());
    }
    if (formStatus === "error") {
      api.error({
        message: "ログイン失敗",
        description: "メールアドレスまたはパスワードが間違っています",
        duration: 1.5,
      });
    }
  }, [formStatus, dispatch, api, formError]);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-solid w-[400px] h-[300px] flex flex-col items-center rounded-md shadow-md"
    >
      {contextHolder}
      <div className="content">
        <h1 className="text-[#5591EB]">ログイン</h1>
      </div>
      <div className="username w-[200px] py-2">
        <Input
          placeholder="メールアドレス"
          value={formValues.email}
          onChange={(e) => {
            dispatch(setForm({ email: e.target.value }));
          }}
        />
      </div>
      <div className="password w-[200px] py-2">
        <Input
          placeholder="パスワード"
          type={showPass ? "text" : "password"}
          value={formValues.password}
          onChange={(e) => {
            dispatch(setForm({ password: e.target.value }));
          }}
        />
      </div>

      <div className="flex flex-row w-[200px] gap-1 items-baseline">
        <span>
          <Input
            type="checkbox"
            id="check"
            checked={showPass}
            onChange={() => {
              setShowPass(!showPass);
            }}
          />
        </span>
        <label htmlFor="check">パスワードを表示する</label>
      </div>
      <div className="login-button py-2">
        <Button
          style={{ width: "200px" }}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={formStatus === "loading"}
        >
          ログイン
        </Button>
      </div>
      <div className="register-action py-2">
        <span>アカウントがない？</span>
        <span className="text-[#5591EB]">登録！</span>
      </div>
    </form>
  );
};

export default Login;
