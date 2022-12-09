import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oppo from "../../assets/images/oppo.jpg";
import Smartphone from "../../assets/images/smartphone.jpg";
import { ProductModel } from "../../model";
import './style.scss';

type ProductItemProps = {
	data?: ProductModel
}

export default function ProductItem({ data }: ProductItemProps) {
	// let dataPrice = data?.product_price;
	let priceFormater = Number(data?.product_price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

	return (
		<>
			<div className="product">
				<div className="product-img-wrap">
					<img
						src={data?.product_image}
						alt="arrow"
						className="product-img"
					/>
				</div>

				<div className="product-info">
					<div className="product-star">
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
					</div>
					<div className="product-title">
						<Link to={`/product-detail/${data?.id}`} className="product-link">
							{data?.product_name}
						</Link>
					</div>
					<div className="product-price">
						{/* <div className="product-price-old">$15.00</div> */}
						<div className="product-price-new">{`${priceFormater}`}</div>
					</div>
				</div>
				<ul className="product-badge">
					<li className="product-badge-item">Sale!</li>
					<li className="product-badge-item product-discount">20%</li>
					<li className="product-badge-item">Oppo</li>
				</ul>
			</div>
		</>
	);
}
