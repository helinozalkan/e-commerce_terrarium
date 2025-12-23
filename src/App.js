// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Products from './pages/Products';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext'; 


function App() {
  return (
    <CartProvider>
      <FavoritesProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sepetim" element={<Cart />} />
            <Route path="/urunler" element={<Products />} />
            <Route path="/favoriler" element={<Favorites />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;