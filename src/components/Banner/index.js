import React from "react";
import Banner31 from "../../assets/images/banner-31.jpg";
import Banner32 from "../../assets/images/banner-32.jpg";
import Banner33 from "../../assets/images/banner-33.jpg";
import BannerItem from "../BannerItem";
import { Col, Divider, Row } from 'antd';
export default function Banner() {
	const bannerValue = [
		{
			title: "SMART PHONE",
			heading: "Samsung Note 21",
			img: Banner32
		},
		{
			title: "POWER BANK",
			heading: "New Power Double",
			img: Banner33
		},
		{
			title: "SMART PHONE",
			heading: "Samsung Note 21",
			img: Banner31
		},
	]
	return (
		<section className="banner-section">
			<div className="container">
				<Row gutter={[16, 16]}>
					{bannerValue.map((item) => {
						return <Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
							<BannerItem Img={item.img} title={item.title} heading={item.heading} />
						</Col>
					})}
					{/* <Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
						<BannerItem Img={Banner33} title="POWER BANK" heading="New Power Double" />
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} className="gutter-row">
						<BannerItem Img={Banner31} title="HEADPHONE" heading="Harman Cardon"/>
					</Col> */}
				</Row>
			</div>
		</section>
	);
}
