import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/User';

export default function UserDetails() {
  let {userData,setUserToken,getUserData} = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem("userToken")!="null"){
      setUserToken(localStorage.getItem("userToken"));
      getUserData();
      //console.log(text)
    }
  })

  return (
    <div className='container border w-50 py-3 my-4 bg-body-tertiary'>
      <h2 className='text-center'>{userData.userName}'s details : </h2>
      <p> <b>User Name :</b> {userData.userName} </p>
      <p> <b>User Email :</b> {userData.email} </p>
      <p> <b>User Status :</b> {userData.status} </p>
      <p> <b>Role :</b> {userData.role} </p>
      <p> <b>createdAt :</b> {userData.createdAt} </p>
      <p> <b>User Image :</b> <img src={userData.image.secure_url}/> </p>
      

      
    </div>
  )
}
