import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import UserContextProvider from './components/web/context/User.jsx';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                {/* الكونتيكس عبارة عن تعريف ملف واخلي كل الملفات يشوفوه بدل ما ابعثه من الاب للبن والعكس , اما بالنسبة للبروفايدر يعني يزود هالملف لكل الملفات  */}
                <ToastContainer />
                <App />

            </QueryClientProvider>
        </UserContextProvider>
    </>

)  
