import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../context/Cart.jsx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

function Cart() {
  const {
    getCartContext,
    removeItemContext,
    clearCartContext,
    decreaseQuantityContext,
    increaseQuantityContext,
  } = useContext(CartContext);
  const queryClient = useQueryClient();
  let total = 0;

  const removeCartMutation = useMutation(
    ({ productId }) => removeItemContext(productId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  const clearCartMutation = useMutation(
    () => clearCartContext(),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  const increaseQuntMutation = useMutation(
    ({productId}) => increaseQuantityContext(productId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  const decreaseQuntMutation = useMutation(
    ({productId}) => decreaseQuantityContext(productId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
    }
  );
  const getCart = async () => {
    const res = await getCartContext();
    return res;
  };
  const { data, isLoading } = useQuery("cart", getCart);
  if (isLoading) {
    return "";
  }
  data?.products.map((product) => {
    total = total + product.details.finalPrice * product.quantity;
  });
  const clearCart = () => {
    clearCartMutation.mutate({});

  };

  const removeCart = async (productId) => {
    removeCartMutation.mutate({ productId});

    // const res = await removeItemContext(productId);
    // return res;
  };

  const clkToDecrease = async (productId) => {
    decreaseQuntMutation.mutate({ productId});
  };
  const clkToIncrease = async (productId) => {
    increaseQuntMutation.mutate({ productId});
  };


  return (
    <div className="cart">
      <div className="container ">
        <div className="row ">
          <div className="w-50 position-relative">
            {data?.count != 0 ? (
              <button
                className="w-25 border-0 fw-bold rounded position-absolute bg-dark text-white clearAll-btn"
                disabled={!data?.count}
                onClick={clearCart}
              >
                Clear Cart
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="cart-items ">
            <div className="products p-3" id="products">
              <div className="item  ">
                <div className="product-info ps-5 ms-5">
                  <h2>Product</h2>
                </div>
                <div className="quantity">
                  <h2>Quantity</h2>
                </div>
                <div className="price">
                  <h2>Price</h2>
                </div>
                <div className="subtotal">
                  <h2>Subtotal</h2>
                </div>
              </div>

              {data?.products.length ? ( //اقواس بدون ريترن  ما بزبط {}
                data.products.map((product, index) => (
                  <div className="item" key={product._id}>
                    <div className="product-info mb-2">
                      <button
                        onClick={() => removeCart(product.details._id)}
                        className="w-25 remove-btn"
                        title="remove item"
                      >
                        <svg
                          width="23px"
                          height="23px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M10 11V17"
                              stroke="#c62424"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M14 11V17"
                              stroke="#c62424"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M4 7H20"
                              stroke="#c62424"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                              stroke="#c62424"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                            <path
                              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                              stroke="#c62424"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                      <img
                        src={product.details.mainImage.secure_url}
                        className="rounded"
                      />
                      <div className="product-details d-flex align-items-center justify-content-center">
                        <h2>{product.details.name}</h2>
                      </div>
                    </div>
                    <div className="quantity">
                      <button
                        onClick={() => clkToDecrease(product.details._id)}
                        className="rounded-circle "
                      >
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M6 12L18 12"
                              stroke="#000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button
                        onClick={() => clkToIncrease(product.details._id)}
                        className="rounded-circle "
                      >
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#000"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M4 12H20M12 4V20"
                              stroke="#000"
                              stroke-width="2.140"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                    </div>
                    <div className="price ">
                      {product.details.discount > 0 ? (
                        <div className="">
                          <span className="text-decoration-line-through fs-6 d-block">
                            {product.details.price}
                          </span>
                          <span className="text-danger fs-5">
                            ${product.details.finalPrice}
                          </span>
                        </div>
                      ) : (
                        <span>${product.details.price}</span>
                      )}
                    </div>
                    <div className="subtotal">
                      ${product.details.price * product.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="basicFontFamily">cart is empty ..</h2>
              )}
            </div>

            <div className="cart-summary w-25 p-0 border-0 shadow-lg ms-3">
              <h2 className="text-center pt-3 text-capitalize">Cart summary</h2>
              <div className="summery-items pb-3">
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Free shipping</label>
                  </div>
                  <span>$0.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Express shipping</label>
                  </div>
                  <span>+$15.00</span>
                </div>
                <div className="summary-item">
                  <div className="form-group">
                    <input type="radio" /> <label>Pick Up</label>
                  </div>
                  <span>%21.00</span>
                </div>

                <div className="summary-footer">
                  <label className="total">Total</label>
                  <span>${total}</span>
                </div>
                {console.log(data?.products.length)}
                <button
                  className="checkout border-0 bg-light"
                  disabled={data?.products.length == 0}
                >
                  {data?.products.length != 0 ? (
                    <Link to="/order">Chekout</Link>
                  ) : (
                    <p>Chekout</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
