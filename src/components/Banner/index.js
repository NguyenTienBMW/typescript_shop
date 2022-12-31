import React from "react";
// import Banner31 from "../../assets/images/banner-31.jpg";
// import Banner32 from "../../assets/images/banner-32.jpg";
// import Banner33 from "../../assets/images/banner-33.jpg";
import BannerItem from "../BannerItem";
import { Col, Divider, Row } from 'antd';
export default function Banner() {
	return (
		<section className="banner-section">
			<div className="container">
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
						<BannerItem />
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
						<BannerItem />
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
						<BannerItem />
					</Col>
				</Row>
			</div>
		</section>
	);
}
