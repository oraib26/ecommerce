import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
//import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from "../context/Cart.jsx";
import { UserContext } from "../context/User.jsx";
import Loading from "../../loading/Loading.jsx";
import "./products.css";

function Product() {
  const { productId } = useParams();
  const { loading, isLoading2 } = useContext(UserContext);
  const { getCartContext } = useContext(CartContext);
  const queryClient = useQueryClient();
  const { addToCartContext } = useContext(CartContext);
  let { userToken } = useContext(UserContext);
  let navigate = useNavigate();
  const getProductDetails = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    isLoading2(false);

    //console.log(data)

    return data.product;
  };
  const { data, isLoading } = useQuery("product_details", getProductDetails);
  const {
    data: cartData,
    isLoading: cartLoading,
    error: cartError,
  } = useQuery(["cart"], () => getCartContext());
  
  const addToCartMutation = useMutation(
    ({ productId }) => addToCartContext(productId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );

  const addToCart = async (productId) => {
    if (userToken) {
      addToCartMutation.mutate({ productId});
    } else {
      navigate("/login");
    }
  };
  if (isLoading) {
    return <Loading/>;
  }


  return (
    <div className=" productDetalies ">
      <div className="vh-100">
      <div className=" container vh-100 d-flex">
        <div className="row    border  m-auto rounded-top bg-light bg-gradient w-75 shadow-lg">
          <div className="  p-2 col-md-9  ">
            <h2 className="fs-4  w-75 m-auto my-2 text-center rounded basicFontFamily my-3">
              {" "}
              {data.name}
            </h2>
            <p className="w-75 m-auto">
              <b>Description :</b> {data.description}
            </p>
            <p className="text-primary-emphasis w-75 m-auto ">
              <b className="text-black ">Price:</b>{" "}
              <span className="fs-4 ">{data.price}$</span>
            </p>
            <button
              className="basicBgColor d-block m-auto rounded border-0 p-2"
              onClick={() => addToCart(data._id)}
            >
              {" "}
              Add to Cart
            </button>

            <div className="w-50 m-auto">
            <Link
              className="btn border w-100 mt-2 text-primary-emphasis rounded-pill  "
              to="reviews"
            >
              {" "}
              view reviews ⍨{" "}
            </Link>
            </div>
          </div>

          <div className=" mb- mt-3 col-md-3 ">
            {data?.subImages.length
              ? data.subImages.map((productImage) => (
                  <div className="col-md-4">
                    <img src={productImage.secure_url} alt="" />
                  </div>
                ))
              : ""}
          </div>
        </div>

       
      </div>
      </div>
      <div className=" container  ">
          <Outlet/>
        </div>
    </div>
  );
}

export default Product;
