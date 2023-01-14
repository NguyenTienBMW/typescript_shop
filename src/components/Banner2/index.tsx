import React, { useEffect, useRef, useState } from "react";
import BannerItem from "../BannerItem";
import ProductList from "../Product";
import { Button, Col, Divider, Row } from 'antd';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import Banner2_1 from "../../assets/images/banner2.jpg";
import ProductItem from "../ProductItem";
import axios from "axios";
import { QueryAPI } from "../../access";
import { ProductModel } from "../../model";
import { useHistory } from "react-router-dom";

export const Banner2 = ({ idCategory, title, image = Banner2_1 }: { idCategory: string, title: string, image?: string }) => {
	const [productList, setProductList] = useState<ProductModel[]>([]);
	const history = useHistory()
	useEffect(() => {
		axios
			.get(QueryAPI.product.productCategory(idCategory))
			.then(res => {
				setProductList(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	return (
		<section className="banner2">
			{/* <div className="banner2-wrap"> */}
			<Row gutter={16}>
				<Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
					<div className="banner-left" style={{ height: '500px' }}>
						<img src={image} className="banner2-img" />
					</div>
				</Col>
				<Col xs={24} sm={12} md={12} lg={18} className="gutter-row">
					<div className="banner-right">
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<h3 className="banner-heading" style={{ marginBottom: '10px', marginTop: '10px' }}>{title}</h3>
							<Button onClick={() => history.push(`product-category/${idCategory}`)}>View all</Button>
						</div>
						<Swiper
							spaceBetween={20}
							slidesPerGroup={5}
							loopFillGroupWithBlank={true}
							autoplay={{
								delay: 2000,
								disableOnInteraction: false,
							}}
							modules={[Autoplay]}
							breakpoints={{

								640: {
									slidesPerView: 1,
									spaceBetween: 20,
								},
								768: {
									slidesPerView: 2,
									spaceBetween: 40,
								},
								1024: {
									slidesPerView: 4,
									spaceBetween: 50,
								},
							}}
						>
							{productList.map(product => {
								return (
									<SwiperSlide className="swiper-item" key={product.id}>
										<ProductItem data={product} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</Col>
			</Row>
			{/* </div> */}
		</section>
	);
}
