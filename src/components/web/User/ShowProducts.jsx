import React, { useContext } from 'react'
import { OrderContext } from '../context/Order.jsx';
import { useQuery } from 'react-query';
import { Link, Outlet, useParams } from 'react-router-dom';

function ShowProducts() {
  const { orderId } = useParams();
  console.log(orderId);

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

    <table className="table table-bordered  table-striped table-primary  ">
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>productId</th>
          <th>quantity</th>
          <th>unitPrice</th>

        </tr>
      </thead>


      <tbody >
        {data.orders.map((order, index) => (
          order._id === orderId ?
            (
              order.products.map((product, index) =>

                <tr key={index}>
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>{product.productId}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unitPrice}</td>
                </tr>


              ))


            : <tr></tr>


        )
        )}

      </tbody>

    </table>

  )
}

export default ShowProducts