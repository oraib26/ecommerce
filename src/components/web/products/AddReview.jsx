import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {addReview, forgetpassSchema} from '../validation/Validate.js'
import Input from '../../pages/Input';

function AddReview() {
    const navigate = useNavigate();
  const { productId } = useParams();


    const initialValues = {//اكتبيهن نفس ما بده الباك اند
        comment: '',
        rating: '',
    }

    const onSubmit = async users => {
        try {
            const token = localStorage.getItem("userToken");


        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`, users
        ,{ headers: { Authorization: `Tariq__${token}` } }
        
        
        )
        
        console.log(data.message)

        if (data.message == "success") {
   
            toast.success('added review succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate(`/products/${productId}/reviews`)
            return data;

        }
    
    } catch (error) {
        alert('either must your product-status is delivered to add a comment <  or  > you already comments!!');

            console.log(error)
        }
       // console.log(data)
    }




    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: addReview
    })
    const inputs = [ //داينمك 

        {
            id: 'comment',
            type: 'text',
            name: 'comment',
            title: 'comment',
            value: formik.values.comment,

        },
        {
            id: 'rating',
            type: 'number',
            name: 'rating',
            title: 'rating',
            value: formik.values.rating,

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
            <div className="container py-5 ">
             
                {/* انك تايب طريقة تدعم تشفير الفايل  */}
                <form onSubmit={formik.handleSubmit} className='w-50 border shadow  p-2  bg-primary-subtle '>
                    {renderInputs}
                    <button type='submit' disabled={!formik.isValid } className='d-flex m-auto px-5 btn shadow '>comment</button>
                </form>

            </div>


        </>
    )
}

export default AddReview