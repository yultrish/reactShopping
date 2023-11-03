import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/Product";
import Footer from "../components/footer";
import "../components/styles.css";

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
