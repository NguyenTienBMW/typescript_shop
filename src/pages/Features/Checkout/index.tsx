import { Alert, Checkbox, Input, Radio, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { BannerFooter, Card, notificationSuccess } from '../../../components'
import Cart from '../Cart'
import Order from '../Order';
import './style.scss';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Command, QueryAPI } from '../../../access';
import { UserModel } from '../../../model/user';
import { AddressModel, CartModel } from '../../../model';
import { Form, Select, Modal, Button } from 'antd'
import type { RadioChangeEvent } from 'antd';
import { notificationError } from '../../../components/Noti';
import Paypal from "../../../assets/images/paypal-mark.jpg"
const Router = require('react-router');

export default function Checkout() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  let data = window.location.href.split('?id=')[1]
  const listId = JSON.parse(data)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartList, setCartList] = useState<Record<string, CartModel[]>>({})
  const [address, setAddress] = useState<AddressModel>()
  const [refresh, setRefresh] = useState(0)
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [line, setLine] = useState('');
  const [checked, setChecked] = useState(0);
  const [error, setError] = useState<string>('');
  const [total, setTotal] = useState(0);
  const [totalShip, settotalShip] = useState(0);

  const [provinceList, setProvinceList] = useState<any>([]);
  const [districtList, setDistrictList] = useState<any>([]);
  const [wardList, setWardList] = useState<any>([]);

  let history = useHistory();

  const [form] = Form.useForm()


  useEffect(() => {
    axios.get(QueryAPI.province.province())
      .then(res => {
        setProvinceList(res.data.data)
      })
  }, [])

  useEffect(() => {
    if (!city) return
    axios.get(QueryAPI.province.district(city))
      .then(res => {
        setDistrictList(res.data.data)
      })
  }, [city])

  useEffect(() => {
    if (!district) return
    axios.get(QueryAPI.province.ward(district))
      .then(res => {
        setWardList(res.data.data)
      })
  }, [district])

  useEffect(() => {
    axios.get(QueryAPI.address.all(userInfo.id))
      .then(res => {
        const { city_name, district_name, ward_name, full_name, phone, address, city, district, ward } = res.data;
        setAddress(res.data)
        setCity(String(city))
        setDistrict(String(district))
        setWard(String(ward))
        setPhone(phone)
        setName(full_name)
        setLine(address)
      })
      .catch(err => {
        alert(err)
      })
  }, [refresh])

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

  useEffect(() => {
    const total = Object.values(cartList).reduce((prev, curr) => {
      return prev.concat(curr)
    }, []).reduce((prev, curr) => {
      if (listId.includes(curr.product_id)) {
        console.log(cartList)
        return prev + (curr.quanlity * curr.product_price)
      } else {
        return prev + 0
      }
    }, 0)
    setTotal(total)

  }, [cartList])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: any) => {
    axios({
      method: 'post',
      url: Command.address.update(userInfo.id),
      headers: {},
      data: values
    })
      .then((response) => {
        if (response.data.code !== '404') {
          notificationSuccess({ description: 'Bạn đã đổi địa chỉ thành công' });
          // handleSetAddress();
          handleCancel();
          setRefresh(prev => prev + 1)
        } else {
          notificationError({ description: response.data.message });
        }
      }, (error) => {
        alert(error)
      });
  };

  const onChange = (e: RadioChangeEvent) => {
    setChecked(e.target.value);

  };
  const handleSubmit = () => {
    switch (checked) {
      case 1:
        const userId = userInfo.id;
        const newTotalPrice = total.toFixed(2);
        console.log("send...", userId, totalShip, newTotalPrice, listId, address)
        axios({
          maxRedirects: 0,
          method: 'post',
          url: "http://localhost:8000/pay",
          headers: {},
          data: { userId, totalShip, newTotalPrice, listId, address }
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
        break;
      case 2:
        history.push(`order/${userInfo.id}`)
        break;
      default: notificationError({ message: "Order thất bại", description: "Vui lòng chọn phương thức thanh toán" });
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      city: city ? Number(city) : undefined,
      district: district ? Number(district) : undefined,
      ward: ward ? String(ward) : undefined,
    })
  }, [district, city, ward])

  const handleTotalShip = (value: Record<string, number>) => {
    if (value) {
      const data = Object.values(value).reduce((prev, cur) => prev + cur, 0)
      settotalShip(data)
    }
  }


  return (
    <div className='checkout-container'>
      <div className="container">
        <div className='address-container box-container'>
          <div className='address-title'>
            <i className="fa-sharp fa-solid fa-location-dot"></i>
            <span>Địa chỉ nhận hàng</span>
          </div>
          <div className='address-user'>
            <b>{address?.full_name} ({address?.phone})</b>
            <span>{`${address?.address}, ${address?.ward_name}, ${address?.district_name}, ${address?.city_name}`}</span>
            <div className='button-change' onClick={() => showModal()}>Change</div>
          </div>
        </div>

        <div className='product-container'>
          <div className="header box-container">
            <div className='name'>Product</div>
            <div className='price'>Price</div>
            <div className='quanlity'>Quanlity</div>
            <div className='total'>Total</div>
          </div>
          <CartList cartList={cartList} handleTotalShip={handleTotalShip} />


        </div>



        <div className='payment-container box-container'>
          <div>Phương thức thanh toán</div>
          <Radio.Group className='payment-list' onChange={onChange} value={checked}>
            <Radio value={1} style={{ display: "flex", alignItems: "center" }}><img src={Paypal} style={{ maxHeight: "52px" }} alt="Pay with PayPal" /></Radio>
            <Radio value={2}>Thanh toán khi nhận hàng</Radio>
            {/* <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio> */}
          </Radio.Group>
          <div className='total-payment'>
            <div className='total-item'>
              <div>Tổng thanh toán</div>
              <div>{(total + totalShip).toFixed(2) ?? 0}</div>
            </div>
          </div>
          <div className='btn-order-container box' >
            <button className='btn-payment' onClick={handleSubmit}>Order</button>
          </div>
        </div>

      </div>
      <Modal title="Update Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='add-address-model'>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: name,
            phone: phone,
            city: Number(city),
            district: Number(district),
            ward: String(ward),
            address: line
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='form-add-address'
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder='Full Name' />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input placeholder='Phone' />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <Select
              showSearch
              placeholder="Select a city"
              options={provinceList?.map((item: any) => ({
                label: item.ProvinceName,
                value: item.ProvinceID
              }))}
              value={city}
              onChange={(value) => {
                setCity(value);
                setDistrict('')
                setLine('')
                setWard('')
              }}
            />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[{ required: true, message: 'Please input your district!' }]}
          >
            <Select
              showSearch
              disabled={city === ''}
              placeholder="Select a district"
              options={districtList?.map((item: any) => ({
                label: item.DistrictName,
                value: item.DistrictID
              }))}
              onChange={(value) => {
                setDistrict(value)
                setLine('')
                setWard('')
              }}
            />
          </Form.Item>

          <Form.Item
            label="Ward"
            name="ward"
            rules={[{ required: true, message: 'Please input your ward!' }]}
          >
            <Select
              showSearch
              disabled={district === ''}
              placeholder="Select a ward"
              options={wardList?.map((item: any) => ({
                label: item.WardName,
                value: item.WardCode
              }))}
              value={String(ward)}
              onChange={(value) => { setWard(value); setLine(''); }}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input value={line} placeholder='Address' />
          </Form.Item>


          <div className='modal-footer-container'>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-footer'>
              <Button type="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-footer'>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

