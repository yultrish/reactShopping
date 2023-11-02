import React from "react";
import "./styles.css";

const Navbar = () => {
  return (
    <>
      <div class="header">
        <div class="container">
          <div class="navbar">
            <div class="logo">
              <a href="index.html">
                {/* <img src="images/logo.png" width="125px" /> */}
              </a>
            </div>
            <nav>
              <ul id="MenuItems">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="products.html">Products</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
                <li>
                  <a href="account.html">Account</a>
                </li>
              </ul>
            </nav>
            <a>
              <img src="images/cart.png" width="30px" height="30px" />
            </a>
            <img
              src="images/menu.png"
              class="menu-icon"
              onclick="menutoggle()"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
