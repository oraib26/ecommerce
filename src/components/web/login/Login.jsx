import React, { useContext } from "react";
import Input from "../../pages/Input.jsx";
import { useFormik } from "formik";
import { loginschema } from "../validation/Validate.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.jsx";

function Login() {
  let { setUserToken, userToken } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    //اكتبيهن نفس ما بده الباك اند
    email: "",
    password: "",
  };
  console.log(userToken);

  if (userToken) {
    return navigate(-1);
  }

  const onSubmit = async (users) => {
    try{
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        users
      );
      //console.log(data.message)
      console.log(data)
  
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token); //لالمعلومات الي في التوكين ما بتكون معلومات سريه وبقدر اعمل انكود للتوكين واحصل ع معلومات اليوزر , طب ليه بنشفرها؟ ,عشان امنعه اعدل عليها مش امنعه من انه يشوفها
        setUserToken(data.token);
  
        // saveCurrentUser(); //فك تشفير البيانات وعمل ابديت لبيانات وحالة اليوزر
        //اذا في اللوكل ستوريج يوزر توكين معناها اليوزر عامل لوغ إن اما اذا مش موجودة في اللوكل ستوريج اليوزر عامل تسجيل خروج
        toast.success("login succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/home");
      }
    }catch(error){
      console.log(error)
      if(error.response.data.message =="data invalid"){
      toast.error("data invalid", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    
      });}
      else if(error.response.data.message =="plz confirm your email"){
        toast.error("plz confirm your email", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      
        });}
      
    }

  
    // console.log(data)
  };



  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginschema,
  });
  const inputs = [
    //داينمك

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

  const renderInputs = inputs.map((input, index) => (
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      key={index}
      onChange={formik.handleChange} //  اول شرط بشتغل مع الصورة اذا اصر تغيير عليها  ,
      onBlur={formik.handleBlur} // هون استدعينا الاون بلور والتاتشد عشان لما بدنا نسجل بالحقل يركز بالحقل نفسه لحد ما يخلصه وبعدها ينتقل عالحقل الثاني ويعمل اله فالييديت
      touched={formik.touched}
      errors={formik.errors}
      {...input}
    />
  ));
  return (
    <>
      <div className="container pb-5 vh-100 mt-5 py-4">
        <h2 className="text-center mb-5 basicFontFamily basicTextColor">
          {" "}
          Login For Your Account{" "}
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
            login
          </button>
          <Link to={'/auth/sendcode'} className="text-secondary fw-bold "><p className="text-center my-3">forgot your password?</p></Link>
        </form>
       
      </div>
    </>
  );
}

export default Login;
