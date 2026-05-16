import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import ProductsPage from "./pages/ProductsPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./components/Main";
import HomePage from "./pages/HomePage";


const App = () => {
  
  return (
    <>
        
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="product" element={<ProductsPage/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="main" element={<Main/>}/>
            <Route path="product/:id" element={<SingleProduct/>}/>
        </Routes>
    </>
  );
};

export default App;
