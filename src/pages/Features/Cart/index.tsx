import React from 'react'
import { BannerFooter, BreadCrumb, Card, Contact, Footer, Header, Product_List } from '../../../components'
import Table from '../../../components/Table'

export default function Cart() {
  return (
    <div>
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
    </div>
  )
}
