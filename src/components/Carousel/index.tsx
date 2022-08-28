import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import carouel_img_1 from "../../assets/images/venam-blog-1.jpg";
import carouel_img_2 from "../../assets/images/venam-blog-2.jpg";
import carouel_img_3 from "../../assets/images/venam-blog-3.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

function Carousel() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      className="carousel-wrap"
    >
      <SwiperSlide>
        <img src={carouel_img_1} />
      </SwiperSlide>
      <SwiperSlide><img src={carouel_img_2} /></SwiperSlide>
      <SwiperSlide><img src={carouel_img_3} /></SwiperSlide>
    </Swiper>
  )
}

export default Carousel