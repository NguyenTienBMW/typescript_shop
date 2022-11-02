import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oppo from "../../assets/images/oppo.jpg";
import Smartphone from "../../assets/images/smartphone.jpg";
import { ProductModel } from "../../model";

type ProductItemProps = {
	data?: ProductModel
}
export default function ProductItem({data}: ProductItemProps) {
	return (
		<>
			<div className="product">
				<div className="product-img-wrap">
					<img
						src={data?.image}
						alt="arrow"
						className="product-img"
					/>
					<div className="product-action">
						<ul className="product-action-list">
							<li className="product-action-item">
								<a href="#" className="product-action-link">
									<i className=" product-icon fa-solid fa-eye">
									</i>
								</a>
							</li>
							<li className="product-action-item">
								<a href="#" className="product-action-link">
									<i className=" product-icon fa-solid fa-heart">
									</i>
								</a>
							</li>
							<li className="product-action-item">
								<a href="#" className="product-action-link">
									<i className=" product-icon fa-solid fa-arrows-rotate">
									</i>
								</a>
							</li>
						</ul>
						<button className="product-view">View Produts</button>
					</div>
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
							{data?.name}
						</Link>
					</div>
					<div className="product-price">
						{/* <div className="product-price-old">$15.00</div> */}
						<div className="product-price-new">{`$${data?.price}`}</div>
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
