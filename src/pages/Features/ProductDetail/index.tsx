import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
	BreadCrumb,
	Product_List,
	Contact,
	Comment,
} from "../../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tabs/style/react-tabs.css";
import {
	useParams
} from "react-router-dom";
import axios from "axios";
import { QueryAPI } from "../../../access";
import { ProductModel } from "../../../model";
import './style.scss'
import { Rate } from 'antd';
import { RenderStarComponent } from "../../../components"
import { CommentModel } from "../../../model/comment";

export default function ProductDetail() {
	const { product_id } = useParams<any>();
	const [product, setProduct] = useState<ProductModel>();
	const [commentList, setCommentList] = useState<CommentModel>();


	useEffect(() => {
		axios.get(QueryAPI.product.single(product_id))
			.then(res => {
				setProduct(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product_id])

	useEffect(() => {
		axios.get(QueryAPI.comment.all(product_id))
			.then(res => {
				console.log(res.data);
				setCommentList(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product_id])

	let priceFormater = Number(product?.product_price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
	var settings = {
		customPaging: function (i: any) {
			return (
				<a href="/">
					<img
						src={require(`../../../assets/images/abstract0${i + 1}.jpg`)}
						alt="slide-img"
					/>
				</a>
			);
		},
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<section className="product-detail-section">
			<BreadCrumb />
			<div className="product-detail">
				<div className="container">
					<div className="row">
						<div className="col-6 image-wrap">
							<div className="image-product" style={{
								backgroundImage: `url(${product?.product_image})`,
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: 'contain'
							}} />
						</div>
						<div className="col-6">
							<p className="product-stock">{product?.product_quanlity} In stock</p>
							<h3 className="product-name">{product?.product_name}</h3>
							<div>
								<div className="rating" style={{ display: "flex" }}>
									<RenderStarComponent numberStar={Math.floor(Number(commentList?.averageRating) / 2)} />
									<a href="#reviews" style={{ color: "#40a9ff", marginLeft: "5px" }}>{commentList?.customerRating} customers reviews</a >
								</div>
							</div>
							<p className="product-price">{`${priceFormater}`}</p>
							{/* <p className="product-desc">
								{product?.product_description}
							</p> */}
							<hr className="sprate-block" />
							<div className="product-buy">
								<div className="product-quanlity">
									<button className="btn btn-quanlity-dec">-</button>
									<input
										type="text"
										name=""
										id=""
										placeholder="1"
										className="input-quanlity"
									/>
									<button className="btn btn-quanlity-inc">+</button>
								</div>
								<button className="btn btn-add-cart">
									Add to cart
									<i className="fa-solid fa-cart-plus btn-cart-icon"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="product-describe">
						<Tabs>
							<TabList>
								<Tab>Description</Tab>
								{/* <Tab>Additional information</Tab> */}
							</TabList>

							<TabPanel className="tab-content">
								<p dangerouslySetInnerHTML={{ __html: product?.product_description ?? '' }}>
									{/* {product?.product_description} */}
								</p>
							</TabPanel>
							<TabPanel className="tab-content">
								<div className="product-colors">
									<p className="product-color-title">Color</p>
									<div>
										<a href="#">Black</a>
										<a href="#">Blue</a>
										<a href="#">Pink</a>
										<a href="#">Yellow</a>
									</div>
								</div>
							</TabPanel>
						</Tabs>
					</div>
					<div className="comment-container" id="reviews">
						<Comment />
					</div>
					<div className="product_viewed">
						<Product_List recommend title="Recommend" />
					</div>
					<Contact />
				</div>
			</div>
		</section>
	);
}
