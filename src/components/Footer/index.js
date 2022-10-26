import React from "react";
import LogoFooter from "../../assets/images/logo_footer.png"
export default function Footer() {
  return <section className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col-3">
          <img src={LogoFooter} alt="" className="footer-heading" />
          <ul className="footer-list">
            <li className="footer-item">
              <p>Namkand sodales vel online best prices Amazon Check out ethnic wear, formal wear western wear Blood Pressure Rate Monito lorem ipsum dolor sit amet lorem ipsum sonda mony daml...</p>
            </li>
            <li className="footer-item">
              <ul className="social-list">
                <li className="social-item"><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                <li className="social-item"><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                <li className="social-item"><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                <li className="social-item"><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                <li className="social-item"><a href="#"><i class="fa-brands fa-pinterest"></i></a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="col-3">
          <h3 className="footer-heading">Customer Service</h3>
          <ul className="footer-list">
            <li className="footer-item"><a href="" className="footer-link">Help Center</a></li>
            <li className="footer-item"><a href="" className="footer-link">Returns</a></li>
            <li className="footer-item"><a href="" className="footer-link">Product Recalls</a></li>
            <li className="footer-item"><a href="" className="footer-link">Accessibility</a></li>
            <li className="footer-item"><a href="" className="footer-link">Contact Us</a></li>
          </ul>
        </div>
        <div className="col-3">
          <h3 className="footer-heading">Customer Service</h3>
          <ul className="footer-list">
            <li className="footer-item"><a href="" className="footer-link">Help Center</a></li>
            <li className="footer-item"><a href="" className="footer-link">Returns</a></li>
            <li className="footer-item"><a href="" className="footer-link">Product Recalls</a></li>
            <li className="footer-item"><a href="" className="footer-link">Accessibility</a></li>
            <li className="footer-item"><a href="" className="footer-link">Contact Us</a></li>
          </ul>
        </div>
        <div className="col-3">
          <h3 className="footer-heading footer-contact">Customer Service</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <i class="footer-icon fa-solid fa-location-dot"></i> W898 RTower Stat, Suite 56</li>
            <li className="footer-item">
              <i class="footer-icon fa-solid fa-phone"></i>458-965-3224</li>
            <li className="footer-item"><i class="footer-icon fa-solid fa-envelope"></i>Support@info.Com</li>
            <li className="footer-item"><i class="footer-icon fa-solid fa-fax"></i>458-965-3224</li>
          </ul>
        </div>
      </div>
    </div>
  </section>;
}
