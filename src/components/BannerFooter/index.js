import React from "react";
import BannerItem from "../BannerItem";

export default function BannerFooter() {
	return (
		<section className="banner-section">
			<div class="container">
				<div class="row">
					<div class="col-6">
						<BannerItem />
					</div>
					<div class="col-6">
						<BannerItem />
					</div>
				</div>
			</div>
		</section>
	);
}
