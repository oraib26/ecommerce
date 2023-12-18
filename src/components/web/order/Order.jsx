import React, { useContext } from 'react'
import { useFormik } from 'formik'
import Input from '../../pages/Input.jsx'
import { OrderContext } from '../context/Order.jsx';
import { CartContext } from '../context/Cart.jsx';
import { useQuery } from 'react-query';
import { sendOrder } from '../validation/Validate.js';




function Order() {

  const { createOrderContext } = useContext(OrderContext);
  const { getCartContext } = useContext(CartContext);
  // const navigate = useNavigate();

  const initialValues = {//اكتبيهن نفس ما بده الباك اند
    phone: '',
    address: '',
    couponName: ''

  }
  const onSubmit = async users => {
    const res = await createOrderContext(users);
    return res;


    // navigate('/auth/forgotPassword');
  }




  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendOrder
  })
  const inputs = [ //داينمك 

    {
      id: 'phone',
      type: 'text',
      name: 'phone',
      title: 'user phone',
      value: formik.values.phone,

    }, {
      id: 'address',
      type: 'text',
      name: 'address',
      title: 'user address',
      value: formik.values.address,

    }, {
      id: 'cpoupon',
      type: 'text',
      name: 'cpoupon',
      title: 'user cpoupon',
      value: formik.values.couponName,

    }
    // الفاليو الي بتنحط جوا الانبوت احنا بنحطها 


  ]
  const renderInputs = inputs.map((input, index) =>
    <Input type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      onChange={formik.handleChange}//  اول شرط بشتغل مع الصورة اذا اصر تغيير عليها  , 
      onBlur={formik.handleBlur}// هون استدعينا الاون بلور والتاتشد عشان لما بدنا نسجل بالحقل يركز بالحقل نفسه لحد ما يخلصه وبعدها ينتقل عالحقل الثاني ويعمل اله فالييديت
      touched={formik.touched}
      errors={formik.errors} />
  )
  const getCart = async () => {
    const res = await getCartContext();
    //console.log(res)
    return res;

  }
  const { data, isLoading } = useQuery("Cart", getCart)
  if (isLoading) {
    return "";
  }
  console.log(data)



  return (
    <div >
      <h1 className=' mt-3   text-center w-25 m-auto bg-primary-subtle'>  Create Order </h1>
      <div className="row  container m-auto">
        <div className="col-md-4 ">
        <form onSubmit={formik.handleSubmit} className=' border border-2 ps-2 pb-2 my-5 ms-4  bg-light rounded'>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid} className='d-flex mt-3 px-5 m-auto'>order</button>
      </form>
        </div>
     

      <div className=" col-md-6 mt-5 ">
        <table className="table  table-striped  border  ">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>productId</th>
              <th>quantity</th>
              <th>finalPrice</th>

            </tr>
          </thead>


          <tbody >
            {data?.products.length ? ( //اقواس بدون ريترن  ما بزبط {}
              data.products.map((product, index) =>

                <tr key={index}>
                  <td>{index}</td>
                  <td>{product.details.name}</td>
                  <td>{product.productId}</td>
                  <td>{product.quantity}</td>
                  <td>{product.details.finalPrice}</td>
                </tr>


              


             )) : <tr></tr>}



          </tbody>

        </table>

      </div>

      </div>

     
    </div>
  )
}

export default Order