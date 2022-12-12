import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Command, QueryAPI } from '../../../access'
import { BannerFooter, BreadCrumb, Card, Contact, Footer, Header, notificationSuccess, Product_List } from '../../../components'
import { Table } from '../../../components/Table'
import { CartModel, ProductModel } from '../../../model'
import { UserModel } from '../../../model/user'
import Paypal from "../../../assets/images/paypal-mark.jpg"
import { notificationError } from '../../../components/Noti'


export default function Cart() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [cartList, setCartList] = useState<Record<string, CartModel[]>>({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [refresh, setRefresh] = useState(0)
  const [listIdSelect, setListIdSelect] = useState<number[]>([])
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get(QueryAPI.cart.all(userInfo.id))
      .then(res => {
        const data: CartModel[] = res.data;
        const shopIdContainer: number[] = [];
        const result: Record<string, CartModel[]> = {}

        data.forEach((item: CartModel) => {
          if (shopIdContainer.includes(item.shop_id)) return
          shopIdContainer.push(item.shop_id)
        })

        shopIdContainer.forEach(item => {
          if (!result[String(item)]) result[String(item)] = [];
          data.forEach((itemData: CartModel) => {
            if (itemData.shop_id === Number(item)) {
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
  }, [refresh])

  const onSelect = (listid: number[], total: number) => {
    setTotalPrice(total)
    setListIdSelect(listid)
  }

  const onUpdateQuanlity = (shopId: number, cartId: number, value: number) => {
    setCartList(prev => {
      prev[shopId][cartId].quanlity = value
      return { ...prev }
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userId = userInfo.id;
    axios({
      maxRedirects: 0,
      method: 'post',
      // url: Command.payment.add(),
      url: "http://localhost:8000/pay",
      headers: {},
      data: { userId, totalPrice, listIdSelect }
    })
      .then((response) => {
        console.log(response);
        if (response.data.code !== '404') {
          setError('')
          window.location = response.data.forwardLink

        } else {
          notificationError({ description: response.data.message });
          setError(response.data.message)
        }
      }, (error) => {
        alert(error)
      });
  };
  // const onDelete =()

  return (
    <div>
      <div className="container">
        <div className="row table-wrap">
          <div className="col-9">
            {Object.keys(cartList).length > 0 && <Table
              cartList={cartList}
              onDelete={() => setRefresh(prev => prev + 1)}
              onUpdateQuanlity={onUpdateQuanlity}
              onSelect={onSelect}
            />}
          </div>
          <div className="col-3">
            <Card total={totalPrice} listId={listIdSelect} />
            <form onSubmit={handleSubmit}>
              <img src={Paypal} alt="Pay with PayPal" />
              <button>Buy</button>
            </form>
            {/* <div className="">
              <img src={Paypal} alt="Pay with PayPal" />
              <div id="paypal-buttons-container"></div>
              <div id="alternate-button-container" onClick={handleSubmit}>
                <button>Pay with a different method</button>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  )
}
