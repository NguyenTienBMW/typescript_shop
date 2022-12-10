import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { QueryAPI } from '../../../access'
import { BannerFooter, BreadCrumb, Card, Contact, Footer, Header, Product_List } from '../../../components'
import {Table} from '../../../components/Table'
import { CartModel, ProductModel } from '../../../model'
import { UserModel } from '../../../model/user'

type NewCart = ProductModel & CartModel
export default function Cart() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const [productList, setProductList] = useState<NewCart[]>([])

  useEffect(() => {
    axios.get(QueryAPI.cart.all(userInfo.id))
      .then(res => {
        setProductList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="container">
        <div className="row table-wrap">
          <div className="col-8">
            <Table productList={productList} />
          </div>
          <div className="col-4">
            <Card />
          </div>
        </div>
      </div>
    </div>
  )
}
