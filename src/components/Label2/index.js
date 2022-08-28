import React from "react";
import LabelImg2 from "../../assets/images/label2.jpg";
import Label from "../Label";
export default function Label2() {
  return <section className="label2-section">
    <div className="label2-wrap">
      <div className="label-left">
        <img src={LabelImg2} alt="" className="label2-img" />
      </div>
      <div className="label-right">
        <Label />
      </div>
    </div>
  </section>;
}
