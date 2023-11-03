import React, { useState } from "react";
import cartIcon from "./images/cart.png";
import menuIcon from "./images/menu.png";
import "./styles.css";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser, auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Home", link: "" },
    { text: "Products", link: "" },
    { text: "About", link: "" },
    { text: "Contact", link: "" },
    { text: "Account", link: "" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuStyles = {
    maxHeight: isMenuOpen ? "200px" : "0px",
  };

  let authElement;
  if (auth) {
    authElement = (
      <>
        <div className="flex">
          <li className="user-name">{currentUser.name}</li>
          <li className="logout-control" onClick={handleLogout}>
            <span className="material-symbols-outlined">Logout</span>
          </li>
        </div>
      </>
    );
  } else {
    authElement = (
      <li className="nav-link cursor-pointer">
        <Link to="/login">
          <span className="material-symbols-outlined">Login</span>
        </Link>
      </li>
    );
  }

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <a href="index.html">{authElement}</a>
          </div>
          <nav style={menuStyles}>
            <ul id="MenuItems">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a>
            <img src={cartIcon} alt="Cart" width="30px" height="30px" />
            <span className="cart-number">0</span>
          </a>
          <img
            src={menuIcon}
            alt="Menu"
            className="menu-icon"
            onClick={toggleMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
