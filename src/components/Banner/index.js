import React from "react";
// import Banner31 from "../../assets/images/banner-31.jpg";
// import Banner32 from "../../assets/images/banner-32.jpg";
// import Banner33 from "../../assets/images/banner-33.jpg";
import BannerItem from "../BannerItem";

export default function Banner() {
	return (
		<section className="banner-section">
			<div class="container">
				<div class="row">
					<div class="col-4">
						<BannerItem />
						{/* <div
							class="banner-content"
							style={{ backgroundImage: `url(${Banner31})` }}
						>
							<div class="banner-title">
								<div class="banner-cate">Smart Phone</div>
								<div class="banner-subtitle">Samsung note 21</div>
							</div>
							<div class="banner-price">
								<div class="banner-discount-badge">Discounted Price</div>
								<div class="banner-price-wrap">
									<div class="banner-price-new">390</div>
									<div class="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
					<div class="col-4">
						<BannerItem />
						{/* <div
							class="banner-content"
							style={{ backgroundImage: `url(${Banner32})` }}
						>
							<div class="banner-title">
								<div class="banner-cate">Smart Phone</div>
								<div class="banner-subtitle">Samsung note 21</div>
							</div>
							<div class="banner-price">
								<div class="banner-discount-badge">Discounted Price</div>
								<div class="banner-price-wrap">
									<div class="banner-price-new">390</div>
									<div class="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
					<div class="col-4">
						<BannerItem />
						{/* <div
							class="banner-content"
							style={{ backgroundImage: `url(${Banner33})` }}
						>
							<div class="banner-title">
								<div class="banner-cate">Smart Phone</div>
								<div class="banner-subtitle">Samsung note 21</div>
							</div>
							<div class="banner-price">
								<div class="banner-discount-badge">Discounted Price</div>
								<div class="banner-price-wrap">
									<div class="banner-price-new">390</div>
									<div class="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				{/* <ul class="banner-list">
          <li class="banner-item">
            <div class="banner-title">
              <div class="banner-cate">Smart Phone</div>
              <div class="banner-subtitle">Samsung note 21</div>
            </div>
            <div class="banner-price">
              <div class="banner-discount-badge">Discounted Price</div>
              <div class="banner-price-wrap">
                <div class="banner-price-new">390</div>
                <div class="banner-price-old">450</div>
              </div>
            </div>
          </li>
          <li class="banner-item">
            <div class="banner-title">
              <div class="banner-cate">Smart Phone</div>
              <div class="banner-subtitle">Samsung note 21</div>
            </div>
            <div class="banner-price">
              <div class="banner-discount-badge">Discounted Price</div>
              <div class="banner-price-wrap">
                <div class="banner-price-new">390</div>
                <div class="banner-price-old">450</div>
              </div>
            </div>
          </li>
          <li class="banner-item">
            <div class="banner-title">
              <div class="banner-cate">Smart Phone</div>
              <div class="banner-subtitle">Samsung note 21</div>
            </div>
            <div class="banner-price">
              <div class="banner-discount-badge">Discounted Price</div>
              <div class="banner-price-wrap">
                <div class="banner-price-new">390</div>
                <div class="banner-price-old">450</div>
              </div>
            </div>
          </li>
        </ul>  */}
			</div>
		</section>
	);
}
