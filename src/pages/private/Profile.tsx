import { FC } from "react";
import { useParams } from "react-router-dom";

const Profile: FC = () => {
  const { id } = useParams<{ id?: string }>();
  return <div>Profile {id ? `userId: ${id}` : "personal"}</div>;
};

export default Profile;
