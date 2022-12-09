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
	notificationSuccess,
} from "../../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tabs/style/react-tabs.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from "react-router-dom";
import axios, { Axios } from "axios";
import { Command, QueryAPI } from "../../../access";
import { ProductModel } from "../../../model";
import './style.scss'
import { UserModel } from "../../../model/user";

export default function ProductDetail() {
	const user: any = localStorage.getItem('user');
    const userInfo: UserModel = JSON.parse(user);
	const { product_id } = useParams<any>();
	const [product, setProduct] = useState<ProductModel>();
	const [quanlity, setQuanlity] = useState(1);

	useEffect(() => {
		axios.get(QueryAPI.product.single(product_id))
			.then(res => {
				setProduct(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product_id])

	const handleQuanlityIncrease = () => {
		if (quanlity === Number(product?.product_quanlity)) return;
		setQuanlity(prev => prev + 1)
	}

	const handleQuanlityReduced = () => {
		if (quanlity <= 1) return;
		setQuanlity(prev => prev - 1)
	}

	const onChangeQuanlity = (e: any) => {
		let result = e.target.value.replace(/\D/g, '');
		console.log(result)
		if (result === 0 || !result) {
			result = 1
		} else if (result[0] === 0) {
			result = result.slice(1, result.length)
		}
		setQuanlity(Number(result))

	}

	const handleAddCart = () => {
		axios({
			method: 'post',
			url: Command.cart.add(),
			data: {
				userId: userInfo.id,
				productId: product_id,
				quanlity: quanlity,
			}
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				notificationSuccess({ description: 'Bạn đã thêm sản phẩm vào giỏ hàng thành công' });
				setQuanlity(1);
			}
		}, (error) => {
			alert(error)
		});
	}

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
							<p className="product-price">${product?.product_price}</p>
							{/* <p className="product-desc">
								{product?.product_description}
							</p> */}
							<hr className="sprate-block" />
							<div className="product-buy">
								<div className="product-quanlity">
									<button className="btn btn-quanlity-dec" onClick={handleQuanlityReduced}>-</button>
									<input
										type="text"
										value={quanlity}
										className="input-quanlity"
										onChange={onChangeQuanlity}
									/>
									<button className="btn btn-quanlity-inc" onClick={handleQuanlityIncrease}>+</button>
								</div>
								<button className="btn btn-add-cart" onClick={handleAddCart}>
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
					<div className="comment-container">
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
