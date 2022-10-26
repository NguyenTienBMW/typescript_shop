import { Banner, Banner2, BannerFooter, Carousel, Contact, Footer, Header, Label, Label2, ProductItem } from "../../../components";
import ProductList from "../../../components/Product";

function Home() {
	return (
		<>
			{/* <Header /> */}
			<Carousel />
			<Banner />
			<div className="container">
				<ProductList />
			</div>
			<BannerFooter />
			<div className="container">
				<ProductList />
			</div>
			<Label />
			<div className="container">
				<Banner2 />
			</div>
			<div className="container">
				<Banner2 />
			</div>
			<div className="container">
				<Banner2 />
			</div>
			<div className="container">
				<Label2 />
			</div>
			<div className="container">
				<Contact />
			</div>
		</>
	);
}

export default Home;
