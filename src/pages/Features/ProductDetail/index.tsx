import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
	BreadCrumb,
	Header,
	Product_List,
	Contact,
	Footer,
	Comment,
} from "../../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tabs/style/react-tabs.css";
// import images from "../../../core/constants";
import abstract01 from "../../../assets/images/abstract01.jpg";
import abstract02 from "../../../assets/images/abstract02.jpg";
import abstract03 from "../../../assets/images/abstract03.jpg";
import abstract04 from "../../../assets/images/abstract04.jpg";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from "react-router-dom";
import axios from "axios";
import { QueryAPI } from "../../../access";
import { ProductModel } from "../../../model";
import './style.scss'

export default function ProductDetail() {
	const { product_id } = useParams<any>();
	const [product, setProduct] = useState<ProductModel>();

	useEffect(() => {
		axios.get(QueryAPI.product.single(product_id))
			.then(res => {
				setProduct(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product_id])

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
							<p className="product-stock">37 In stock</p>
							<h3 className="product-name">{product?.product_name}</h3>
							<p className="product-price">${product?.product_price}</p>
							<p className="product-desc">
								{product?.product_description}
							</p>
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
								<Tab>Additional information</Tab>
							</TabList>

							<TabPanel className="tab-content">
								<p>
									{product?.product_name}
								</p>

								<p>
									At vero eos et accusamus et iusto odio dignissimos ducimus qui
									blanditiis praesentium voluptatum deleniti atque corrupti quos
									dolores et quas molestias excepturi sint occaecati cupiditate
									non provident, similique sunt in culpa qui officia deserunt
									mollitia animi, id est laborum et dolorum fuga. Et harum
									quidem rerum facilis est et expedita distinctio.
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
					<div className="comment-container">
						<Comment />
					</div>
					<div className="product_viewed">
						<Product_List />
					</div>
					<Contact />
				</div>
			</div>
		</section>
	);
}
