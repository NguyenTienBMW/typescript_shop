import React, { useState } from "react";
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
	BreadCrumb,
	Header,
	Product_List,
	Contact,
	Footer,
} from "../../../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tabs/style/react-tabs.css";
// import images from "../../../core/constants";
import abstract01 from "../../../assets/images/abstract01.jpg";
import abstract02 from "../../../assets/images/abstract02.jpg";
import abstract03 from "../../../assets/images/abstract03.jpg";
import abstract04 from "../../../assets/images/abstract04.jpg";

export default function ProductDetail() {
	var settings = {
		customPaging: function (i) {
			return (
				<a href="/">
					<img
						src={require(`../../../assets/images/abstract0${i + 1}.jpg`)}
						alt="slide-img"
					/>
				</a>
			);
		},
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<section className="product-detail-section">
			<BreadCrumb />
			<div className="product-detail">
				<div className="container">
					<div className="row">
						<div className="col-6">
							<Slider {...settings}>
								<div>
									<img src={abstract01} alt="slide-img" />
								</div>
								<div>
									<img src={abstract02} alt="slide-img" />
								</div>
								<div>
									<img src={abstract03} alt="slide-img" />
								</div>
								<div>
									<img src={abstract04} alt="slide-img" />
								</div>
							</Slider>
						</div>
						<div className="col-6">
							<p className="product-stock">37 In stock</p>
							<h3 className="product-name">High-Speed HDMI</h3>
							<p className="product-price">$99.00</p>
							<p className="product-desc">
								Pellentesque habitant morbi tristique senectus et netus et
								malesuada fames ac turpis egestas. Vestibulum tortor quam,
								feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
								libero sit amet quam egestas semper. Aenean ultricies mi vitae
								est. Mauris placerat eleifend leo.
							</p>
							<hr className="sprate-block" />
							<div className="product-buy">
								<div className="product-quanlity">
									<button className="btn btn-quanlity-dec">-</button>
									<input
										type="text"
										name=""
										id=""
										placeholder="1"
										className="input-quanlity"
									/>
									<button className="btn btn-quanlity-inc">+</button>
								</div>
								<button className="btn btn-add-cart">
									Add to cart
									<i className="fa-solid fa-cart-plus btn-cart-icon"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="product-describe">
						<Tabs>
							<TabList>
								<Tab>Description</Tab>
								<Tab>Additional information</Tab>
							</TabList>

							<TabPanel className="tab-content">
								<p>
									Contrary to popular belief, Lorem Ipsum is not simply random
									text. It has roots in a piece of classical Latin literature
									from 45 BC, making it over 2000 years old. Vivamus bibendum
									magna Lorem ipsum dolor sit amet, consectetur adipiscing
									elit.Contrary to popular belief, Lorem Ipsum is not simply
									random text. It has roots in a piece of classical Latin
									literature from 45 BC, making it over 2000 years old.
								</p>

								<p>
									At vero eos et accusamus et iusto odio dignissimos ducimus qui
									blanditiis praesentium voluptatum deleniti atque corrupti quos
									dolores et quas molestias excepturi sint occaecati cupiditate
									non provident, similique sunt in culpa qui officia deserunt
									mollitia animi, id est laborum et dolorum fuga. Et harum
									quidem rerum facilis est et expedita distinctio.
								</p>
							</TabPanel>
							<TabPanel className="tab-content">
								<div className="product-colors">
									<p className="product-color-title">Color</p>
									<div>
										<a href="#">Black</a>
										<a href="#">Blue</a>
										<a href="#">Pink</a>
										<a href="#">Yellow</a>
									</div>
								</div>
							</TabPanel>
						</Tabs>
					</div>
					<div className="product_viewed">
						<Product_List />
					</div>
					<Contact />
				</div>
			</div>
		</section>
	);
}
