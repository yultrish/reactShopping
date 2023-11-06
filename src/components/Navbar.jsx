import React, { useState, useEffect } from "react";
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

  const [cartCount, setCartCount] = useState(0); // Initialize with 0

  useEffect(() => {
    // Function to fetch cart count
    // async function createNewCustomerId() {
    //   let customer_token = localStorage.getItem("customer_token");

    //   if (!customer_token) {
    //     customer_token = Math.random() + new Date().toLocaleDateString();
    //     console.log("Customer Token: " + customer_token);

    //     const url = "http://localhost:7070/shop/v1/customer";
    //     try {
    //       const result = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           name: "yultrish",
    //           city: "Accra",
    //           token: customer_token,
    //         }),
    //       });

    //       if (result.status === 200) {
    //         localStorage.setItem("customer_token", customer_token);
    //       }
    //     } catch (error) {
    //       console.error("Error creating a new customer:", error);
    //     }
    //   }
    //   console.log("Customer already created");
    //   console.log(cartNumber);
    // }

    async function cartNumber() {
      try {
        console.log("Getting cart items list");

        const customer_token = localStorage.getItem("customer_token");

        if (!customer_token) {
          return;
        }

        const result = await fetch(
          "http://localhost:7070/shop/v1/customer-with-token",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              token: customer_token,
            }),
          }
        );

        if (result.status === 200) {
          let response = await result.json();
          console.log(response);
          console.log("Response ID: " + response[0].id);
          const id = response[0].id;
          console.log("Customer ID: " + id);

          let customer_id = localStorage.getItem("customer_id");

          if (!customer_id) {
            localStorage.setItem("customer_id", id);
          }

          const rs = await fetch(
            "http://localhost:7070/shop/v1/orders-with-customerId",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                customer_id: id,
              }),
            }
          );

          if (rs.status === 200) {
            let orders = await rs.json();
            console.log(orders);
            const orderCount = orders.order.length;
            console.log("Cart Item Count: " + orderCount);

            setCartCount(orderCount);
          }
        }
      } catch (error) {
        console.error("Error updating cart item count:", error);
      }
    }

    cartNumber();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <nav style={{ maxHeight: isMenuOpen ? "200px" : "0px" }}>
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
            <span className="cart-number">{cartCount}</span>
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
