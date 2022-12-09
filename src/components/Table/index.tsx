import React from "react";
import { CartModel, ProductModel } from "../../model";

type NewCart = ProductModel & CartModel

export const Table = ({
	productList
}: {
	productList: NewCart[]
}) => {
	return (
		<table>
			<tr>
				<th>Action</th>
				<th>Image</th>
				<th>Product</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Subtotal</th>
			</tr>
			{productList.map(item => {
				return <tr>
					<td>
						<button className="btn-delete">
							<i className="fa-solid fa-trash-can"></i>
						</button>
					</td>
					<td>
						<a href="#">
							<img
								src={item.product_image}
								className="pro-img"
								alt="pro-img"
							/>
						</a>
					</td>
					<td>
						<a href="#">
							<h3>{item.product_name}</h3>
						</a>
					</td>
					<td>{item.product_price}</td>
					<td>
						<div className="product-buy">
							<div className="product-quanlity">
								<button className="btn btn-quanlity-dec">-</button>
								<input
									type="text"
									value={item.quanlity}
									className="input-quanlity"
								/>
								<button className="btn btn-quanlity-inc">+</button>
							</div>
						</div>
					</td>
					<td>{Number(item.quanlity) * Number(item.product_price)}</td>
				</tr>
			})}
		</table>
	);
}
