// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Sepete Ürün Ekleme
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Ürün zaten sepette var mı kontrol et
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Varsa miktarını arttır
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Yoksa yeni ekle (Varsayılan miktar 1)
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert("Ürün sepete eklendi!"); // Kullanıcıya bilgi ver
  };

  // Miktar Güncelleme (+ veya -)
  const updateQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (action === 'increment') return { ...item, quantity: item.quantity + 1 };
          if (action === 'decrement' && item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Sepetten Silme
  const removeFromCart = (id) => {
    if (window.confirm("Ürünü sepetten silmek istiyor musunuz?")) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  // Toplam Fiyatı Hesapla
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);