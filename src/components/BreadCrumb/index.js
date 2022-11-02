import React from "react";

export default function BreadCrumb() {
	return (
		<section className="breadcrumb-section">
			<div className="breadcrumb-wrap">
				<h1 className="breadcrumb-heading">shop</h1>
				<ul className="breadcumb-list">
					<li className="breadcrumb-item">
						<a href="/" className="breadcrumb-link">
							Home
						</a>
					</li>
					<li className="breadcrumb-item">
						<a href="" className="breadcrumb-link">
							Products
						</a>
					</li>
					<li className="breadcrumb-item">
						<a href="" className="breadcrumb-link">
							High-Speed HDMI
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
