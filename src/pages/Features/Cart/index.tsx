import React from 'react'
import { BannerFooter, BreadCrumb, Card, Contact, Footer, Header, Product_List } from '../../../components'
import Table from '../../../components/Table'

export default function Cart() {
  return (
    <div>
      <div className="container">
        <BannerFooter />
      </div>
      <div className="container">
        <div className="row table-wrap">
          <div className="col-8">
            <Table />
          </div>
          <div className="col-4">
            <Card />
          </div>
        </div>
      </div>
      <div className="container">
        <h3>You may be interested in…</h3>
        <Product_List />
      </div>
      <div className="container">
        <Contact />
      </div>
    </div>

  )
}
