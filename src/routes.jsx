import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./Pages/Home";
// import About from "./Pages/About";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
// import Home from "./Pages/Home";

function routes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index="login" element={<Login />} />
          <Route path="login" element={<Cart />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default routes;
