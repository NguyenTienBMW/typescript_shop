import React, { useCallback, useEffect, useState } from "react";
import { CartModel, ProductModel } from "../../model";
import { Checkbox } from 'antd';
import './style.scss';
import { Link } from "react-router-dom";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { Command, QueryAPI } from "../../access";


type DataCheck = Record<string, {
	product_id: number,
	cart_id: number,
	check: boolean
}[]>

export const Table = ({
	cartList,
	onSelect,
	onDelete,
	onUpdateQuanlity,
}: {
	cartList: Record<string, CartModel[]>;
	onSelect: (listid: number[], total: number) => void;
	onDelete: () => void;
	onUpdateQuanlity: (shopId: number, cartId: number, value: number) => void
}) => {
	const [datacheck, setDataCheck] = useState<DataCheck>(() => {
		const res = Object.keys(cartList).reduce((prev, current) => {
			const data = cartList[current].map(item => {
				return {
					product_id: item.product_id,
					cart_id: item.id,
					check: false
				}
			})
			return {
				...prev,
				[current]: data
			}
		}, {})
		return res;
	})

	useEffect(() => {
		const listIdSelect = Object.values(datacheck).reduce((prev, cur) => {
			return prev.concat(cur)
		}, []).filter(item => item.check).map(item => item.product_id)

		let total = Object.values(cartList).reduce((prev, curr) => {
			return prev.concat(curr)
		}, []).reduce((prev, curr) => {
			if (listIdSelect.includes(curr.product_id)) {
				console.log("curr.quanlity * curr.product_price", curr.product_price, curr.quanlity)

				return prev + (curr.quanlity * curr.product_price)
			} else {
				return prev + 0
			}
		}, 0)
		let newTotal = Number(total).toFixed(2);
		onSelect(listIdSelect, Number(newTotal))
	}, [datacheck, cartList])

	const onCheckItem = (itemIndex: number, shopId: number, check: boolean) => {
		setDataCheck((prev) => {
			prev[shopId][itemIndex].check = check
			return { ...prev }
		})
	}

	const onCheckAll = (value: boolean, shopId: number) => {
		setDataCheck((prev) => {
			const data = prev[shopId].map(item => {
				return {
					...item,
					check: value
				}
			})
			return {
				...prev,
				[shopId]: data
			}
		})
	}

	const onDeleteSuccess = (cartId: number, shopId: number) => {
		setDataCheck((prev) => {
			const data = prev[shopId].filter(item => item.cart_id !== cartId)
			prev[shopId] = [...data]
			return { ...prev }
		})
		onDelete()
	}

	return (
		<>
			{Object.keys(cartList).map((cart, index) => {
				return <CartShop
					cartList={cartList}
					cart={cart}
					datacheck={datacheck}
					onUpdateQuanlity={onUpdateQuanlity}
					onCheckItem={onCheckItem}
					onCheckAll={onCheckAll}
					onDeleteSuccess={onDeleteSuccess}
				/>
			})}
		</>
	);
}

const CartShop = ({
	cart,
	cartList,
	datacheck,
	onCheckItem,
	onCheckAll,
	onDeleteSuccess,
	onUpdateQuanlity
}: {
	cart: string;
	cartList: Record<string, CartModel[]>
	datacheck: DataCheck;
	onCheckItem: (itemindex: number, shopId: number, check: boolean) => void;
	onCheckAll: (value: boolean, shopId: number) => void
	onDeleteSuccess: (cartId: number, shopId: number) => void;
	onUpdateQuanlity: (shopId: number, cartId: number, value: number) => void
}) => {
	const productList = cartList[cart]
	const shop = productList[0]
	const [checkAll, setCheckAll] = useState(false)

	useEffect(() => {
		const result = datacheck[shop?.shop_id]?.find(item => {
			return !item.check
		})
		if (!result) {
			setCheckAll(true)
		} else {
			setCheckAll(false)
		}
	}, [datacheck])

	return <div className="shop-cart-container">
		<div className="shop-wrap">
			<Checkbox className="check-box" checked={checkAll} onChange={(e) => onCheckAll(e.target.checked, shop?.shop_id)} />
			<div className="shop-image">
				<img src={shop?.shop_avatar} alt={shop?.shop_name} />
			</div>
			<div className="shop-name">{shop?.shop_name}</div>
		</div>
		{productList.map((product, index) => {
			return <CartItem
				cart={product}
				onCheckItem={onCheckItem}
				onDeleteSuccess={onDeleteSuccess}
				onUpdateQuanlity={onUpdateQuanlity}
				itemindex={index}
				dataCheck={datacheck} />
		})}
	</div>
}


