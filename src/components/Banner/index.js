import React from "react";
// import Banner31 from "../../assets/images/banner-31.jpg";
// import Banner32 from "../../assets/images/banner-32.jpg";
// import Banner33 from "../../assets/images/banner-33.jpg";
import BannerItem from "../BannerItem";

export default function Banner() {
	return (
		<section className="banner-section">
			<div className="container">
				<div className="row">
					<div className="col-4">
						<BannerItem />
						{/* <div
							className="banner-content"
							style={{ backgroundImage: `url(${Banner31})` }}
						>
							<div className="banner-title">
								<div className="banner-cate">Smart Phone</div>
								<div className="banner-subtitle">Samsung note 21</div>
							</div>
							<div className="banner-price">
								<div className="banner-discount-badge">Discounted Price</div>
								<div className="banner-price-wrap">
									<div className="banner-price-new">390</div>
									<div className="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
					<div className="col-4">
						<BannerItem />
						{/* <div
							className="banner-content"
							style={{ backgroundImage: `url(${Banner32})` }}
						>
							<div className="banner-title">
								<div className="banner-cate">Smart Phone</div>
								<div className="banner-subtitle">Samsung note 21</div>
							</div>
							<div className="banner-price">
								<div className="banner-discount-badge">Discounted Price</div>
								<div className="banner-price-wrap">
									<div className="banner-price-new">390</div>
									<div className="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
					<div className="col-4">
						<BannerItem />
						{/* <div
							className="banner-content"
							style={{ backgroundImage: `url(${Banner33})` }}
						>
							<div className="banner-title">
								<div className="banner-cate">Smart Phone</div>
								<div className="banner-subtitle">Samsung note 21</div>
							</div>
							<div className="banner-price">
								<div className="banner-discount-badge">Discounted Price</div>
								<div className="banner-price-wrap">
									<div className="banner-price-new">390</div>
									<div className="banner-price-old">450</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				{/* <ul className="banner-list">
          <li className="banner-item">
            <div className="banner-title">
              <div className="banner-cate">Smart Phone</div>
              <div className="banner-subtitle">Samsung note 21</div>
            </div>
            <div className="banner-price">
              <div className="banner-discount-badge">Discounted Price</div>
              <div className="banner-price-wrap">
                <div className="banner-price-new">390</div>
                <div className="banner-price-old">450</div>
              </div>
            </div>
          </li>
          <li className="banner-item">
            <div className="banner-title">
              <div className="banner-cate">Smart Phone</div>
              <div className="banner-subtitle">Samsung note 21</div>
            </div>
            <div className="banner-price">
              <div className="banner-discount-badge">Discounted Price</div>
              <div className="banner-price-wrap">
                <div className="banner-price-new">390</div>
                <div className="banner-price-old">450</div>
              </div>
            </div>
          </li>
          <li className="banner-item">
            <div className="banner-title">
              <div className="banner-cate">Smart Phone</div>
              <div className="banner-subtitle">Samsung note 21</div>
            </div>
            <div className="banner-price">
              <div className="banner-discount-badge">Discounted Price</div>
              <div className="banner-price-wrap">
                <div className="banner-price-new">390</div>
                <div className="banner-price-old">450</div>
              </div>
            </div>
          </li>
        </ul>  */}
			</div>
		</section>
	);
}
