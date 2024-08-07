import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/User';
import Loading from '../../loading/Loading';
import './userdetails.css'
import { Link, Outlet } from 'react-router-dom';

export default function UserDetails() {
  let { userData, setUserToken, getUserData, loading } = useContext(UserContext);
  if (loading) {
    return "";
  }
  //console.log(userData)



  return (

    <aside className=' profile border border-dark'>
      <div className="userDataLinks">
        <nav className='p-3 text-center'>
          <Link to='' className='text-white border-bottom border-dark my-3'>
            Information
          </Link>  
          <Link to='myOrders' className='text-white  border-bottom border-dark my-3'>
            Orders
          </Link>

        </nav>


      </div>

      <div className="UserData p-3">
        <Outlet />
      </div>




    </aside>
  )
}
