import { useFormik } from 'formik'
import { resetPassSchema } from '../validation/Validate.js'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Input from '../../pages/Input.jsx'



export default function SendCode() {
    const navigate = useNavigate();

    const initialValues = {//اكتبيهن نفس ما بده الباك اند
        email: '',

    }
    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users);

        if (data.message == "success") {
            toast.success('Sended Code succesfully, cheak you email plz', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/auth/forgotPassword');
        }
        //console.log("test")




    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        resetPassSchema: resetPassSchema
    })
    const inputs = [ //داينمك 

        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,

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
        <div>
            <h3 className='text-center mt-3'> ~ Reset Password ~</h3>

            <form onSubmit={formik.handleSubmit} className='w-25 border border-black border-2 ps-2 pb-2 my-5 m-auto bg-success-subtle rounded'>
                {renderInputs}
                <button type='submit' disabled={!formik.isValid} className='d-flex mt-3 px-5'>send</button>
            </form>

        </div>
    )
}