const CartItem = ({
	cart, onCheckItem, dataCheck, itemindex, onDeleteSuccess, onUpdateQuanlity
}: {
	cart: CartModel;
	onCheckItem: (itemindex: number, shopId: number, check: boolean) => void;
	itemindex: number;
	onDeleteSuccess: (cartId: number, shopId: number) => void
	dataCheck: DataCheck;
	onUpdateQuanlity: (shopId: number, cartId: number, value: number) => void
}) => {
	const [check, setCheck] = useState(false)
	const [quanlity, setQuanlity] = useState(cart.quanlity);

	useEffect(() => {
		setCheck(dataCheck[cart.shop_id]?.[itemindex]?.check)
	}, [dataCheck])

	const onChange = (e: any) => {
		onCheckItem(itemindex, cart.shop_id, e.target.checked)
	}

	const onDeleteCartItem = () => {
		axios.get(Command.cart.delete(cart.id.toString()))
			.then(resComment => {
				onDeleteSuccess(cart.id, cart.shop_id)
			})
			.catch(err => {
				alert(err);
				console.log(err)
			})
	}
	const onChangeQuanlity = (e: any) => {
		let result = e.target.value.replace(/\D/g, '');
		if (result === 0 || !result) {
			result = ''
		} else if (result[0] === 0) {
			result = result.slice(1, result.length)
		}
		setQuanlity(Number(result))

	}

	const handleQuanlityIncrease = () => {
		if (quanlity === Number(cart.product_quanlity)) return;
		setQuanlity(prev => prev + 1)
	}

	const handleQuanlityReduced = () => {
		if (quanlity <= 1) return;
		setQuanlity(prev => prev - 1)
	}

	const handleUpdateQuanlity = (value: number) => {
		setQuanlity(value)
	}

	useEffect(() => {
		axios({
			method: 'post',
			url: Command.cart.update(cart.id.toString()),
			headers: {},
			data: { quanlity: quanlity }
		})
			.then((response) => {
				if (response.statusText === 'OK') {
					onUpdateQuanlity(cart.shop_id, itemindex, quanlity)
				}
			}, (error) => {
				alert(error)
			});
	}, [quanlity])

	return <div className="shop-cart-item">
		<Checkbox className="check-box" checked={check} onChange={onChange} />
		<div className="product-image">
			<img
				src={cart.product_image}
				className="pro-img"
				alt="pro-img"
			/>
		</div>
		<div className="product-name">
			<Link to={`/product-detail/${cart.product_id}`}>
				<h5 className="truncate-2">{cart.product_name}</h5>
			</Link>
		</div>
		<div className="product-price">{cart.product_price}</div>
		<div className="product-quanlity">
			<button className="btn btn-quanlity-dec" onClick={handleQuanlityReduced}>-</button>
			<input
				type="text"
				value={quanlity}
				className="input-quanlity"
				readOnly
				onChange={onChangeQuanlity}
				onBlur={(e) => handleUpdateQuanlity(Number(e.target.value))}
			/>
			<button className="btn btn-quanlity-inc" onClick={handleQuanlityIncrease}>+</button>
		</div>
		<div className="product-total-price">{Number(cart.product_price) * Number(cart.quanlity)}</div>
		<div className="action-delete">
			<button className="btn-delete" onClick={onDeleteCartItem}>
				<i className="fa-solid fa-trash-can"></i>
			</button>
		</div>
	</div>
}