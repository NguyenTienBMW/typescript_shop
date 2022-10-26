import React from 'react'
import { BannerFooter, Card } from '../../../components'
import Cart from '../Cart'

export default function Checkout() {
  return (
    <div>
      <div className="container">
        <BannerFooter />
      </div>
      <div className="container mt-30">
        <h3 className='my-30'>Billing details</h3>
        <form action="">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="first-name">FIRST NAME <span>*</span></label>
                    <input type="text" className="form-control" id="first-name" placeholder="First name" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="last-name">LAST NAME <span>*</span></label>
                    <input type="text" className="form-control" id="last-name" placeholder="Last name" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="company">COMPANY NAME (OPTIONAL)</label>
                    <input type="text" className="form-control" id="company" placeholder="First name" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="country">COUNTRY / REGION <span>*</span></label>
                    <input type="text" className="form-control" id="country" placeholder="Viet Nam" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="address">STREET ADDRESS <span>*</span></label>
                    <input type="text" className="form-control" id="address" placeholder="Trần Phú, Hải Châu 1, Q. Hải Châu" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="postcode">POSTCODE / ZIP (OPTIONAL)</label>
                    <input type="number" className="form-control" id="postcode" placeholder="55555" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="city">TOWN / CITY <span>*</span></label>
                    <input type="text" className="form-control" id="city" placeholder="ĐÀ NẴNG" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="phone">PHONE<span>*</span></label>
                    <input type="tel" className="form-control" id="phone" placeholder="0123456789" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-check-label" htmlFor="notes">ORDER NOTES (OPTIONAL)</label>
                    <textarea className="form-control" id="notes" rows={2} cols={4} placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Card />
                  <div className="">
                    <label>
                      <input type="radio" name="payment-option" value="paypal" checked />
                      <img src="paypal-mark.jpg" alt="Pay with PayPal" />
                    </label>

                    <label>
                      <input type="radio" name="payment-option" value="alternate" />
                      <div id="paypal-marks-container"></div>
                    </label>

                    <div id="paypal-buttons-container"></div>
                    <div id="alternate-button-container">
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
