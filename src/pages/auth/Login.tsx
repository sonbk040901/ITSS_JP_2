import { FC } from "react";
import {Input, Button} from "antd";

const Login: FC = () => {
  return <div className="bg-white border-solid w-[400px] h-[300px] flex flex-col">
    <div className="content self-center">
      <h2 className="text-[#5591EB]">ログイン</h2>
    </div>
    <div className="username w-[200px] self-center py-2">
      <Input placeholder="メールアドレス" />
    </div>
    <div className="password w-[200px] self-center py-2">
      <Input placeholder="パスワード" />
    </div>

    <div className="flex flex-row self-center gap-1">
      <div>
        <Input type="checkbox" id="check" />
      </div>
      <label htmlFor="check">パスワードを表示する</label> 
    </div>
    <div className="login-button self-center py-2">
      <Button style={{width: "200px"}} type="primary" size="large">ログイン</Button>
    </div>
    <div className="register-action self-center py-2">
      <span>アカウントがない？</span>
      <span className="text-[#5591EB]">登録！</span>
    </div>
  </div>
};

export default Login;
