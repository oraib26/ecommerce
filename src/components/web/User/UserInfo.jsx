import React, { useContext } from "react";
import { UserContext } from "../context/User";
import Loading from "../../loading/Loading";

function UserInfo() {
  let { userData, loading } = useContext(UserContext);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <img src={userData.image.secure_url} className="rounded" />
      <p className="mt-3">
        <b>User Name :</b> {userData.userName}
      </p>
      <p>
        <b>User Email :</b> {userData.email}
      </p>
      <p>
        <b>User phone :</b> {userData.phone ? userData.phone : '-----'}
      </p>
    </div>
  );
}

export default UserInfo;
