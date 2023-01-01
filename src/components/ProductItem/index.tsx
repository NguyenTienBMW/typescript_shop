import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oppo from "../../assets/images/oppo.jpg";
import Smartphone from "../../assets/images/smartphone.jpg";
import { ProductModel } from "../../model";
import { RenderStarComponent } from "../Rating";
import './style.scss';

type ProductItemProps = {
	data?: ProductModel
}

export default function ProductItem({ data }: ProductItemProps) {

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
						<RenderStarComponent numberStar={Number(data?.avg_rating) / 2} />
					</div>
					<div className="product-title">
						<Link to={`/product-detail/${data?.id}`} className="product-link">
							{data?.product_name}
						</Link>
					</div>
					<div className="product-price">
						{/* <div className="product-price-old">$15.00</div> */}
						<div className="product-price-new">{`${data?.product_price}$`}</div>
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
