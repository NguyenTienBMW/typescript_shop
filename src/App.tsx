import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import { Footer, Header } from "./components";
import { Chatbot } from "./components/Chatbot";
import { UserModel } from "./model/user";
import { Account } from "./pages/Account";
import { Cart, Checkout, Home, ProductCategory, ProductDetail, ProductSearch, Order, ViewShop } from "./pages/Features";
import { Login } from "./pages/Features/login";
import { Register } from "./pages/Features/Register";
import { AddProduct, TableProduct } from "./pages/Product"

export default function App() {
	const user: any = localStorage.getItem('user');
	const userInfo: UserModel = JSON.parse(user);
	const location = window.location.pathname;
	const [refresh, setRefresh] = useState(0)
	const updateTotalCart = () => {
		setRefresh(prev => prev + 1)
	}

	return (
		<>
			<Router>
				{(!location.includes('login') && !location.includes('register')) ? <Header refresh={refresh} /> : <></>}
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/product-detail/:product_id">
						<ProductDetail updateTotalCart={updateTotalCart} />
					</Route>
					<Route path="/cart">
						<Cart updateTotalCart={updateTotalCart} />
					</Route>
					<Route path="/checkout">
						<Checkout updateTotalCart={updateTotalCart} />
					</Route>
					<Route path="/manage-shop">
						<AddProduct />
					</Route>
					<Route path="/manage-account">
						<Account />
					</Route>
					<Route path="/list-product">
						<TableProduct />
					</Route>
					<Route path="/product-category/:category">
						<ProductCategory />
					</Route>
					<Route path="/view-shop/:shopId">
						<ViewShop />
					</Route>
					<Route path="/search/:keyword">
						<ProductSearch />
					</Route>
					<Route path="/order">
						<Order />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				{(!location.includes('login') && !location.includes('register')) ? <Footer /> : <></>}
			</Router>
			<Chatbot />
		</>
	);
}
