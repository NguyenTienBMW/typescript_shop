import React from "react";

export default function Table() {
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
			<tr>
				<td>
					<button className="btn-delete">
						<i className="fa-solid fa-trash-can"></i>
					</button>
				</td>
				<td>
					<a href="#">
						<img
							src="https://ninetheme.com/themes/venam/v1/wp-content/uploads/2021/05/1d20de71-9151-425f-890b-2fd4c703c430.dfbaf58eff390bef1eec9774e2e32233-600x600.jpg"
							className="pro-img"
							alt="pro-img"
						/>
					</a>
				</td>
				<td>
					<a href="#">
						<h3>Sound Equipment</h3>
					</a>
				</td>
				<td>$15.00</td>
				<td>
					<div className="product-buy">
						<div className="product-quanlity">
							<button className="btn btn-quanlity-dec">-</button>
							<input
								type="text"
								name=""
								id=""
								placeholder="1"
								className="input-quanlity"
								readonly="readonly"
							/>
							<button className="btn btn-quanlity-inc">+</button>
						</div>
					</div>
				</td>
				<td>$15.00</td>
			</tr>
		</table>
	);
}
