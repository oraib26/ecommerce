import React, { useContext } from 'react'
import './Cart.css';
import { CartContext } from '../context/Cart.jsx';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Cart() {

  const { getCartContext, removeItemContext, clearCartContext,
    decreaseQuantityContext, increaseQuantityContext } = useContext(CartContext);

  const getCart = async () => {
    const res = await getCartContext();
    //console.log(res)
    return res;

  }
  const { data, isLoading } = useQuery("Cart", getCart)
  if (isLoading) {
    return "";
  }
  // console.log(data)
  const clearCart = () => {
    const res = clearCartContext();
    //console.log('ss')
    //return res;
  }



  const removeCart = async (productId) => {
    const res = await removeItemContext(productId);
    return res;
  }

  const clkToDecrease = async (productId) => {
    const res = await decreaseQuantityContext(productId);
    console.log('de')
    return res;

  }
  const clkToIncrease = async (productId) => {
    const res = await increaseQuantityContext(productId);
    //console.log(productId)
    return res;

  }
  return (
    <div className="cart">
      <div className="container ">
        <div className="row">
          <div className="cart-items">
            <div className="products  " id="products">
              <div className="item">
                <div className="product-info">
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
                data.products.map((product, index) =>

                  <div className="item" key={product._id}>
                    <div className="product-info">
                      <img src={product.details.mainImage.secure_url} />
                      <div className="product-details">
                        <h2>{product.details.name}</h2>
                      
                        <a href="#" onClick={() => removeCart(product.details._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={25}
                            viewBox="0 0 24 25"
                            fill="none"
                            className='pe-1'
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                              fill="#6C7275"
                              
                            />
                          </svg>
                          remove
                        </a>
                      </div>
                    </div>
                    <div className="quantity">
                      <button onClick={() => clkToDecrease(product.details._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={17}
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            d="M3.22852 8.5H12.5618"
                            stroke="#121212"
                            strokeWidth="0.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className='px-2'>{product.quantity}</span>
                      <button onClick={() => clkToIncrease(product.details._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={17}
                          viewBox="0 0 16 17"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                            fill="#121212"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="price">${product.details.price}</div>
                    <div className="subtotal">${(product.details.price) * (product.quantity)}</div>
                  </div>

                )


              ) : <h2>cart is empty</h2>}
              {
                data.count!=0 ? <button className='btn btn-warning w-25' disabled={!data.count} onClick={clearCart}>clear All</button>:""


              }






            </div>



            <div className="cart-summary w-25 p-0 border-0 shadow-lg ms-3">
              <h2 className='text-center pt-3 text-capitalize'>Cart summary</h2>
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
                  <label>Subtotal</label>
                  <span>$1234.00</span>
                </div>
                <div className="summary-footer">
                  <label className="total">Total</label>
                  <span>$1345.00</span>
                </div>
                {console.log(data.products.length)}
                <button className="checkout border-0 bg-light" disabled={data.products.length == 0}>
                  {
                    data.products.length != 0 ? <Link to='/order' >Chekout</Link> : <p>Chekout</p>

                  }

                </button>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>






  )
}

export default Cart