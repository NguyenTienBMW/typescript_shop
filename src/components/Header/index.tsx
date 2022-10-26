import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
function Header() {
	return (
		<>
			<div className="page-header">
				<div className="header-top-wrap">
					<div className="container">
						<div className="row">
							<ul className="header-top">
								<li className="header-top-item">
									<ul className="header-top-left">
										<li className="header-top-left-item has-menu">
											US/USD
											<i className="fa-solid fa-caret-down dropdown-icon"></i>
											<ul className="menu-list">
												<li className="menu-item">AUS/USD</li>
												<li className="menu-item">BNG/TK</li>
												<li className="menu-item">IN/RG</li>
											</ul>
										</li>
										<li className="header-top-left-item has-menu">
											Sell With Us
											<i className="fa-solid fa-caret-down dropdown-icon"></i>
										</li>
									</ul>
								</li>
								<li className="header-top-item">
									<ul className="header-top-right">
										<li className="header-top-right-item">
											<a href="/" className="social-link">
												<i className="fa-brands fa-facebook"></i>
											</a>
										</li>
										<li className="header-top-right-item">
											<a href="/" className="social-link">
												<i className="fa-brands fa-twitter"></i>
											</a>
										</li>
										<li className="header-top-right-item">
											<a href="/" className="social-link">
												<i className="fa-brands fa-viber"></i>
											</a>
										</li>
										<li className="header-top-right-item">
											<a href="/" className="social-link">
												<i className="fa-brands fa-whatsapp"></i>
											</a>
										</li>
										<li className="header-top-right-item">
											<a href="/" className="social-link">
												<i className="fa-brands fa-instagram"></i>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="header-main-wrap">
					<div className="container">
						<div className="row header-main">
							<div className="col-2 header-main-item">
								<img src={Logo} />
							</div>
							<div className="col-8 header-main-item navigate-wrap">
								<div className="col-9">
									<form action="" className="search-wrap">
										<input type="text" name="" className="search-input-wrap" id="" placeholder="Search for your item's type..." />
										<div className="header-search-select">
											<span className="header-search-lable">All Category</span>
											<i className="fa-solid fa-chevron-down"></i>
											<ul className="search-cate">
												<li className="cate-item">All Category</li>
												<li className="cate-item">Accessories</li>
												<li className="cate-item">Best Seller</li>
												<li className="cate-item">Camera</li>
												<li className="cate-item">Computer</li>
											</ul>
										</div>
										<button className="search-btn">
											<i className="fa-solid fa-magnifying-glass search-btn-icon"></i>
										</button>
									</form>
								</div>
								<div className="col-3">
									<div className="header-main-icon">
										<ul className="header-main-icon-list">
											<li className="header-main-icon-item">
												<a href="/" className="header-main-icon-link has-badge">
													<i className="fa-solid fa-user"></i>
													<span className="badge">0</span>
												</a>
											</li>
											<li className="header-main-icon-item">
												<a href="/" className="header-main-icon-link"><i className="fa-solid fa-arrows-rotate"></i></a>
											</li>
											<li className="header-main-icon-item">
												<a href="/" className="header-main-icon-link"><i className="fa-solid fa-heart"></i></a>
											</li>
											<li className="header-main-icon-item">
												<Link to="/cart" className="header-main-icon-link"><i className="fa-solid fa-bag-shopping"></i></Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-bottom">
					<div className="container">
						<div className="row header-bottom-wrap">
							<div className="col-3">
								<p className="header-bottom-left">
									<i className="fa-solid fa-bars"></i>
									<a href="/" className="header-bottom-link">All Categories</a>
									<i className="fa-solid fa-chevron-down"></i>
								</p>
							</div>
							<div className="col-9">
								<ul className="header-bottom-nav">
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Home <i className="fa-solid fa-chevron-down header-bottom-icon"></i> </a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Categories <i className="fa-solid fa-chevron-down header-bottom-icon"></i></a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Shop <i className="fa-solid fa-chevron-down header-bottom-icon"></i></a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Pages <i className="fa-solid fa-chevron-down header-bottom-icon"></i></a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Special <i className="fa-solid fa-chevron-down header-bottom-icon"></i></a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Stories List <i className="fa-solid fa-chevron-down header-bottom-icon"></i></a></li>
									<li className="header-bottom-item"><a href="" className="header-bottom-link">
										Contact</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
