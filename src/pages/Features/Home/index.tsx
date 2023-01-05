import { QueryAPI } from "../../../access";
import { Banner, Banner2, BannerFooter, Carousel, Category, Contact, Footer, Header, Label, Label2, ProductItem } from "../../../components";
import ProductList from "../../../components/Product";

function Home() {
	return (
		<>
			{/* <Header /> */}
			<Carousel />
			<Banner />
			<Category />
			<div className="container">
				<ProductList recommend title="Recommend" />
			</div>
			<BannerFooter />
			<div className="container">
				<ProductList title="Top Rate" url={QueryAPI.product.topRate()}/>
			</div>
			{/* <Label /> */}
			<div className="container">
				<Banner2 idCategory="1" title="Clothes" image="https://images.squarespace-cdn.com/content/v1/61dcd32b3fb8bb4b5af9b560/2469e772-d4de-4dcd-ade0-49183fe7d087/american-made-clothing.jpg"/>
			</div>
			<div className="container">
				<Banner2 idCategory="2" title="Shoes" image="https://i.pinimg.com/originals/a0/4c/76/a04c76f58b6fd1dda4e7a837af2295f6.jpg" />
			</div>
			<div className="container">
				<Banner2 idCategory="3" title="Phone"/>
			</div>
		</>
	);
}

export default Home;
