import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import HeadPhone from "../../assets/images/headphone.jpg";
import SmartPhone from "../../assets/images/smartphone.jpg";
import Camera from "../../assets/images/camera.jpg";
import Oppo from "../../assets/images/oppo.jpg";
import Mayxoay from "../../assets/images/mayxoay.jpg";
import ProductItem from "../ProductItem";

export default function Product_List() {
	return (
		<section className="product-section">
			<h2 className="product-heading">Products Of The Week</h2>
			<Swiper
				slidesPerView={5}
				spaceBetween={20}
				slidesPerGroup={3}
				loopFillGroupWithBlank={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				// pagination={{
				// 	clickable: true,
				// }}
				// navigation={true}
				// modules={[Pagination, Navigation]}
				modules={[Autoplay]}
			>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
				<SwiperSlide className="swiper-item">
					<ProductItem />
				</SwiperSlide>
			</Swiper>
		</section>
	);
}
