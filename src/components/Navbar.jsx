import React, { useState, useEffect } from "react";
import cartIcon from "./images/cart.png";
import menuIcon from "./images/menu.png";
import "./styles.css";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const {
    setCurrentUser,
    currentUser,
    auth,
    setAuth,
    logout,
    setCartCount,
    cartCount,
  } = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuth = localToken && localToken.length > 0;

    setAuth(isAuth);
    setCurrentUser(isAuth ? user : null);
  }, [setCurrentUser, setAuth]);

  useEffect(() => {
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
          const id = localStorage.getItem("userID");
          console.log("Customer ID: " + id);

          let customer_id = localStorage.getItem("userID");

          if (!customer_id) {
            localStorage.setItem("userID", id);
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
      navigate = useNavigate();
      navigate("/home");
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
          <li className="user-name"> {currentUser.name}</li>
          <li className="logout-control" onClick={handleLogout}>
            <span className="material-symbols-outlined">Logout</span>
          </li>
        </div>
      </>
    );
  } else {
    setCartCount(0);
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
            <a>{authElement}</a>
          </div>
          <nav>
            <ul id="MenuItems">
              <Link to="/wel">
                <li>Home</li>
              </Link>
              <Link to="/home">
                <li>Products</li>
              </Link>
              <li>About</li>
              <li>Contact</li>
              <Link to="/checkout">
                <li>Account</li>
              </Link>
            </ul>
          </nav>
          <a>
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" width="30px" height="30px" />
              <span className="cart-number">{cartCount}</span>
            </Link>
          </a>
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </div>

        <div className="row">
          <div className="col-2">
            <h1>Give Your Workout A New Style !</h1>
            <p>
              Success isn't always about greatness. It's about consistency.
              Consistent hard work gains success. Greatness will come.
            </p>
            <Link to="/home">
              <div className="btn">Explore Now &#8594;</div>
            </Link>
          </div>
          <div className="col-2">
            <img src="images/image1.png" alt="Workout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
