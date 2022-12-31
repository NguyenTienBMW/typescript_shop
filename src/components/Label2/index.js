import React from "react";
import LabelImg2 from "../../assets/images/label2.jpg";
import Label from "../Label";
import { Col, Divider, Row } from 'antd';
import "./index.scss"

export default function Label2() {
  return <section className="label2-section">
    {/* <div className="label2-wrap"> */}
    <Row gutter={16} >
      <Col xs={24} sm={12} md={12} lg={6} className="gutter-row">
        <div className="label-left">
          <img src={LabelImg2} alt="" className="label2-img" />
        </div>
      </Col>
      <Col xs={24} sm={12} md={12} lg={18} className="gutter-row">

        <div className="label-text">
          <h3 className="label-heading">Building your pages wwith Venam - No Limit!</h3>
          <p>You can build your page with Elementor Free and Venam Theme, with unlimited possibilities...</p>
        </div>
        <div>
          <div className="btn btn-label">
            Shop Now
          </div>
        </div>
      </Col>
    </Row>
    {/* </div> */}
  </section>;
}
