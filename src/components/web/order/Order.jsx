import React, { useContext } from "react";
import { useFormik } from "formik";
import Input from "../../pages/Input.jsx";
import { OrderContext } from "../context/Order.jsx";
import { CartContext } from "../context/Cart.jsx";
import { useQuery } from "react-query";
import { sendOrder } from "../validation/Validate.js";

function Order() {
  const { createOrderContext } = useContext(OrderContext);
  const { getCartContext } = useContext(CartContext);
  // const navigate = useNavigate();
  let total=0;

  const initialValues = {
    //اكتبيهن نفس ما بده الباك اند
    phone: "",
    address: "",
    couponName: "",
  };
  const onSubmit = async (users) => {
    const res = await createOrderContext(users);
    return res;

    // navigate('/auth/forgotPassword');
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendOrder,
  });
  const inputs = [
    //داينمك

    {
      id: "phone",
      type: "text",
      name: "phone",
      title: "user phone",
      value: formik.values.phone,
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
              d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      id: "address",
      type: "text",
      name: "address",
      title: "user address",
      value: formik.values.address,
      icon: (
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 1024 1024"
          fill="#000000"
          class="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z"
              fill=""
            ></path>
          </g>
        </svg>
      ),
    },
    {
      id: "copoun",
      type: "text",
      name: "copoun",
      title: "user copoun",
      value: formik.values.couponName,
      icon: (
        <svg
          fill="#000000"
          width="18px"
          height="18px"
          viewBox="0 0 64 64"
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
            <g data-name="32 promo" id="_32_promo">
              {" "}
              <path d="M60.27,42.05c-.28-.78-.38-1.07-.43-1.19a3.762,3.762,0,0,0-3.74-2.44c-.15,0-.3.01-.46.02-1.24.1-2.46.31-3.64.5-1.01.17-2.06.34-3.08.45a51.767,51.767,0,0,1-7.03.32,52.933,52.933,0,0,1-5.91-.51,3.661,3.661,0,0,0-.33-2.03,3.936,3.936,0,0,0-2.54-2.08l-9.48-2.58a9.588,9.588,0,0,0-4.58-.09l-4.08.91v-3.4a2,2,0,0,0-2-2H5.5a2,2,0,0,0-2,2v25a2.006,2.006,0,0,0,2,2h7.47a2.006,2.006,0,0,0,2-2V52.31l16.53,3a12.686,12.686,0,0,0,2.3.2,12.821,12.821,0,0,0,4.7-.89l19.52-7.73A3.8,3.8,0,0,0,60.27,42.05ZM12.97,54.93H5.5v-25h7.47Zm44.31-9.9L37.77,52.76a10.822,10.822,0,0,1-5.91.58L14.97,50.28V35.38l4.52-1.01a7.642,7.642,0,0,1,3.62.07l9.47,2.58a1.934,1.934,0,0,1,1.27,1.02,1.725,1.725,0,0,1,.03,1.44,2.022,2.022,0,0,1-2.02,1.17l-8.22-1.7a1,1,0,0,0-1.18.77,1.01,1.01,0,0,0,.77,1.19l8.28,1.71a.34.34,0,0,0,.1.01,2.748,2.748,0,0,0,.4.02,4.089,4.089,0,0,0,3.2-1.54,54.458,54.458,0,0,0,6.62.6,54.033,54.033,0,0,0,7.3-.33c1.08-.12,2.16-.29,3.2-.47,1.14-.19,2.32-.38,3.48-.48a1.948,1.948,0,0,1,2.15,1.11v.01l.43,1.18A1.814,1.814,0,0,1,57.28,45.03Z"></path>{" "}
              <path d="M55.42,20.28l-2.14-2.73.49-3.43a1.016,1.016,0,0,0-.62-1.07l-3.21-1.28L48.65,8.55a1.009,1.009,0,0,0-1.07-.62l-3.43.49L41.43,6.29a.992.992,0,0,0-1.24,0L37.47,8.42l-3.43-.49a1.009,1.009,0,0,0-1.07.62l-1.29,3.22-3.21,1.28a1.016,1.016,0,0,0-.62,1.07l.49,3.43L26.2,20.28a1.006,1.006,0,0,0,0,1.23l2.14,2.73-.49,3.42a.99.99,0,0,0,.62,1.07l3.21,1.29,1.29,3.21a1,1,0,0,0,1.07.62l3.43-.49,2.72,2.14a1.009,1.009,0,0,0,.62.21,1.031,1.031,0,0,0,.62-.21l2.72-2.14,3.43.49a1,1,0,0,0,1.07-.61l1.29-3.22,3.21-1.29a1,1,0,0,0,.62-1.07l-.49-3.42,2.14-2.73A1.006,1.006,0,0,0,55.42,20.28Zm-3.98,3.06a.984.984,0,0,0-.2.76l.44,3.07-2.89,1.15a.978.978,0,0,0-.55.56l-1.16,2.88-3.07-.44a1,1,0,0,0-.76.21l-2.44,1.91-2.44-1.91a1.02,1.02,0,0,0-.62-.22c-.05,0-.1.01-.14.01l-3.08.44-1.15-2.88a1,1,0,0,0-.56-.56l-2.88-1.15.44-3.07a1.026,1.026,0,0,0-.2-.76l-1.92-2.45,1.92-2.44a1.026,1.026,0,0,0,.2-.76l-.44-3.07,2.88-1.16a.978.978,0,0,0,.56-.55l1.15-2.88,3.08.43a.994.994,0,0,0,.76-.2l2.44-1.92,2.44,1.92a.994.994,0,0,0,.76.2l3.07-.43,1.16,2.88a.99.99,0,0,0,.55.55l2.89,1.16-.44,3.07a.984.984,0,0,0,.2.76l1.92,2.44Z"></path>{" "}
              <path d="M35.81,14.39a3,3,0,1,0,3,3A3,3,0,0,0,35.81,14.39Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,35.81,18.39Z"></path>{" "}
              <path d="M45.81,21.39a3,3,0,1,0,3,3A3,3,0,0,0,45.81,21.39Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,45.81,25.39Z"></path>{" "}
              <path d="M35.065,26.062a1,1,0,0,0,1.413.075l10-9A1,1,0,0,0,45.14,15.65l-10,9A1,1,0,0,0,35.065,26.062Z"></path>{" "}
            </g>{" "}
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
  const getCart = async () => {
    const res = await getCartContext();
    //console.log(res)
    return res;
  };
  const { data, isLoading } = useQuery("Cart", getCart);
  if (isLoading) {
    return "";
  }
  console.log(data);
  data?.products.map((product)=>{
    total = total + (product.details.finalPrice * product.quantity)
  })

  return (
    <div className="pb-5">
      <h1 className=" mt-5 text-center m-auto basicFontFamily">
        {" "}
        Make The Order{" "}
      </h1>
      <div className="row  container m-auto">
      <div className=" col-md-6 mt-5 ">
          <table className="table ">
            <thead>
              <tr>
                <th>product</th>
                <th>Quantity</th>
                <th>FinalPrice</th>
              </tr>
            </thead>

            <tbody>
              {data?.products.length ? ( //اقواس بدون ريترن  ما بزبط {}
                data.products.map((product, index) => (
                  <tr key={index}>
                    <td>
                    <img src={product.details?.mainImage?.secure_url} alt="" className="d-block rounded" />

                      <span className="">{product.details.name}</span>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.details.finalPrice} $</td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 mt-5 pt-5">
          <form
            onSubmit={formik.handleSubmit}
           className=" border border-2 p-5 m-auto  rounded shadow"
          >
            {renderInputs}
            <div className="my-2">
            Total : <b>{total}$</b>
            </div>
            
            <button
              type="submit"
              disabled={!formik.isValid}
              className="d-flex m-auto px-5 basicBgColor border-0 rounded py-1 bold"
            >
              order
            </button>
          </form>
        </div>

     
      </div>
    </div>
  );
}

export default Order;
