import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User';
import { useQuery } from 'react-query';
import { CartContext } from '../context/Cart';

function Navbar() {
  let {userToken,setUserToken ,userData,setUserData} = useContext(UserContext);
  const { getCartContext } = useContext(CartContext);

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('userToken')
    setUserToken(null);
    setUserData(null);
    navigate('/home')

  }
  const getCart = async () => {
    const res = await getCartContext();
    //console.log(res)
      return res;

  }
  const { data, isLoading } = useQuery("Cart", getCart)
  if (isLoading) {
    return <p>...Loading</p>
  }



  return (
    <>

      <nav className="navbar navbar-expand-lg bg-danger-subtle">
        <div className="container-fluid">
          <a className="navbar-brand ms-5  " href="#">O-shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
            </span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0  px-3 border border-secondary-subtle ">
              <li className="nav-item">
                <Link className="nav-link active border-end border-secondary-subtle" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link border-end border-secondary-subtle" to="/categories">Categoreis</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">Products</a>
              </li>

              {userToken ? (<li className="nav-item">
                <Link className="nav-link border-start border-secondary-subtle" to='/cart'>Cart    {<b className='border border-danger px-2'>{data.count} 🛒 </b>} </Link>
              </li>) : null}


            </ul>

            <ul className="navbar-nav me-5">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData!=null?userData.userName:'Account'}
                </a>
                <ul className="dropdown-menu ">
                  {userToken == null ?( <>
                    <li><Link className="dropdown-item " to="/register">register</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/login">login</Link></li>
                  </>) :(
                    <>
                      <li><Link className="dropdown-item " to="/user/profile">profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
                    </>)

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