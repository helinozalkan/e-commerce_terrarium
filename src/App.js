// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Sayfalar
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Context Yapıları
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProductProvider } from './context/ProductContext'; // YENİ EKLENDİ

// Müşteri Sayfaları Düzeni
const CustomerLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    // ProductProvider EN DIŞA VEYA DİĞER PROVIDERLARIN YANINA EKLENMELİ
    <ProductProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
              <Route path="/urunler" element={<CustomerLayout><Products /></CustomerLayout>} />
              <Route path="/sepetim" element={<CustomerLayout><Cart /></CustomerLayout>} />
              <Route path="/favoriler" element={<CustomerLayout><Favorites /></CustomerLayout>} />
              <Route path="/login" element={<CustomerLayout><Login /></CustomerLayout>} />
              
              {/* Admin Rotası */}
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              
              <Route path="*" element={<CustomerLayout><div className="text-center mt-5"><h1>404 - Sayfa Bulunamadı</h1></div></CustomerLayout>} />
            </Routes>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;