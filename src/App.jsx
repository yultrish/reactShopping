import React from "react";
import "./App.css";
import Routers from "./Routers";
import { AuthProvider } from "./context/ContextAuth";
import { AnimatePresence } from "framer-motion";
// import { Router } from "react-router-dom";
// import {
//   createBrowserRouter,
//   Routes,
//   Route,
//   Link,
//   NavLink,
//   createRoutesFromElements,
//   RouterProvider,
// } from "react-router-dom";
// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Login from "./Pages/Login";
// import RootLayout from "/src/layouts/RootLayouts.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes path="/" element={RootLayout}>
//       <Route index element={<Login />} />
//       <Route path="home" element={<Home />} />
//       <Route path="/about" element={<About />} />
//     </Routes>
//   )
// );

function App() {
  return (
    <>
      <AnimatePresence wait>
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </AnimatePresence>
      {/* <Routes /> */}
      {/* <AuthProvider /> */}
      {/* //{" "}
      <BrowserRouter>
        //{" "}
        <header>
          // <h1>JobRouter</h1>
          // <Link to="/">Login</Link>
          // <NavLink to="home">Home</NavLink>
          // <NavLink to="about">About</NavLink>
          //{" "}
        </header>
        // <RouterProvider router={router} /> //{" "} */}
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
