import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Wel from "./Pages/Wel";
import Checkout from "./Pages/CheckOut";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wel" element={<Wel />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
