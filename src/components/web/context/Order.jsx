import axios from "axios";
import { createContext } from "react";


export const OrderContext = createContext(null);

export function OrderContextProvider({ children }) {

    const createOrderContext = async (address, phone, couponName ) => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
                {address },
                { phone},
                { couponName} ,
                { headers: { Authorization: `Tariq__${token}` } }
            )
            if (data.message == "success") {
                toast.success('Sended order succesfully, cheak your orders plz', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })}
            return data;

        } catch (error) {
            console.log(error)
        }


    }
    const getOrderContext = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
                
                { headers: { Authorization: `Tariq__${token}` } }
            )
            console.log(data)
            return data;

        } catch (error) {
            console.log(error)
        }


    }





return <OrderContext.Provider value={{ createOrderContext, getOrderContext }}>
    {children}
</OrderContext.Provider>

    }