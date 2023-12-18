import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import { CartContext } from '../context/Cart';
import './navbar.css';
import Loading from '../../loading/Loading';

function Navbar() {
  let { userToken, setUserToken, userData, setUserData, loading } = useContext(UserContext);
  const { getCartContext } = useContext(CartContext);

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken')
    setUserToken(null);
    setUserData(null);
    navigate('/home')

  }


  const { data, isLoading } = useQuery("Cart", getCartContext)
  if (isLoading) {
    return <Loading />;

  }
  // console.log(userToken)
  // console.log(data)


  return (
    <>

      <nav className={`navbar navbar-expand-lg `}>
        <div className="container-fluid">
          <a className="navbar-brand ms-5  " href="#">O-shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0  border ">
              <li className="nav-item mx-2">
                <Link className="nav-link active border-end  " aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link border-end " to="/categories">Categoreis</Link>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link " href="#">Products</a>
              </li>

              {userToken ?
                <li className="nav-item mx-2">
                  <Link className="nav-link border-start " to='/cart'>
                    Cart{data ? <b className=' px-2'>🛒{data.count}+ </b> : <b className='px-2'>🛒0 + </b>} </Link>
                </li> : null}
              {/*   */}


            </ul>

            <ul className="navbar-nav me-5">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData != null ? userData.userName : 'Account'}
                </a>
                <ul className="dropdown-menu ">


                  {userToken == null ? <>
                    <li><Link className="dropdown-item" to="/register">register</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/login">login</Link></li>
                  </> :
                    <>
                      <li><Link className="dropdown-item " to="/user/profile">profile</Link></li>

                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
                    </>

                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar