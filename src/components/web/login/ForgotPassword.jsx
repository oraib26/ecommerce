import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {forgetpassSchema} from '../validation/Validate.js'
import Input from '../../pages/Input';

function ForgotPassword() {
    const navigate = useNavigate();
    const initialValues = {//اكتبيهن نفس ما بده الباك اند
        email: '',
        password: '',
        code:''
    }

    const onSubmit = async users => {


        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, users)
        //console.log(data.message)

        if (data.message == "success") {
   
            toast.success('reset password succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/login')

        }
       // console.log(data)
    }




    const formik = useFormik({
        initialValues,
        onSubmit,
        forgetpassSchema: forgetpassSchema
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
            title: ' new user password',
            value: formik.values.password,

        },
        {
            id: 'code',
            type: 'text',
            name: 'code',
            title: 'code',
            value: formik.values.code,

        },
   
        // الفاليو الي بتنحط جوا الانبوت احنا بنحطها 


    ]
   // console.log(formik.values)


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
                    <button type='submit' disabled={!formik.isValid} className='d-flex m-auto px-5'>reset password</button>
                </form>

            </div>


        </>
    )
}

export default ForgotPassword