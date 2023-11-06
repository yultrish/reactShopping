import React, { useState, useEffect } from "react";
import "./styles.css";

function generateStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }
  return stars;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // localStorage.removeItem("customer_token");
    // localStorage.removeItem("customer_id");
    async function fetchData() {
      try {
        const apiUrl = "http://localhost:7070/shop/v1/products";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw Error("Network response was not ok");
        }

        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    // handleAddToCartClick();
    createNewCustomerId();
    cartNumber();
  }, []);

  async function handleAddToCartClick(productId) {
    console.log("Handling 'Add to Cart' click for product ID:", productId);
    // Your "Add to Cart" button click logic here
    const customer_id = localStorage.getItem("customer_id");

    console.log("Product ID:", productId);
    console.log("Customer ID:", customer_id);

    const newOrder = await fetch("http://localhost:7070/shop/v1/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        customer_id: Number(customer_id),
      }),
    });

    if (newOrder.status === 409) {
      const res = await newOrder.json();
      alert("Product has already been added to the cart");
      return;
    }

    if (newOrder.status === 200 || newOrder.status === 201) {
      const res = await newOrder.json();
      alert("Product added to the shopping cart: " + productId);
      console.log(res);
    }

    // You can update the cart count using state management if needed
    setCartCount(cartCount + 1);
  }

  async function createNewCustomerId() {
    let customer_token = localStorage.getItem("customer_token");

    if (!customer_token) {
      customer_token = Math.random() + new Date().toLocaleDateString();
      console.log("Customer Token: " + customer_token);

      const url = "http://localhost:7070/shop/v1/customer";
      try {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: "yultrish",
            city: "Accra",
            token: customer_token,
          }),
        });

        if (result.status === 200) {
          localStorage.setItem("customer_token", customer_token);
        }
      } catch (error) {
        console.error("Error creating a new customer:", error);
      }
    }
    console.log("Customer already created");
    console.log(cartCount);
  }

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

  return (
    <>
      <div className="small-container" id="product-container">
        <div className="row row-2">
          <h2>All Products</h2>
          <select>
            <option value="">Default Sorting</option>
            <option value="">Sort by price</option>
            <option value="">Sort by popularity</option>
            <option value="">Sort by rating</option>
            <option value="">Sort by sale</option>
          </select>
        </div>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-4">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p className="price">GHC{product.price}</p>
              <div className="rating">{generateStars(product.rating)}</div>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCartClick(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
