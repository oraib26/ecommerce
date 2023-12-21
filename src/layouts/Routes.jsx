import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import Layout from './Layout.jsx';
import Home from '../components/web/home/Home.jsx';
import Categories from '../components/web/categories/Categories.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import CategoriesDashboard from '../components/dashboard/categories/CategoriesDashboard.jsx';
import HomeDashboard from '../components/dashboard/home/HomeDashboard.jsx';
import Register from '../components/web/register/Register.jsx';
import Login from '../components/web/login/Login.jsx';
import CategoriesDetails from '../components/web/categories/CategoriesDetails.jsx';
import Product from '../components/web/products/Product.jsx';
import ForgotPassword from '../components/web/login/ForgotPassword.jsx';
import SendCode from '../components/web/login/SendCode.jsx';
import Cart from '../components/web/cart/Cart.jsx';
import ProtectedRoute from '../components/web/protectedRoute/ProtectedRoute.jsx';
import UserDetails from '../components/web/User/UserDetails.jsx';
import UserInfo from '../components/web/User/UserInfo.jsx';
import UserContact from '../components/web/User/UserContact.jsx';
import Order from '../components/web/order/Order.jsx';
import MyOrders from '../components/web/User/MyOrders.jsx';
import ShowProducts from '../components/web/User/ShowProducts.jsx';
import Products from '../components/web/products/Products.Jsx';
import ProductReviews from '../components/web/products/ProductReviews.jsx';
import AddReview from '../components/web/products/AddReview.jsx';


export const router = createBrowserRouter([// هاد المتغير عبارة عن ارريه اوف اوبجيكت router
  {
    path: "/",
    element: <Layout />,//ادارة البيانات : انه ابعث داتا عن طريق الابن للاب بس هاي الطريقة مشمنطقية , اعمل مكان استدعي فيه البيانات سواء بالابن بالاب
    children: [                                               //state management^
      {
        path: 'register',
        element: <Register />

      },
      {
        path: 'login',
        element: <Login />//لما اليوزر يعمل لوغ إن منحفظه باللوكل ستوريج عشان نعرف حالته 

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
        element: <Product />,
        children: [
          {

            path: 'reviews',
            element: <ProductReviews />,
            children:[
              {
                path: 'addreview',
                element:
                  <ProtectedRoute><AddReview /></ProtectedRoute>
              },
            ]

          }


        ]

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
          <ProtectedRoute><Cart /></ProtectedRoute> //عشان نمنع اليوزر الي مش عامل لوغ ان يفوت عالسلة ونخليه يروح على صفحة اللوغ ان

      },
      {
        path: 'user/profile',
        element:
          <ProtectedRoute><UserDetails /></ProtectedRoute>,
        children: [

          {
            index: true,
            element: <UserInfo />,

          },
          {
            path: 'contact',
            element: <UserContact />,

          },
          {
            path: 'myOrders',
            element: <MyOrders />,
            children: [
              {
                path: ':orderId',
                element: <ShowProducts />
              }
            ]

          }
        ]

      },
      {
        path: 'products',
        element: <Products />


      },
      {
        path: 'order',
        element:
          <ProtectedRoute><Order /></ProtectedRoute>

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