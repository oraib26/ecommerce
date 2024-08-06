import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import "./categories.css"
import Loading from "../../loading/Loading.jsx";
//import ReactImageMagnify from 'react-image-magnify';

function CategoriesDetails() {
  const { categoryId } = useParams("categoryId");
  const getCategoriesDetails = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${categoryId}`
    );
    //console.log(data)

    return data;
  };
  const { data, isLoading } = useQuery(
    "category_details",
    getCategoriesDetails
  );
  if (isLoading) {
    return <Loading/>;
  }

  return (
    data?.products.length  ? (
    <div className="vh-100 d-flex products11">
      <div className="products12 row container m-auto ">
      
         {
           data?.products.map((product) =>(
            
            <div
              className="product shadow text-center m-auto col-md-3"
              key={product._id}
            ><Link to={`/products/${product._id}`} className="text-decoration-none ">
              {/* <ReactImageMagnify {...{
                        smallImage: {
                            alt: product.name ,
                            isFluidWidth: true,
                            src: product.mainImage.secure_url
                        },
                        largeImage: {
                            src: product.mainImage.secure_url,
                            width: 1200,
                            height: 2000
                        },

                    }} /> */}
              <img src={product.mainImage.secure_url} className="img-fluid w-100 " />

              <h6 className=" my-3 basicTextColor w-75 m-auto">{product.name}</h6>
            </Link>
            </div>
          ))
         }
          </div>
          </div>
        ) : (
            <h2 className='d-flex justify-content-center align-items-center vh-100 basicFontFamily fw-bold'>No Products Found ...</h2>
        )
    
  );
}

export default CategoriesDetails;
