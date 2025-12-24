// src/context/OrderContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { allOrders } from '../data/orders'; // Başlangıç verisi

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // Siparişleri localStorage'dan çek veya başlangıç verisini kullan
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('siteOrders_v1');
    return saved ? JSON.parse(saved) : allOrders;
  });

  // Her değişiklikte kaydet
  useEffect(() => {
    localStorage.setItem('siteOrders_v1', JSON.stringify(orders));
  }, [orders]);

  // Durum Güncelleme (Örn: Hazırlanıyor -> Kargolandı)
  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  // Sipariş Silme
  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);