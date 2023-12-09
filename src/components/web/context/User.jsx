import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);


    const getUserData =async()=>{
        if(userToken){
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            { headers: { Authorization: `Tariq__${userToken}` } })
            setUserData(data.user);
           // console.log(data.user)

        }
    }
   // console.log(userData)
    useEffect(()=>{
        getUserData();
    },[userToken])

      
    return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,getUserData}}> {/*هون سمحت لليوزر توكين يطلع برا ول السيت يوزر تطلع برا ( يعني بصير اطلع فاريبل او فنكشن )  */}
        {children}
    </UserContext.Provider>

}