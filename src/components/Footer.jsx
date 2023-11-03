import React from "react";

const Footer = () => {
  return (
    <>
      {/* <!-- ------------------ footer ----------------  --> */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download our App</h3>
              <p>Download App for Android and ios mobile phone.</p>
              <div class="app-logo">
                {/* <img src="images/play-store.png" />
                <img src="images/app-store.png" /> */}
              </div>
            </div>
            <div className="footer-col-2">
              {/* <img src="images/logo-white.png" /> */}
              <p>
                Our Purpose Is To Sustainably Make th Pleasure and Benefits of
                Fashion Accessible to the Many.
              </p>
            </div>
            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Post</li>
                <li>Return Policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>
            <div class="footer-col-4">
              <h3>Follow us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>
          <hr />
          <p class="copyright"> Copytight 2023</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