const CartList = ({ cartList, handleTotalShip }: { cartList: Record<string, CartModel[]>, handleTotalShip: (value: Record<string, number>) => void }) => {
  const [total, setTotal] = useState(0)
  const [ship, setShip] = useState<Record<string, number>>({})


  const handleTotalOrder = (price: number) => {
    setTotal(prev => prev + price)
  }

  const handlegetShip = (value: number, shopId: string) => {
    if (value) {
      setShip((prev) => {
        prev[shopId] = Number(value)
        return { ...prev }
      })
    }
  }

  useEffect(() => {
    handleTotalShip(ship)
  }, [ship])

  return <>
    {Object.keys(cartList).length > 0 && Object.values(cartList).map((item) => {
      return <CartItem key={JSON.stringify(item)} shop={item} handleTotalOrder={handleTotalOrder} handlegetShip={handlegetShip} />
    })}
  </>
}

const CartItem = ({ shop, handleTotalOrder, handlegetShip }: { shop: CartModel[], handleTotalOrder: (value: number) => void, handlegetShip: (value: number, shopId: string) => void }) => {
  const [priceShip, setPriceShip] = useState('');
  const [total, setTotal] = useState(0);
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);

  const getPriceShip = (value: string) => {
    if (value) {
      setPriceShip(value)
    }
  }

  useEffect(() => {
    const totalProduct = shop.reduce((prev, cur) => {
      return prev + (Number(cur.quanlity) * Number(cur.product_price))
    }, 0)
    setTotal(totalProduct + Number(priceShip))
    handleTotalOrder(totalProduct + Number(priceShip))
    handlegetShip(Number(priceShip), String(shop[0].shop_id))
  }, [priceShip, shop])

  return <>
    <div className='shop box-container'>
      <span>{shop[0].shop_name}</span>
    </div>
    <div className='product-list box-container'>
      {shop.map((item1) => {
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
    <Shipping getPriceShip={getPriceShip} userId={userInfo.id} shopId={shop[0].shop_id.toString()} />
    <div className='total-product-container box-container'>
      <span className='total-product'>
        Tổng số tiền ({Object.keys(shop)?.length} sản phẩm)
      </span>
      <span className='total-price'>
        {total.toFixed(2)}
      </span>
    </div>
  </>
}


const Shipping = ({ userId, shopId, getPriceShip }: { userId: string, shopId: string, getPriceShip?: (value: string) => void }) => {
  const [service, setService] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  useEffect(() => {
    axios.get(Command.address.services(userId, shopId))
      .then(res => { setService(res.data.data); setValue(res.data.data?.[0]?.service_id) })
  }, [userId, shopId])

  return <div className='payment-container box-container' style={{ marginTop: "0" }}>
    <div>Phương thức vận chuyển</div>
    <Radio.Group className='payment-list' value={value} onChange={(e) => {
      setValue(e.target.value);
    }}>
      {service.map(payment =>
        <Fee onClick={getPriceShip} defaultValue={value} payment={payment} userId={userId} shopId={shopId} />
      )}

    </Radio.Group>
  </div>
}

const Fee = ({ userId, shopId, onClick, payment, defaultValue }: { payment: any, defaultValue: string, userId: string, shopId: string, onClick?: (value: string) => void }) => {
  const [fee, setFee] = useState<any>();
  const [vnd, setVnd] = useState<number>();
  const { short_name, service_id } = payment
  const radioRef = useRef<any>()

  useEffect(() => {
    axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2022-11-24/currencies/vnd.json'
    ).then(({ data }) => {
      console.log("data", data)
      setVnd(data.vnd.usd)
    });
  }, []);

  useEffect(() => {
    axios.get(Command.address.fee(service_id, userId, shopId))
      .then(res => { setFee(res.data.data) })
  }, [service_id, userId, shopId])

  const total = (fee?.total * Number(vnd)).toFixed(2)
  useEffect(() => {
    if (defaultValue === service_id) {
      onClick?.(total)
    }
  }, [fee, total])

  return <Radio ref={radioRef} onClick={() => onClick?.(total)} value={payment.service_id} style={{ display: "flex", alignItems: "center" }}>
    {short_name}
    {fee ? <div >
      {total} USD
    </div>
      : <></>}
  </Radio>
}
