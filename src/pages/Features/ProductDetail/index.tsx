import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import {
	BreadCrumb,
	ProductList,
	Contact,
	Comment,
	notificationSuccess,
} from "../../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tabs/style/react-tabs.css";
import {
	useParams
} from "react-router-dom";
import axios, { Axios } from "axios";
import { Command, QueryAPI } from "../../../access";
import { ProductModel, ShopModel } from "../../../model";
import './style.scss'
import ReactQuill from 'react-quill';
import { Rate } from 'antd';
import { RenderStarComponent } from "../../../components"
import { CommentModel } from "../../../model/comment";
import { UserModel } from "../../../model/user";

export default function ProductDetail({ updateTotalCart }: { updateTotalCart: () => void }) {
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);
	const { product_id } = useParams<any>();
	const [product, setProduct] = useState<ProductModel>();
	const [shop, setShop] = useState<ShopModel>();
	const [commentList, setCommentList] = useState<CommentModel>();

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

	useEffect(() => {
		axios.get(QueryAPI.comment.all(product_id))
			.then(res => {
				setCommentList(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product_id])

	useEffect(() => {
		if (!product) return
		axios.get(QueryAPI.shop.signleWithshopId(product?.id_shop))
			.then(res => {
				setShop(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [product])

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
					notificationSuccess({ description: 'You have successfully added the product to your cart' });
					updateTotalCart()
					setQuanlity(1);
				}
			}, (error) => {
				alert(error)
			});
	}

	return (
		<section className="product-detail-section">
			{shop && <BreadCrumb shop={shop} />}
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
									<RenderStarComponent numberStar={Number(commentList?.averageRating) / 2} />
									<a href="#reviews" style={{ color: "#40a9ff", marginLeft: "5px" }}>{commentList?.customerRating} customers reviews</a >
								</div>
							</div>
							<p className="product-price">{`${product?.product_price}$`}</p>
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
						<Tabs
							defaultActiveKey="1"
							items={[
								{
									label: `Description`,
									key: '1',
									// children: <><div className="desc" dangerouslySetInnerHTML={{ __html: `${product?.product_description.toString()}` }}></div></>,
									children: <ReactQuill
										value={product?.product_description}
										readOnly={true}
										className="desc"
										theme={"bubble"}
									/>,
								}
							]}
						/>
					</div>
					<div className="comment-container" id="reviews">
						<Comment />
					</div>
					<div className="product_viewed">
						<ProductList recommend title="Recommend" />
					</div>
					<Contact />
				</div>
			</div>
		</section>
	);
}
