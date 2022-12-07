import React from "react";
import BannerItem from "../BannerItem";

export default function BannerFooter() {
	return (
		<section className="banner-section">
			<div className="container">
				<div className="row">
					<div className="col-6">
						<BannerItem />
					</div>
					<div className="col-6">
						<BannerItem />
					</div>
				</div>
			</div>
		</section>
	);
}
