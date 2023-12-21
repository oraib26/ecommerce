import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
//import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/Cart.jsx';
import { UserContext } from '../context/User.jsx';
import Loading from '../../loading/Loading.jsx';

function Product() {

  const { productId } = useParams();
  const { loading, isLoading2 } = useContext(UserContext)
  const { getCartContext } = useContext(CartContext);

  let navigate = useNavigate();
  const getProductDetails = async () => {

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
    isLoading2(false)

    //console.log(data)

    return data.product;

  }
  const { data, isLoading } = useQuery('product_details', getProductDetails);

  if (isLoading) {
    return ""
  }


  const { addToCartContext } = useContext(CartContext);
  let { userToken } = useContext(UserContext);

  const addToCart = async (productId) => {
    if (userToken) {
      const res = await addToCartContext(productId);
      console.log(productId)

    }
    else {
      navigate('/login')

    }
  }


  return (
    <div className=' container py-5  '>
      <div className="row text-center border  m-auto rounded-top bg-light bg-gradient w-75 shadow-lg">
      <div className='  p-2 col-md-9 '>
        <h2 className='fs-4 bg-secondary text-light  w-75 m-auto my-2 text-center rounded'> {data.name}</h2>
        <p><b>description :</b> {data.description}</p>
        <p className='text-primary-emphasis '><b className='text-black '>price:</b> <span className='fs-4 '>{data.price}$</span></p>
        <button className='btn btn-dark d-block m-auto ' onClick={() => addToCart(data._id)}> Add to Cart    ...</button>

        <Link className='btn border w-50 mt-2 text-primary-emphasis rounded-pill' to='reviews' > view reviews ⍨ </Link>
      </div>

      <div className=' mb-4 mt-3 col-md-3 '>
        {data?.subImages.length ? data.subImages.map((productImage) =>
          <div className="col-md-4">
            <img src={productImage.secure_url} alt="" />
          </div>

        ) : ""}
      </div>


      </div>





      <div className='py-3'>
        <Outlet />
      </div>

    </div>

  )
}

export default Product