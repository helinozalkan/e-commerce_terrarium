// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext'; // YENİ EKLENDİ

function App() {
  return (
    <CartProvider> {/* Provider En Dışa Eklendi */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sepetim" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;