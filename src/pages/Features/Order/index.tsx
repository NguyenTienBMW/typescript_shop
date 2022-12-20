import React, { useEffect, useState } from 'react'
import './style.scss';
import axios from 'axios';
import { QueryAPI } from '../../../access';
import { UserModel } from '../../../model/user';
import { CartModel } from '../../../model';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
const Router = require('react-router');


export default function Order() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [cartList, setCartList] = useState<Record<string, CartModel[]>>({});
  const [key, setKey] = useState<any>(0);
  useEffect(() => {
    axios.get(QueryAPI.order.all(userInfo.id))
      .then(res => {
        const data: CartModel[] = res.data;
        const shopIdContainer: number[] = [];
        let result: Record<string, CartModel[]> = {}

        data.forEach((item: CartModel) => {
          if (shopIdContainer.includes(item.shop_id)) return
          shopIdContainer.push(item.shop_id)
        })

        shopIdContainer.forEach(item => {
          // console.log("result[String(item)]", String(item))
          data.forEach((itemData: CartModel) => {
            if (itemData.shop_id === Number(item) && itemData.status_order == key) {
              if (!result[String(item)]) result[String(item)] = [];
              result[String(item)] = [
                ...result[String(item)],
                itemData
              ]
            }
          })
        })
        setCartList(result)
      })
      .catch(err => {
        console.log(err)
      })
  }, [key])

  // const total = Object.values(cartList).reduce((prev, curr) => {
  //   return prev.concat(curr)
  // }, []).reduce((prev, curr) => {
  //   if (listId.includes(curr.product_id)) {
  //     return prev + (curr.quanlity * curr.product_price)
  //   } else {
  //   return prev + 0
  //   }
  // }, 0)



  function callback(key: any) {
    setKey(key)
  }


  return (
    <div className='checkout-container'>
      <div className="container">

        <Tabs onChange={callback} type="card">
          <TabPane tab="Chờ thanh toán" key="0"><TabItem cartList1={cartList} /></TabPane>
          <TabPane tab="Vận chuyển" key="1"><TabItem cartList1={cartList} /></TabPane>
          <TabPane tab="Đang giao" key="2"><TabItem cartList1={cartList} /></TabPane>
          <TabPane tab="Hoàn thành" key="3"><TabItem cartList1={cartList} /></TabPane>
        </Tabs>
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
const TabItem = ({ cartList1 }: { cartList1: Record<string, CartModel[]> }) => {
  console.log(cartList1)
  return <div className='product-container'>
    {Object.keys(cartList1).length > 0 && <div className="header box-container">
      <div className='name'>Product</div>
      <div className='price'>Price</div>
      <div className='quanlity'>Quanlity</div>
      <div className='total'>Total</div>
    </div>}
    {Object.keys(cartList1).length > 0 && Object.values(cartList1).map((item, index) => {
      return <>
        <div className='shop box-container' key={index}>
          <span>{item[0]?.shop_name}</span>
        </div>
        <div className='product-list box-container'>
          {item?.map((item1) => {
            return <div className="product-item">
              <div className='info-container'>
                <div className="product-image">
                  <img
                    src={item1.product_image}
                    className="pro-img"
                    alt="pro-img"
                  />
                </div>
                <div className="product-name">
                  <h5 className="truncate-2">{item1.product_name}</h5>
                </div>
              </div>
              <div className="product-price">{item1.product_price}</div>
              <div className="product-quanlity">{item1.quanlity}</div>
              <div className="product-total-price">{Number(item1.quanlity) * Number(item1.product_price)}</div>
            </div>
          })}
        </div>
      </>
    })}

    {/* <div className='total-product-container box-container'>
    <span className='total-product'>
      Tổng số tiền ({Object.keys(cartList)?.length} sản phẩm)
    </span>
    <span className='total-price'>
      {total}
    </span>
  </div> */}
  </div>
}