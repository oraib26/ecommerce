import React from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { registerschema } from "../validation/Validate.js";
import axios from "axios";
import { toast } from "react-toastify";


function Register() {
  const initialValues = {
    userName: "", //اكتبيهن نفس ما بده الباك اند
    email: "",
    password: "",
    image: "",
  };
  const handleFieldChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const onSubmit = async (users) => {
    const formData = new FormData();
    formData.append("userName", users.userName); //اضافة داتا
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("image", users.image);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      formData
    );

    if (data.message == "success") {
      formik.resetForm(); //افرغ الفورم لما بدي اجي اسجل من جديد
      // console.log(formik)

      toast(
        "account created successfully , please verify your e-mail to login"
      ),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        };
    }
    // console.log(data)
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerschema,
  });
  const inputs = [
    //داينمك
    {
      id: "username",
      type: "text",
      name: "userName",
      title: "user name",
      value: formik.values.userName,
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1ZM8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5Z"
              fill="#000000"
            ></path>{" "}
            <path
              d="M8 14C4.68629 14 2 16.6863 2 20V22C2 22.5523 2.44772 23 3 23C3.55228 23 4 22.5523 4 22V20C4 17.7909 5.79086 16 8 16H16C18.2091 16 20 17.7909 20 20V22C20 22.5523 20.4477 23 21 23C21.5523 23 22 22.5523 22 22V20C22 16.6863 19.3137 14 16 14H8Z"
              fill="#000000"
            ></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      id: "email",
      type: "email",
      name: "email",
      title: "user email",
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
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "user password",
      value: formik.values.password,
      icon: (
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          stroke="#000000"
          strokeWidth="3.504"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}",
                }}
              />
            </defs>
            <path
              className="a"
              d="M24,25.28a3.26,3.26,0,0,0-1.64,6.07V36h3.32V31.35a3.28,3.28,0,0,0,1.61-2.8v0A3.27,3.27,0,0,0,24,25.28Z"
            />
            <rect
              className="a"
              x="7.38"
              y="17.77"
              width="33.23"
              height="25.73"
              rx="4.32"
            />
            <path
              className="a"
              d="M13.35,17.77V15.16a10.66,10.66,0,0,1,21.32,0v2.61"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "image",
      type: "file", //الفايل لاي اشي ما اله قيمه مثل الفايل العادي او الصورة او زي هيك اشي
      name: "image",
      title: "user image",
      onChange: handleFieldChange, // لما يصير تغيير عالانبوت ناديلي هالفنكشن
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.17157 3.17157C2 4.34314 2 6.22876 2 9.99999V14C2 17.7712 2 19.6568 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V14V9.99999C22 7.16065 22 5.39017 21.5 4.18855V17C20.5396 17 19.6185 16.6185 18.9393 15.9393L18.1877 15.1877C17.4664 14.4664 17.1057 14.1057 16.6968 13.9537C16.2473 13.7867 15.7527 13.7867 15.3032 13.9537C14.8943 14.1057 14.5336 14.4664 13.8123 15.1877L13.6992 15.3008C13.1138 15.8862 12.8212 16.1788 12.5102 16.2334C12.2685 16.2758 12.0197 16.2279 11.811 16.0988C11.5425 15.9326 11.3795 15.5522 11.0534 14.7913L11 14.6667C10.2504 12.9175 9.87554 12.0429 9.22167 11.7151C8.89249 11.5501 8.52413 11.4792 8.1572 11.5101C7.42836 11.5716 6.75554 12.2445 5.40989 13.5901L3.5 15.5V2.88739C3.3844 2.97349 3.27519 3.06795 3.17157 3.17157Z"
              fill="#222222"
            ></path>{" "}
            <path
              d="M3 10C3 8.08611 3.00212 6.75129 3.13753 5.74416C3.26907 4.76579 3.50966 4.2477 3.87868 3.87868C4.2477 3.50966 4.76579 3.26907 5.74416 3.13753C6.75129 3.00212 8.08611 3 10 3H14C15.9139 3 17.2487 3.00212 18.2558 3.13753C19.2342 3.26907 19.7523 3.50966 20.1213 3.87868C20.4903 4.2477 20.7309 4.76579 20.8625 5.74416C20.9979 6.75129 21 8.08611 21 10V14C21 15.9139 20.9979 17.2487 20.8625 18.2558C20.7309 19.2342 20.4903 19.7523 20.1213 20.1213C19.7523 20.4903 19.2342 20.7309 18.2558 20.8625C17.2487 20.9979 15.9139 21 14 21H10C8.08611 21 6.75129 20.9979 5.74416 20.8625C4.76579 20.7309 4.2477 20.4903 3.87868 20.1213C3.50966 19.7523 3.26907 19.2342 3.13753 18.2558C3.00212 17.2487 3 15.9139 3 14V10Z"
              stroke="#222222"
              stroke-width="2"
            ></path>{" "}
            <circle cx="15" cy="9" r="2" fill="#222222"></circle>{" "}
          </g>
        </svg>
      ),
    },
    // الفاليو الي بتنحط جوا الانبوت احنا بنحطها
  ];
  // console.log(formik.resetForm)

  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      onChange={input.onChange || formik.handleChange} //  اول شرط بشتغل مع الصورة اذا اصر تغيير عليها  ,
      onBlur={formik.handleBlur} // هون استدعينا الاون بلور والتاتشد عشان لما بدنا نسجل بالحقل يركز بالحقل نفسه لحد ما يخلصه وبعدها ينتقل عالحقل الثاني ويعمل اله فالييديت
      touched={formik.touched}
      errors={formik.errors}
      {...input}
    />
  ));
  return (
    <>
      <div className="container pb-5 vh-100 mt-5 py-4">
        <h2 className="text-center mb-5 basicFontFamily basicTextColor">  Create Your Account </h2>
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
            register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
