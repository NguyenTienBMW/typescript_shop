import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import { Footer, Header } from "./components";
import { Cart, Checkout, Home, ProductDetail } from "./pages/Features";
export default function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route path="/product-detail">
						<ProductDetail />
					</Route>
					<Route path="/cart">
						<Cart />
					</Route>
					<Route path="/checkout">
						<Checkout />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</>
	);
}
