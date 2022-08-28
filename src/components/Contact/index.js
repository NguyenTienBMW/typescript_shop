import React from "react";

export default function Contact() {
  return <section className="contact-section">
    <div className="row">
      < div className="col-6" >
        <h3 className="contact-title">Subscribe Noew !</h3>
        <p className="contact-subtitle">Venam By Signing Up to Our Newsletter</p>
      </div >
      <div className="col-6">
        <form action="" className="form-contact">
          <input type="text" placeholder="Enter your email..." />
          <button className="btn btn-submit">Subscribe</button>
        </form>
      </div>
    </div >
  </section >;
}
