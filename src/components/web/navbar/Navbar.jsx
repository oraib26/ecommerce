import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import { CartContext } from '../context/Cart';
import './navbar.css';
import Loading from '../../loading/Loading';

function Navbar() {
  let { userToken, setUserToken, userData, setUserData, loading } = useContext(UserContext);
  const { count } = useContext(CartContext);

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken')
    setUserToken(null);
    setUserData(null);
    navigate('/home')

  }

  // console.log(userToken)
  // console.log(userData)


  return (
    <>

      <nav className={`navbar navbar-expand-lg `}>
        <div className="container-fluid">
          <a className="navbar-brand ms-5  " href="#"><img  className="img-fluid rounded" src="/public/logo-oraib.jpg" alt="" /></a>
          <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0   ">
              <li className="nav-item mx-2">
                <Link className="nav-link active  " aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link " to="/categories">Categoreis</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link " to='/products'>Products</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link " to='/products'>About</Link>
              </li>

              {userToken ?
                <li className="nav-item mx-2">
                  <Link className="nav-link " to='/cart'>
                    Cart <b className=' px-2 basicTextColor'>🛒{count}+ </b>  </Link>
                </li> : null}
              {/*   */}


            </ul>

            <ul className="navbar-nav p-0 me-5">
              <li className="nav-item dropdown me-5">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData != null ?
          
                    userData.userName
                    /* <img src={userData.image.secure_url} alt="userImage" className='rounded-circle  p-4   '  /> */
         
                  
                  : 'Account'}
                </a>
                <ul className="dropdown-menu m-0 p-0">


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