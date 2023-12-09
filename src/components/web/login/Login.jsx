import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik'
import { loginschema } from '../validation/Validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.jsx'



function Login() {
    let {setUserToken,userToken} = useContext(UserContext);
    const navigate = useNavigate();
    const initialValues = {//اكتبيهن نفس ما بده الباك اند
        email: '',
        password: '',
    }
    console.log(userToken);

    if(userToken){
        return navigate(-1);

    }

    const onSubmit = async users => {


        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`, users)
        //console.log(data.message)

        if (data.message == "success") {
           localStorage.setItem("userToken", data.token)//لالمعلومات الي في التوكين ما بتكون معلومات سريه وبقدر اعمل انكود للتوكين واحصل ع معلومات اليوزر , طب ليه بنشفرها؟ ,عشان امنعه اعدل عليها مش امنعه من انه يشوفها 
           setUserToken(data.token)
           
           // saveCurrentUser(); //فك تشفير البيانات وعمل ابديت لبيانات وحالة اليوزر
            //اذا في اللوكل ستوريج يوزر توكين معناها اليوزر عامل لوغ إن اما اذا مش موجودة في اللوكل ستوريج اليوزر عامل تسجيل خروج
            toast.success('login succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/home')

        }
       // console.log(data)
    }




    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginschema
    })
    const inputs = [ //داينمك 

        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,

        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'user password',
            value: formik.values.password,

        },
   
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
        <>
            <div className="container pb-5 ">
                <h2 className='text-center mt-3'> ~ Login ~</h2> 
                {/* انك تايب طريقة تدعم تشفير الفايل  */}
                <form onSubmit={formik.handleSubmit} className='w-50 border border-black border-2 p-2 m-auto bg-success-subtle rounded'>
                    {renderInputs}
                    <button type='submit' disabled={!formik.isValid} className='d-flex m-auto px-5'>login</button>
                    <Link to='/auth/sendcode'>reset password</Link>
                </form>

            </div>


        </>
    )
}

export default Login