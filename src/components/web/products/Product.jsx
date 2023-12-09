import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
//import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/Cart.jsx';
import { UserContext } from '../context/User.jsx';

function Product() {
  const { productId } = useParams();
  let navigate = useNavigate();


  const getProductDetails = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
    //console.log(data)
    return data.product;
  }
  const { data, isLoading } = useQuery('product_details', getProductDetails);

  if (isLoading) {
    return <p>...Loading</p>
  }
  const { addToCartContext } = useContext(CartContext);
  let {userToken} = useContext(UserContext);

  const addToCart = async (productId) => {
    if(userToken){
    const res = await addToCartContext(productId);
  }
  else{
    navigate('/login')

  }
    
   

  }

  return (
    <div className='w-50 container border my-3 p-2'>
      <h2 className='fs-4 bg-warning-subtle'>Details for <span className='text-danger '>{data.name}</span> :</h2>
      <p><b>description :</b> {data.description}</p>
      <p><b>price:</b> {data.price}$</p>
      <p><b>stock:</b> {data.stock}</p>


      <b>more subImages :</b>
      <div className='row mb-4 mt-3'>
        {data?.subImages.length ? data?.subImages.map((productImage) =>
          <div className="col-md-4">
            <img src={productImage.secure_url} alt="" />
          </div>

        ) : ""}
      </div>

      <button className='btn btn-outline-info ' onClick={() => addToCart(data._id)}> Add to Cart</button>
    </div>
  )
}

export default Product