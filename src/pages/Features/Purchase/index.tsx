import { useEffect, useState } from 'react'
import './style.scss';
import axios from 'axios';
import { QueryAPI } from '../../../access';
import { UserModel } from '../../../model/user';
import { CartModel } from '../../../model';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { info } from 'console';

export default function Purchase() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  let data = window.location.href.split('?id=')[1]
  const listId = JSON.parse(data)
  const [cartList, setCartList] = useState<Record<string, CartModel[]>>({})
  const [tab2, setTab2] = useState<any>()
  const objectData = {
    product_image: "https://cf.shopee.vn/file/sg-11134201-22110-ig1ga0vkatjvab",
    product_name: "Sản phẩm 1",
    product_price: 900,
    quanlity: 200
  }
  const objectData2 = {
    product_image: "https://cf.shopee.vn/file/15827a23c85ab57d02195e9a00de725a",
    product_name: "Sản phẩm 2",
    product_price: 700,
    quanlity: 100
  }

  useEffect(() => {
    if (!listId) return;
    axios.get(QueryAPI.cart.list(listId, userInfo.id))
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
  }, [JSON.stringify(listId)])

  const total = Object.values(cartList).reduce((prev, curr) => {
    return prev.concat(curr)
  }, []).reduce((prev, curr) => {
    if (listId.includes(curr.product_id)) {
      return prev + (curr.quanlity * curr.product_price)
    } else {
      return prev + 0
    }
  }, 0)
  const onChange = (key: string) => {
    console.log(key);
  };
  const filterStatus = (cartList: any) => {
    // if (Object.keys(cartList).length > 0) {
    //   Object.values(cartList).map((item) => {
    //     console.log("type", item)
    //     // Object.keys(item).map((key) => {

    //     // })
    //     // if(item[index].status == 0) {
    //     //   setTab2(item);
    //     // }
    //   })
    // }
  }
  filterStatus(cartList);

  const TalbeItem = ({ item1 }: { item1: any }) => {
    return <div className='product-container'>
      <div className="header box-container">
        <div className='name'>Product</div>
        <div className='price'>Price</div>
        <div className='quanlity'>Quanlity</div>
        <div className='total'>Total</div>
      </div>
      {/* {Object.keys(product).length > 0 && Object.values(product).map((item) => { */}
      {/* return <> */}
      <div className='shop box-container'>
        {/* <span>{item[0].shop_name}</span> */}
      </div>
      <div className='product-list box-container'>
        {/* {item.map((item1: any) => { */}
        {/* console.log(`${item1.status}`,) */}
        {/* return  */}
        <div className="product-item">
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
        {/* })} */}
      </div>
      {/* </> */}
      {/* })} */}
      <div className='total-product-container box-container'>
        <span className='total-product'>
          Tổng số tiền ({Object.keys(cartList)?.length} sản phẩm)
        </span>
        <span className='total-price'>
          {total}
        </span>
      </div>
    </div>
  }
  return (
    <>
      <div className='checkout-container'>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            items={[
              {
                label: `Tất cả`,
                key: "1",
                children: <TalbeItem item1={objectData} />,
              },
              {
                label: `Chờ thanh toán`,
                key: "2",
                children: <TalbeItem item1={objectData2} />,
              },
              {
                label: `Vận chuyển`,
                key: "3",
                children: `Vận chuyển`,
              },
            ]}
          />
          {/* <TalbeItem item1={objectData} /> */}

        </div>
      </div>
    </>
  )
}
