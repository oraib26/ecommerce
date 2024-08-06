import { useFormik } from 'formik'
import { resetPassSchema } from '../validation/Validate.js'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
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
             
            });
            navigate('/auth/forgotPassword');
        }
        //console.log("test")




    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: resetPassSchema
    })
    const inputs = [ //داينمك 

        {
            id: 'email',
            type: 'email',
            name: 'email',
            title: 'user email',
            value: formik.values.email,
            icon: (
                <svg
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></rect>{" "}
                  </g>
                </svg>
              ),

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
            errors={formik.errors}
            {...input}
            />
    )


    return (
        <div className="container pb-5 vh-100 mt-5 pt-5">
        <div className="mt-5"
        >
            <h2 className="text-center mb-5 basicFontFamily basicTextColor">
          {" "}
          Forgot Your Password{" "}
        </h2>
        {/* انك تايب طريقة تدعم تشفير الفايل  */}
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="w-50 border border-2 p-5 m-auto  rounded shadow"
        >
          {renderInputs}
          <button
            type="submit"
            disabled={!formik.isValid}
            className="d-flex m-auto px-5 basicBgColor border-0 rounded py-1 bold"
          >
            send code
          </button>
        </form>
        </div>
       
      </div>
    )
}
