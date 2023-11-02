import React, { useState, useEffect } from "react";
import "./Top.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = "http://localhost:7070/shop/v1/products";
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function handleAddToCartClick(productId) {
    // Your "Add to Cart" button click logic here
    console.log("Product ID:", productId);

    // Store the product ID in local storage
    localStorage.setItem("cartItem_" + productId, productId);

    // Increment the cart count
    setCartCount(cartCount + 1);

    // You can also interact with the API here if necessary
  }

  return (
    <div className="small-container" id="product-container">
      <div class="row1 row-2">
        <h2>All Products</h2>
        <select>
          <option value="">Default Shorting</option>
          <option value="">Short by price</option>
          <option value="">Short by popularity</option>
          <option value="">Short by rating</option>
          <option value="">Short by sale</option>
        </select>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-4">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p className="price">{product.price}</p>
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
  );
}

export default ProductList;
