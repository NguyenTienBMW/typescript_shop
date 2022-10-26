import React from 'react'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

export default function Card() {
  return (
    <div className='card-wrap'>
      <h2 className='card-heading'>
        Card totals
      </h2>
      <table>
        <tr>
          <th><h6>Subtotals</h6></th>
          <th>$240.00</th>
        </tr>
        <tr>
          <td>
            <h6>Shipping</h6>
          </td>
          <td>Free shipping</td>
        </tr>
        <th><h6>Total</h6></th>
        <th><strong>$240.00</strong></th>
      </table>
      <Link to="/checkout" className="btn btn-add-prod mt-30">Proceed to checkout</Link>
    </div>
  )
}
