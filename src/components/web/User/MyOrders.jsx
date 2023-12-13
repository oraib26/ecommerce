import React, { useContext } from 'react'
import { OrderContext } from '../context/Order.jsx';
import { useQuery } from 'react-query';

function MyOrders() {
  const { getOrderContext } = useContext(OrderContext);

  const getOrder = async () => {
    const res = await getOrderContext();
    // console.log(res)
    return res;

  }
  const { data, isLoading } = useQuery("order", getOrder)
  if (isLoading) {
    return "";
  }

  return (

    <div> {data?.orders.length ?

      <>
        hi
      </>





      : <h3 className='text-info-emphasis fw-bold '>No orders yet ...</h3>}</div>
  )
}

export default MyOrders