import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

const Hello: FC = () => {
  return (
    <div className="flex gap-5">
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
      <Link to="/register">
        <Button type="primary">Register</Button>
      </Link>
    </div>
  );
};

export default Hello;
