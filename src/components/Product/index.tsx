import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import ProductItem from "../ProductItem";
import axios from "axios";
import { QueryAPI } from "../../access";
import { ProductModel } from '../../model'
import { UserModel } from "../../model/user";
import { Spin, Skeleton } from 'antd';
import './style.scss';

export default function ProductList({
	recommend,
	title,
	url = QueryAPI.product.all()
}: {
	recommend?: boolean,
	title?: string,
	url?: string
}) {
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);

	const [productList, setProductList] = useState<ProductModel[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		axios.get(recommend ? QueryAPI.product.recommend(userInfo.id) : url)
			.then(res => {
				setLoading(false)
				setProductList(res.data)
			})
			.catch(err => {
				setLoading(false)
				console.log(err)
			})
	}, [])

	return (
		<section className="product-section">
			<h2 className="product-heading">{title || 'Products Of The Week'}</h2>
			<Swiper
				spaceBetween={20}
				slidesPerGroup={3}
				loopFillGroupWithBlank={true}
				modules={[Autoplay]}
				breakpoints={{

					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 50,
					},
				}}

			>
				{loading
					? <div className="card-loading">
						{Array(5).fill(0).map((index, item) => {
							return <SwiperSlide className="swiper-item" key={item}>
								<Skeleton.Button active style={{ height: '400px', width: '100%' }} />
							</SwiperSlide>
						})}
					</div>
					: productList.map((product) => {
						return <SwiperSlide className="swiper-item" key={product.id}>
							<ProductItem
								data={product}
								key={product.id}
							/>
						</SwiperSlide>
					})}

			</Swiper>
		</section>
	);
}
