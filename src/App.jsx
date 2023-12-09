import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./components/web/register/Register.jsx";
import Login from "./components/web/login/Login.jsx";
import Home from "./components/web/home/Home.jsx";
import Categories from "./components/web/categories/Categories.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import HomeDashboard from "./components/dashboard/home/HomeDashboard.jsx";
import CategoriesDashboard from "./components/dashboard/categories/CategoriesDashboard.jsx";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import CategoriesDetails from "./components/web/categories/CategoriesDetails.jsx";
import Product from "./components/web/products/Product.jsx";
import { CartContext, CartContextProvider } from "./components/web/context/Cart.jsx";
import Cart from "./components/web/cart/Cart.jsx";
import ForgotPassword from "./components/web/login/ForgotPassword.jsx";
import SendCode from "./components/web/login/SendCode.jsx";
import UserContextProvider from "./components/web/context/User.jsx";
import UserDetails from "./components/web/User/UserDetails.jsx";
import ProtectedRoute from "./components/web/protectedRoute/ProtectedRoute.jsx";




function App() {
  const [user, setUser] = useState(null);

  const saveCurrentUser = () => {//بعدل بيانات اليوزر
    const token = localStorage.getItem("userToken");//البيانات لازم تتشفر
    const decoded = jwtDecode(token);//شفرنا البيانات عن طريق مكتبة اسمها جي دبليو تي  ديكود
    setUser(decoded)//حطينا نتيجة التشفير ببيانات اليوزر

  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveCurrentUser();//اول م احمل الصفحة اعمل حفظ لليوزر مباشرة
    }
  }, [])

  const router = createBrowserRouter([// هاد المتغير عبارة عن ارريه اوف اوبجيكت router
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} />,//ادارة البيانات : انه ابعث داتا عن طريق الابن للاب بس هاي الطريقة مشمنطقية , اعمل مكان استدعي فيه البيانات سواء بالابن بالاب
      children: [                                               //state management^
        {
          path: 'register',
          element: <Register />

        },
        {
          path: 'login',
          element: <Login saveCurrentUser={saveCurrentUser} />//لما اليوزر يعمل لوغ إن منحفظه باللوكل ستوريج عشان نعرف حالته 

        },
        // هون ابناء اللي اوت عبارة عن ارريه اوف اوبجيكت , ابناء يعني الي اوت هاي ع مين بتقدر تعمل اكسسيز لانه زي ما حكينا انه لكل لي اوت اكسيز بتختلف عن غيرها (وحدة لليوزر ووحدة للأدمن)
        {
          //:) ما بنقدر نوصل للتشيلدرين هذول عن طريق السلاش , طيب كيف ننوصل لالهن ؟ هسه بنعرف اصبري 
          // ف الجواب : بكون عن طريق كومبونينت اسمه اوت ليت موجود ب الرياكت روتر دوم
          path: 'home',
          element: <Home />
        }, {
          path: '',
          element: <Home />
        },
        {
          path: 'categories',
          element: <Categories />
        },
        {
          path: 'products/category/:categoryId',
          element: <CategoriesDetails />

        },
        {
          path: 'products/:productId',
          element: <Product />

        },
        {
          path: 'auth/forgotPassword',
          element: <ForgotPassword />

        },
        {
          path: 'auth/sendcode',
          element: <SendCode />

        },
        {
          path: 'cart',
          element:
          <ProtectedRoute><Cart /></ProtectedRoute> 

        },
        {
          path: 'user/profile',
          element:
          <ProtectedRoute><UserDetails /></ProtectedRoute> 

        },
        {
          path: '*',
          element: <h2>404 page not found --- web</h2>//في حال اليوزر  حط كلمة غلط او مش موجودة بعد هاذ 
        }

      ]
    },

    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'home',
          element: <HomeDashboard />

        },
        {
          path: 'categories',
          element: <CategoriesDashboard />

        },
        {
          path: '*',
          element: <h2>404 page not found --- dashboard</h2>//في حال الادمن  حط كلمة غلط او مش موجودة بعد هاذ او باث  غلط 
        }
      ]


    }

  ]);

  return (
    <UserContextProvider>
    <CartContextProvider> 
      {/* ^خلينا كل الكومبنوتس يشوف هالبروفايدور اول ما يشتغل  */}
      <RouterProvider router={router} />
    </CartContextProvider>
    </UserContextProvider>
    )
}

export default App