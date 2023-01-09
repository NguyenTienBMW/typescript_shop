import React, { useEffect, useState } from 'react'
import './style.scss';
import axios from 'axios';
import { QueryAPI } from '../../../access';
import { UserModel } from '../../../model/user';
import { CartModel } from '../../../model';
import { ProductModel } from '../../../model';
import { OrderModel } from '../../../model/order';
import { Tabs } from 'antd';
import Item from 'antd/lib/list/Item';
import { Link } from 'react-router-dom';
import { ProOrderModel } from '../../../model/product_order';
import moment from 'moment';


const TabPane = Tabs.TabPane;
const Router = require('react-router');


export default function Order() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [key, setKey] = useState<any>(0);
  const [order, setOrder] = useState<OrderModel[]>([]);

  useEffect(() => {
    axios.get(QueryAPI.order.all(userInfo.id))
      .then(res => {
        let orderList = res.data.filter((item: any) => item.status_order == key);
        // console.log(orderList)
        setOrder(orderList)
      })
      .catch(err => {
        console.log(err)
      })
  }, [key])




  function callback(key: any) {
    setKey(key)
  }


  return (
    <div className='checkout-container'>
      <div className="container">
        <div style={{marginTop: '30px'}}>
          <h4 style={{marginBottom: '10px'}}>List Order ({order.length})</h4>
          <TabItem cartList1={order} />
        </div>
        {/* <Tabs onChange={callback} type="card">
          <TabPane tab="Chờ xác nhận" key="0"></TabPane>
          <TabPane tab="Vận chuyển" key="1"><TabItem cartList1={order} /></TabPane>
          <TabPane tab="Đang giao" key="2"><TabItem cartList1={order} /></TabPane>
          <TabPane tab="Hoàn thành" key="3"><TabItem cartList1={order} /></TabPane>
        </Tabs> */}
        {/* <div className='total-product-container box-container'>
          <span className='total-product'>
            Tổng số tiền ({Object.keys(cartList)?.length} sản phẩm)
          </span>
          <span className='total-price'>
            {total}
          </span>
        </div> */}
      </div>
    </div>
  )
}
const TabItem = ({ cartList1 }: { cartList1: OrderModel[] }) => {
  return <>{
    cartList1.map(Item => {
      return <div className='order-shop-container'>
        <div className='product-container'>
          <ItemRow key={Item.id} orderId={Item.id.toString()} />
        </div>
        <div className='total-price'>Ship: {(Item.totalShip).toFixed(2)} $</div>
        <div className='total-price'>Total: {(Item.totalPrice + Item.totalShip).toFixed(2)} $</div>
        <div className='order-price'>
          <p>{moment(Item.update_at).format('YYYY-MM-DD, h:mm:ss a')}</p>
          <div className='type-payment'>{Item.payment_method === 0 ? 'Paypal' : "Payment on delivery"}</div>
        </div>
      </div>
    })}</>
}
const ItemRow = ({ orderId }: { orderId: string }) => {
  const [productOrder, setProductOrder] = useState<ProOrderModel[]>([])
  useEffect(() => {
    axios.get(QueryAPI.order.product_order(orderId))
      .then(res => {
        setProductOrder(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [orderId])

  return <>{productOrder.map(Item => {
    console.log("item", Item)
    return <div className='shop-cart-container' style={{ marginTop: '0', border: 'none' }} key={Item.id}>
      <div className="shop-cart-item">
        <div className="product-image">
          <img
            src={Item.product_image}
            className="pro-img"
            alt="pro-img"
          />
        </div>
        <div className="product-name">
          {/* <Link to={`/product-detail/${Item.id}`}> */}
          <h5 className="truncate-2">{Item.product_name}</h5>
          <p>Quanlity: {Item.quanlity}</p>
          {/* </Link> */}
        </div>
        <div className="product-price" style={{display: 'flex', justifyContent: 'flex-end'}}>{Item.price} $</div>
      </div>
    </div>

  })}
  </>
}