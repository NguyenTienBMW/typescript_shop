import { Checkbox, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import { BannerFooter, Card, notificationSuccess } from '../../../components'
import Cart from '../Cart'
import './style.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Command, QueryAPI } from '../../../access';
import { UserModel } from '../../../model/user';
import { AddressModel, CartModel } from '../../../model';
import { Form, Select, Modal, Button } from 'antd'
import { notificationError } from '../../../components/Noti';

export default function Checkout() {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  let data = window.location.href.split('?id=')[1]
  const listId = JSON.parse(data)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartList, setCartList] = useState<Record<string, CartModel[]>>({})
  const [address, setAddress] = useState<AddressModel>()
  const [refresh, setRefresh] = useState(0)
  const [dataAddress, setDataAddress] = useState<any>([]);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [line, setLine] = useState('');



  useEffect(() => {
    axios.get(QueryAPI.address.allFull())
      .then(res => {
        setDataAddress(res.data)
      })
  }, [])

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

  const total = Object.values(cartList).reduce((prev, curr) => {
    return prev.concat(curr)
  }, []).reduce((prev, curr) => {
    if (listId.includes(curr.product_id)) {
      return prev + (curr.quanlity * curr.product_price)
    } else {
      return prev + 0
    }
  }, 0)

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

  console.log(phone)

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
          {Object.keys(cartList).length > 0 && Object.values(cartList).map((item) => {
            return <>
              <div className='shop box-container'>
                <span>{item[0].shop_name}</span>
              </div>
              <div className='product-list box-container'>
                {item.map((item1) => {
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
          <div className='total-product-container box-container'>
            <span className='total-product'>
              Tổng số tiền ({Object.keys(cartList)?.length} sản phẩm)
            </span>
            <span className='total-price'>
              {total}
            </span>
          </div>
        </div>

        <div className='payment-container box-container'>
          <div>Phương thức thanh toán</div>
          <Radio.Group className='payment-list'>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
          <div className='total-payment'>
            <div className='total-item'>
              <div>Tổng thanh toán</div>
              <div>{total}</div>
            </div>
            {/* <div className='total-item'>
              <div>Tổng tiền</div>
              <div>0</div>
            </div> */}
          </div>
          <div className='btn-order-container box'>
            <div className='btn-payment'>Order</div>
          </div>
        </div>

      </div>
      <Modal title="Update Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='add-address-model'>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: name,
            phone: phone,
            city: Number(city),
            district: Number(district),
            ward: Number(ward),
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
              placeholder="Select a City"
              options={dataAddress.map((item: any, index: any) => ({
                label: item.name,
                value: index
              }))}
              value={city}
              onChange={(value1) => {
                setCity(value1)
                setDistrict('')
                setWard('')
                setLine('')
              }}
            />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[{ required: true, message: 'Please input your district!' }]}
          >
            <Select
              value={district}
              showSearch
              disabled={city === ''}
              placeholder="Select a District"
              options={dataAddress[Number(city)]?.districts.map((item: any, index: any) => ({
                label: item.name,
                value: index
              }))}
              onChange={(value) => {
                setDistrict(value)
                setWard('')
                setLine('')
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
              value={ward}
              disabled={district === ''}
              placeholder="Select a City"
              options={dataAddress[Number(city)]?.districts[Number(district)]?.wards?.map((item: any, index: any) => ({
                label: item.name,
                value: index
              }))}
              onChange={(value) => {
                setWard(value)
                setLine('')
              }}
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
