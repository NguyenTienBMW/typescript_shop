import React from "react";
import Banner31 from "../../assets/images/banner-31.jpg";
import Banner32 from "../../assets/images/banner-32.jpg";
import Banner33 from "../../assets/images/banner-33.jpg";

export default function BannerItem() {
  return (
    <>
      <div
        class="banner-content"
        style={{ backgroundImage: `url(${Banner32})` }}
      >
        <div class="banner-title">
          <div class="banner-cate">Smart Phone</div>
          <div class="banner-subtitle">Samsung note 21</div>
        </div>
        {/* <div class="banner-price">
					<div class="banner-discount-badge">Discounted Price</div>
					<div class="banner-price-wrap">
						<div class="banner-price-new">390</div>
						<div class="banner-price-old">450</div>
					</div>
				</div> */}
        <div className="">
          <button className="btn btn-buy">
            Shop Now
            <i class="fa-solid fa-arrow-right-long btn-icon"></i>
          </button>
        </div>
      </div>
    </>
  );
}
