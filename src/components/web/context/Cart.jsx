import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null); //بدنا نخلي الكومبوناتس يمر من خلال هاد البروفايدور
export function CartContextProvider({ children }) {
    //هون زي كأنه بنعمل حقن للبروفايدر لكل ابناءة 
    // let [count, setCount] = useState(0);
    // let [name, setName] = useState("oraib");
    //اي ابن كوبوننت صار عند متغير اسمه كاونت و نيم
    //let [count,setCount]=useState(0);



    const addToCartContext = async (productId) => {
        //دائما الكود الي بيجي من الباك ايند لازم احطه ب (تراي وكاتش) عشان لو صار ايرور تعرفي تمسكيه
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } })//كتبنا طارق بالبداية عشان نتاكد انك انت الفرونت ايند الي باعث الدتا هاي(زيادة تاكييد)
            //Tariq__ >> is perar token//
            if (data.message == "success") {
                toast.success('product Added succesfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            console.log(data)

            return data;
        }
        catch (error) {
            console.log(error)
        }


    }

    const getCartContext = async () => {

        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
                { headers: { Authorization: `Tariq__${token}` } })
            //   console.log(data.count)
            return data;

        } catch (error) {
            console.log(error);

        }
    }

    const removeItemContext = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            return data;

        } catch (error) {
            console.log(error);

        }

    }
    const clearCartContext = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
                {},//body that is  reqered from the Backend End developer (null or {})
                { headers: { Authorization: `Tariq__${token}` } })
            console.log(data)
            return data;

        } catch (error) {
            console.log(error);

        }

    }
    const decreaseQuantityContext = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } })
                console.log(data)
            return data;

        } catch (error) {
            console.log(error);

        }

    }
    const increaseQuantityContext = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
                { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            return data;

        } catch (error) {
            console.log(error);

        }

    }


    return <CartContext.Provider value={{ addToCartContext, getCartContext, removeItemContext, clearCartContext, decreaseQuantityContext, increaseQuantityContext }}>
        {children}
    </CartContext.Provider>




}
//ثاني خطوة ننحدد الكومبونتس الي بدنا ياهم يشوفو هالبروفايدور