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
import Logo from "../../assets/images/t-shop1.png";
import { UserModel } from "../../model/user";
import { QueryAPI } from "../../access";
import { CategoryModel } from '../../model'
import { Dropdown, Menu } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

function Header({ refresh, handleRefresh }: { refresh: number, handleRefresh: () => void }) {
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);
	const history = useHistory();
	const [categories, setCategoryList] = useState<CategoryModel[]>([])
	const [cartTotal, setTotalCart] = useState<number>(0)
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

	useEffect(() => {
		axios.get(QueryAPI.cart.all(userInfo.id))
			.then(res => {
				setTotalCart(res.data?.length)
			})
			.catch(err => {
				console.log(err)
			})
	}, [refresh])

	const renderMenuUser = () => {
		return <Menu>
			<Menu.Item><Link to="/manage-account">Account</Link></Menu.Item>
			<Menu.Item><Link to={`order/${userInfo.id}`}>Purchase form</Link></Menu.Item>
			<Menu.Item onClick={() => {
				history.push('/manage-shop')
				setTest(prev => prev + 1)
			}}>Shop</Menu.Item>
			<Menu.Item onClick={() => {
				localStorage.removeItem('user')
				setTest(prev => prev + 1)
				history.push('/login')
				handleRefresh();
			}}>Log out</Menu.Item>
		</Menu>
	}

	const handleSearch = (value: string) => {
		history.push(`/search/${value}`)
	}

	useEffect(() => {
		window.addEventListener('storage', () => {
			setTest(prev => prev + 1)
		})
	}, [])

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
								<Link to={'/'}><img src={Logo} /></Link>
							</div>
							<div className="col-8 header-main-item navigate-wrap">
								<div className="col-9">
									<div className="search-wrap">
										<input type="text" name="" className="search-input-wrap" id=""
											placeholder="Search for your item's type..."
											onKeyDown={(e: any) => {
												if (13 === e.keyCode) {
													handleSearch(e.target.value)
												}
											}}
										/>
										<button className="search-btn">
											<i className="fa-solid fa-magnifying-glass search-btn-icon"></i>
										</button>
									</div>
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
												<a href="/login">Login</a>
												<span>|</span>
												<a href="/register">Register</a>
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
								<Link to={'/cart'} style={{ position: 'relative' }}>
									<ShoppingCartOutlined />
									{cartTotal ? <span style={{ position: 'absolute', top: '-3px', fontSize: '14px', color: 'white', backgroundColor: 'red', borderRadius: '50%', padding: '0 6px', right: '-9px' }}>{cartTotal}</span> : <></>}
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
