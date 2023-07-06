import './App.css';

import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import Home from './pages/Home';

import Register from './pages/Register';
import Login from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import Shoes from './pages/Shoes';
import Furniture from './pages/Furniture';
import Beauty from './pages/Beauty';
import Electronics from './pages/Electronics';
import { AuthProvider } from './userContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [products, setProducts] = useState([]);

  const [productCategories, setProductCategories] = useState([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/Product");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("/api/Product/GetProductCategories");
      setProductCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getProducts();
    getCategories();

  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Home products={products} productCategories={productCategories} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />

        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
