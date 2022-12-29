import React from "react";
import { ShopModel } from "../../model"

export default function BreadCrumb({ shop, hideButton }: { shop?: ShopModel, hideButton?: boolean }) {
	console.log("🚀 ~ file: index.tsx:5 ~ BreadCrumb ~ shop", shop)
	return (
		<section className="breadcrumb-section">
			<div className="breadcrumb-wrap"
				style={{
					backgroundImage: `url(${shop?.shop_avatar})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			>
				<div className="fake-wrap"></div>
				<h1 className="breadcrumb-heading">{shop?.shop_name}</h1>
				{!hideButton ? <ul className="breadcumb-list">
					<li className="breadcrumb-item">
						<a href={`/view-shop/${shop?.id}`} className="breadcrumb-link">
							View Shop
						</a>
					</li>
				</ul> :
				<div className="information">
					<div>{shop?.totalProduct} Products</div>
					-
					<div>{shop?.totalRating} Ratings</div>
				</div> }
			</div>
		</section>
	);
}
