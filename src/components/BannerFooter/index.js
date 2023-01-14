import React from "react";
import Banner_1 from "../../assets/images/banner-1.jpg";
import Banner_2 from "../../assets/images/banner-2.jpg";
import BannerItem from "../BannerItem";
const bannerValue = [
	{
		title: "%15 DISCOUNT",
		heading: "Smart Telephones",
		img: Banner_2
	},
	{
		title: "%10 DISCOUNT",
		heading: "Smart Televisions",
		img: Banner_1
	}
]
export default function BannerFooter() {
	return (
		<section className="banner-section">
			<div className="container">
				<div className="row">
					{bannerValue.map((item) => {
						return <div className="col-6">
							<BannerItem Img={item.img} title={item.title} heading={item.heading} />
						</div>
					})}
				</div>
			</div>
		</section>
	);
}
