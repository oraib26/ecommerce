import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './categories.css'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import Loading from '../../loading/Loading.jsx'

function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
    return data;
  }
  //const query = useQuery('web_caregories',getCategories);
  //console.log()//بنعمل هيك بطريقة الفيت مش العادية
  // const [categories,setCategories]=useState([]);
  // const [isLoading,setIsLoading]=useState(true);


  // const getCategories = async ()=>{


  // try{
  //   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
  //   setCategories(data.categories);

  // }catch(error){
  //   console.log(error);

  // }finally{
  //   setIsLoading(false);


  // } }
  // useEffect(()=>{
  //   getCategories();
  // },[])
  // if(isLoading){
  //   return <h2>loading ...</h2>
  // }
  // const x= useContext(CartContext);
  // console.log(x);

  const { data, isLoading } = useQuery('web_categories', getCategories);//بتعمل كاشينغ للمتغيرات وبتخزنها بالكاش ميموري بالمتصفح بحيث لو طلبتها  مرة ثانية  بكون اسرع الحصول عليها افضل من الطريقة العادية  
  // عبارة عن سيرفر تيت وبتعمل فيتش , بحيث لو صار تعديل عالبيانات المعروضة عندي رح يجيبها ويعرضلي ياها وفيها از لودينغ
  //console.log(data?.categories)
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="categories">
       <div className='container '>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={6.5}
        navigation
        loop={true}
        pagination={{
          clickable: true,
          el: '.swiper-custom-pgination'
        }}
        // scrollbar={{ draggable: true }}
        autoplay={{ delay: 2000 }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >



        {data?.categories.length ? data?.categories.map((category) =>

          <SwiperSlide key={category._id}>
            <Link to={`/products/category/${category._id}`}>
              <div className="category">
                <img src={category.image.secure_url} className='rounded-circle' />
                <h2 className='fs-6 category-name text-center '>{category.name}</h2>
              </div>
            </Link>
          </SwiperSlide>

        ) : <h2>no category found</h2>}
      <div className="swiper-custom-pgination text-center mt-4"></div>

      </Swiper>

    </div>
    </div>

   
  )
}

export default Categories