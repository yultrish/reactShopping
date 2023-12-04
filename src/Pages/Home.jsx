import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/Product";
import Footer from "../components/Footer";

import "../components/styles.css";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <ProductList />

      <Footer />
    </>
  );
};

export default Home;
