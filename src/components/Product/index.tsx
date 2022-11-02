import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { QueryAPI } from "../../access";
import {ProductModel} from '../../model'

export default function Product_List() {
	const [productList, setProductList] = useState<ProductModel[]>([])

	useEffect(() => {
		axios.get(QueryAPI.product.all())
		.then(res => {
			setProductList(res.data)
		}) 
		.catch(err => {
			console.log(err)
		})
	}, [])

	return (
		<section className="product-section">
			<h2 className="product-heading">Products Of The Week</h2>
			<Swiper
				slidesPerView={5}
				spaceBetween={20}
				slidesPerGroup={3}
				loopFillGroupWithBlank={true}
				// autoplay={{
				// 	delay: 2500,
				// 	disableOnInteraction: false,
				// }}
				// pagination={{
				// 	clickable: true,
				// }}
				// navigation={true}
				// modules={[Pagination, Navigation]}
				modules={[Autoplay]}
			>
				{productList.map((product) => {
					return <SwiperSlide className="swiper-item">
						<ProductItem 
							data={product}
						/>
					</SwiperSlide>
				})}
			</Swiper>
		</section>
	);
}
