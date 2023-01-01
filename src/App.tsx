import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from "react-router-dom";
import { Footer, Header } from "./components";
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

	console.log('vo')
	return (
		<>
			<Router>
				{(!location.includes('login') && !location.includes('register')) ? <Header /> : <></>}
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/product-detail/:product_id">
						<ProductDetail />
					</Route>
					<Route path="/cart">
						<Cart />
					</Route>
					<Route path="/checkout">
						<Checkout />
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
		</>
	);
}
