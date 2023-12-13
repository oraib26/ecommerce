import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import Loading from '../../loading/Loading';

function UserContact() {
    let {userData,loading} = useContext(UserContext);
    if(loading){
        return <Loading/>
    }


  return (
    <div>
        <p> <b>User Email :</b> {userData.email} </p>
        <p> <b>User phone :</b> {userData.phone} </p>

    </div>
  )
}

export default UserContact