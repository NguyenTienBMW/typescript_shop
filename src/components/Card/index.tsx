import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useHistory,
} from "react-router-dom";
import { UserModel } from '../../model/user';
import { Button, Modal, Form, Input, Select } from 'antd';
import './style.scss'
import axios from 'axios';
import { Command, QueryAPI } from '../../access';
import { notificationError, notificationSuccess } from '../Noti';

export default function Card({ total, listId }: { total?: number; listId?: number[] }) {
  const user: any = localStorage.getItem('user');
  const userInfo: UserModel = JSON.parse(user);
  const history = useHistory()

  const [refresh, setRefresh] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [provinceList, setProvinceList] = useState<any>([]);
  const [districtList, setDistrictList] = useState<any>([]);
  const [wardList, setWardList] = useState<any>([]);
  // const [services, setServices] = useState<any>([]);


  const checkAddress = () => {
    if (userInfo.address) {

      history.push(`checkout?id=${JSON.stringify(listId)}`)
    } else {
      showModal()
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCity('')
    setDistrict('')
    setWard('')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: any) => {
    axios({
      method: 'post',
      url: Command.address.add(userInfo.id),
      headers: {},
      data: values
    })
      .then((response) => {
        if (response.data.code !== '404') {
          notificationSuccess({ description: 'Bạn đã thêm địa chỉ thành công' });
          handleSetAddress();
          handleCancel();
        } else {
          notificationError({ description: response.data.message });
        }
      }, (error) => {
        alert(error)
      });
  };

  const handleSetAddress = () => {
    axios.get(QueryAPI.user.single(userInfo.id))
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setRefresh(prev => prev + 1)
      })
  }
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

  return (
    <>
      <div className='card-wrap'>
        <h2 className='card-heading'>
          Card totals
        </h2>
        <table>
          <tr>
            <th></th>
            <th>Tổng thanh toán {listId?.length} sản phẩm</th>
          </tr>
          <tr>
            <td>
              <h6>Shipping</h6>
            </td>
            <td>Free shipping</td>
          </tr>
          <th><h6>Total</h6></th>
          <th><strong>{total}</strong></th>
        </table>
        <button disabled={!total} onClick={checkAddress} className="btn btn-add-prod mt-30">Mua Hàng</button>
      </div>
      <Modal title="Add Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='add-address-model'>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
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
              options={provinceList.map((item: any) => ({
                label: item.ProvinceName,
                value: item.ProvinceID
              }))}
              value={city}
              onChange={(value) => setCity(value)}
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
              options={districtList.map((item: any) => ({
                label: item.DistrictName,
                value: item.DistrictID
              }))}
              onChange={(value) => setDistrict(value)}
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
              options={wardList.map((item: any) => ({
                label: item.WardName,
                value: item.WardCode
              }))}
              onChange={(value) => setWard(value)}
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder='address' />
          </Form.Item>


          <div className='modal-footer-container'>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-footer'>
              <Button type="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-footer'>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
