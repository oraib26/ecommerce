import React, { useContext } from 'react'
import { useFormik } from 'formik'
import Input from '../../pages/Input.jsx'
import { OrderContext } from '../context/Order.jsx';




function Order() {

  const { createOrderContext } = useContext(OrderContext);
 // const navigate = useNavigate();

  const initialValues = {//اكتبيهن نفس ما بده الباك اند
      phone: '',
      address:'',
      couponName:''

  }
  const onSubmit = async (phone,address,couponName) => {
    const  res  = await createOrderContext(phone,address,couponName);

    
       // navigate('/auth/forgotPassword');
    }
  

  

  const formik = useFormik({
      initialValues,
      onSubmit,
     // resetPassSchema: resetPassSchema
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
      value: formik.values.cpoupon,

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



  return (
    <div >
      <h3 className='text-center mt-3'> ~ create Order ~</h3>

      <form onSubmit={formik.handleSubmit} className='w-25 border border-black border-2 ps-2 pb-2 my-5 m-auto bg-success-subtle rounded'>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid} className='d-flex mt-3 px-5'>order</button>
      </form>
    </div>
  )
  }

export default Order