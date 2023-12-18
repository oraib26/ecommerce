import React, { useContext } from 'react'
import { OrderContext } from '../context/Order.jsx';
import { useQuery } from 'react-query';
import { Link, Outlet, useParams } from 'react-router-dom';

function MyOrders() {
  let {orderId}=useParams();
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
  console.log(data)
  const showPro = (orderId) => {
     id=orderId;
  }

  return (

    <>
      <table className="table table-bordered  table-striped  ">
        <thead>
          <tr>
            <th>#</th>
            <th>createdAt</th>
            <th>address</th>
            <th>finalPrice</th>
            <th>paymentType</th>
            <th>phoneNumber</th>
            <th>status</th>
            <th> products</th>
          </tr>
        </thead>


        <tbody>
          {data?.orders.length ? data.orders.map((order, index) =>

            <tr key={index}>
              <td>{index}</td>
              <td>{order.createdAt}</td>
              <td>{order.address}</td>
              <td>{order.finalPrice}</td>
              <td>{order.paymentType}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.status}</td>
              <td><Link to={`${order._id}`}  >show</Link></td>


            </tr>


          ) : <tr>no orders yet ..</tr>}
        </tbody>


      </table>
      <div className="  p-3">
        <Outlet />
      </div>

    </>


  )
}

export default MyOrders