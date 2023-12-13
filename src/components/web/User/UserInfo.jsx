import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loading from '../../loading/Loading';

function UserInfo() {
    let {userData,loading} = useContext(UserContext);
    if(loading){
        return <Loading/>
    }

  return (
    <div>
      <p> <b>User Name :</b> {userData.userName} </p>
      <p> <b>User Image :</b> <img src={userData.image.secure_url}/> </p>
    </div>
  )
}

export default UserInfo