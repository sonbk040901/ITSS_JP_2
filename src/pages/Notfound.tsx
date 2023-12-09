import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface NotfoundProps {}

const Notfound: FC<NotfoundProps> = () => {
  return (
    <section className="">
      <div className="">
        <div className="">
          <div className="grid place-items-center">
            <div className="text-center">
              <div className="w-96 bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[400px] bg-center">
                <h1 className="font-extrabold text-6xl text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="text-xl">迷っているように見えます</h3>
                <p>お探しのページはありません!</p>
                <Link
                  to="/"
                  className="link_404"
                >
                  <Button type="primary">ホームへ行く</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
