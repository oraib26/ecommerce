import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, Outlet, useParams } from 'react-router-dom';

function ProductReviews() {
  const {productId} =useParams();
  console.log(productId)

  const getProductReviews = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
    return data.product;
  }
  const { data, isLoading } = useQuery('product_Reviews', getProductReviews);
  if (isLoading) {
    return <p>...Loading</p>
  }
  console.log(data)
  
  return (
    <div className="py-5 border-top">
        <h3 className='d-inline '>Comments :</h3>
        <div className="">
        <Outlet/>
        </div>
        <Link className='btn btn-light text-black p-1 ms-2  ' to='addreview' >  <b>+</b>add comment</Link>


          {data?.reviews.length? data.reviews.map((review, index) =>
          <div className="rounded bg-danger-subtle m-3 w-75">
            <img src={review.createdBy.image.secure_url} alt="" />
            <div className=" d-inline position-absolute t-0">
            <b className='mx-2 '>{review.createdBy.userName}</b>
            <span className='mx-2'>
              {review.createdAt}</span>

            </div>
            <div className="d-inline mx-3">
              <span>{review.comment} ( <b>{review.rating}/5</b>)
              
              </span>

            </div>
           
            
            


          </div>          

            // <tr key={index}>
            //   <td>{index}</td>
            //   <td>{review.createdBy.userName}</td>
            //   <td>{review.comment}</td>              
            //   <td>{review.rating}</td>


            // </tr>


          ) : <tr>no review yet ..</tr>}

    </div>

      
    

    
    
  )
}

export default ProductReviews