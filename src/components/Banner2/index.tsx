import React, { useEffect, useRef, useState } from "react";
import BannerItem from "../BannerItem";
import Product_List from "../Product";

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
import Banner2_1 from "../../assets/images/banner2.jpg";
import ProductItem from "../ProductItem";
import axios from "axios";
import { QueryAPI } from "../../access";
import { ProductModel } from "../../model";

export const Banner2 = () => {
	const [productList, setProductList] = useState<ProductModel[]>([]);
	useEffect(() => {
		axios
			.get(QueryAPI.product.all())
			.then(res => {
				setProductList(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	return (
		<section className="banner2">
			<div className="banner2-wrap">
				<div className="banner-left">
					<img src={Banner2_1} />
				</div>
				<div className="banner-right">
					<h3 className="banner-heading">All Product</h3>
					<Swiper
						slidesPerView={3}
						spaceBetween={20}
						slidesPerGroup={5}
						loopFillGroupWithBlank={true}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
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
						{productList.map(product => {
							return (
								<SwiperSlide className="swiper-item" key={product.id}>
									<ProductItem data={product} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
