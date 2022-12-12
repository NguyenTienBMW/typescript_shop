import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { BannerFooter, Card } from '../../../components'
import Cart from '../Cart'
import Paypal from "../../../assets/images/paypal-mark.jpg"
import { Command, QueryAPI } from '../../../access';
import { notificationSuccess } from '../../../components';
import { notificationError } from '../../../components/Noti';
import { CartModel, ProductModel } from '../../../model'
import { UserModel } from '../../../model/user'

type NewCart = ProductModel & CartModel
export default function Checkout() {
  const [error, setError] = useState<string>('');
  const [inputField, setInputField] = useState<{ [x: string]: string }>()
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

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data = {
      firstName: inputField?.firstName,
      lastName: inputField?.lastName,
      company: inputField?.company,
      country: inputField?.country,
      address: inputField?.address,
      postCode: inputField?.postCode,
      city: inputField?.city,
      phone: inputField?.phone,
      notes: inputField?.notes,
      paymentOption: inputField?.paymentOption,
    }
    console.log(productList, data)
    axios({
      method: 'post',
      url: Command.payment.add(),
      headers: {},
      data: { data, productList }
    })
      .then((response) => {
        if (response.data.code !== '404') {
          notificationSuccess({ description: 'Bạn đã đăng ký tài khoản thành công' });
          // history.push('/login')
          setError('')
        } else {
          notificationError({ description: response.data.message });
          setError(response.data.message)
        }
      }, (error) => {
        alert(error)
      });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.currentTarget
    setInputField(prevState => ({ ...prevState, [name]: value }))
  }


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div className="container">
        <BannerFooter />
      </div>
      <div className="container mt-30">
        <h3 className='my-30'>Billing details</h3>
        <form>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="firstName">FIRST NAME <span>*</span></label>
                    <input type="text" className="form-control" id="firstName" name="firstName"
                      value={inputField?.firstName || ''}
                      onChange={handleInputChange}
                      placeholder="First name" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="lastName">LAST NAME <span>*</span></label>
                    <input type="text" className="form-control" id="lastName" name="lastName"
                      value={inputField?.lastName || ''}
                      onChange={handleInputChange}
                      placeholder="Last name" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="company">COMPANY NAME (OPTIONAL)</label>
                    <input type="text" className="form-control" id="company" name="company"
                      value={inputField?.company || ''}
                      onChange={handleInputChange}
                      placeholder="First name" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="country">COUNTRY / REGION <span>*</span></label>
                    <input type="text" className="form-control" id="country" name="country"
                      value={inputField?.country || ''}
                      onChange={handleInputChange}
                      placeholder="Viet Nam" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="address">STREET ADDRESS <span>*</span></label>
                    <input type="text" className="form-control" id="address" name="address"
                      value={inputField?.address || ''}
                      onChange={handleInputChange}
                      placeholder="Trần Phú, Hải Châu 1, Q. Hải Châu" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="postCode">POSTCODE / ZIP (OPTIONAL)</label>
                    <input type="number" className="form-control" id="postCode" name="postCode"
                      value={inputField?.postCode || ''}
                      onChange={handleInputChange}
                      placeholder="55555" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="city">TOWN / CITY <span>*</span></label>
                    <input type="text" className="form-control" id="city" name='city'
                      value={inputField?.city || ''}
                      onChange={handleInputChange}
                      placeholder="ĐÀ NẴNG" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="phone">PHONE<span>*</span></label>
                    <input type="tel" className="form-control" id="phone" name="phone"
                      value={inputField?.phone || ''}
                      onChange={handleInputChange}
                      placeholder="0123456789" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="notes">ORDER NOTES (OPTIONAL)</label>
                    <textarea className="form-control" id="notes" name="notes"
                      onChange={handleInputChange}
                      value={inputField?.notes || ''}
                      rows={2} cols={4} placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Card />
                  <div className="">
                    <label>
                      <input type="radio" name="paymentOption"
                        id="paymentOption"
                        onChange={handleInputChange}
                        value="paypal" checked />
                      <img src={Paypal} alt="Pay with PayPal" />
                    </label>

                    <label>
                      <input type="radio" name="payment_option" value="alternate" />
                      <div id="paypal-marks-container"></div>
                    </label>

                    <div id="paypal-buttons-container"></div>
                    <div id="alternate-button-container" onClick={handleSubmit}>
                      <button>Pay with a different method</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
