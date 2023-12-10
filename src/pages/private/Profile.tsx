/** @format */

import { FC } from "react";
import { useParams } from "react-router-dom";
import Card from "antd/es/card/Card";
import back from "assets/back.svg";
import avt from "assets/avatar/a1.svg";
import { Button,message } from "antd";

const Profile: FC = () => {
	const { id } = useParams<{ id?: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Kết bạn nhé..',
        duration: 2.5,
      })
      .then(() => message.success('Chờ nó phản hồi nhé', 2.5)) 
  };

	return (
		<div className="flex flex-col bg-red-100 h-full max-w-[80%] w-[1000px] py-5">
			<div className="flex flex-row items-center gap-2">
				<img
					src={back}
					className="h-6 aspect-auto"
				/>
				<span className="font-bold text-xl text-[#5591EB]">BACK</span>
			</div>
			<div className="flex  flex-row justify-around py-2 gap-2">
        <div>
        <Card style={{backgroundColor: "#EFF6FC", flexGrow: 1}}>
          {contextHolder}
					<div className="flex flex-col">
						<div className="h-20 w-20 rounded-full grid overflow-hidden bg-white shadow-md self-center">
							<img
								className="w-full h-full object-contain shadow-sm"
								src={avt}
								alt="avatar"
							/>
						</div>
						<div className=" m-2 px-2 text-center">
							ファム・フイフイ・ホアン
						</div>
						<div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">性別</div>
                  <div className="flex-grow-[1]">女</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div>
						<div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">歳</div>
                  <div className="flex-grow-[1]">22</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div>
            <div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">国籍</div>
                  <div className="flex-grow-[1]">ベトナム</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div> 
            <div className="self-center">
              <Button type="primary" onClick={success}>友達になる</Button>
            </div>
					</div>
				</Card>
        </div>
				
        <div>
        <Card style={{flexGrow: 1}}>
          <div className="flex flex-col">
            <div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">電話番号</div>
                  <div className="flex-grow-[1]">0338833723</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div> 
            <div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">メール</div>
                  <div className="flex-grow-[1]">hoang1234@gmail.com</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div> 
            <div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">市</div>
                  <div className="flex-grow-[1]">ハノイ</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div> 
            <div className=" m-2 px-2 flex flex-col">
							<div className="flex-grow">
                <div className="flex flex-row">
                  <div className="flex-grow-[1]">レベル</div>
                  <div className="flex-grow-[1]">N2</div>
                </div>
              <hr style={{  backgroundColor: '#ccc', height: 1,}} /> </div>
						</div> 
            <div className=" m-2 px-2">
              <img src=""/>
            </div>
          </div>
        </Card>
        </div>
			</div>
		</div>
	);
};

export default Profile;
