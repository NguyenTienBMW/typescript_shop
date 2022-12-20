import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useHistory,
	useParams
} from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons'
import Logo from "../../assets/images/logo.png";
import { UserModel } from "../../model/user";
import { QueryAPI } from "../../access";
import { CategoryModel } from '../../model'
import { Dropdown, Menu } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

function Header() {
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);
	const history = useHistory();
	const [categories, setCategoryList] = useState<CategoryModel[]>([])
	const [test, setTest] = useState(0)

	useEffect(() => {
		axios.get(QueryAPI.category.all())
			.then(res => {
				setCategoryList(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	const renderMenuUser = () => {
		return <Menu>
			<Menu.Item>Tài khoản của tôi</Menu.Item>
			<Menu.Item><Link to={`order/${userInfo.id}`}>Đơn mua</Link></Menu.Item>
			<Menu.Item onClick={() => {
				localStorage.removeItem('user')
				setTest(prev => prev + 1)
			}}>Đăng xuất</Menu.Item>
		</Menu>
	}

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
										<button className="search-btn">
											<i className="fa-solid fa-magnifying-glass search-btn-icon"></i>
										</button>
									</form>
								</div>
								<div className="col-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<div className="header-main-icon-list">
										{userInfo
											? <div className="header-main-icon-item">
												<Dropdown overlay={renderMenuUser} placement="topLeft">
													<div className="header-main-icon-link has-badge">
														{userInfo?.name}&nbsp;
														<i className="fa-solid fa-user"></i>
														{/* <span className="badge">0</span>&nbsp; */}
														{/* <span onClick={() => localStorage.removeItem('user')}><LogoutOutlined /></span> */}
													</div>
												</Dropdown>
											</div>
											: <>
												<a href="/login">Đăng nhập</a>
												<span>|</span>
												<a href="/register">Đăng ký</a>
											</>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header-bottom">
					<div className="container">
						<div className="header-bottom-list">
							<div className="home-redirect">
								<Link to={'/'}>Home</Link>
							</div>
							<div className="cart-icon">
								<Link to={'/cart'}>
									<ShoppingCartOutlined />
								</Link>
							</div>
						</div>
					</div>
				</div >
			</div >
		</>
	);
}

export default Header;
