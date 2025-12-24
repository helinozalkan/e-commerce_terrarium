// src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { allProducts } from '../data/products'; // Varsayılan veriler

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // 1. ÖNEMLİ: "siteProducts" olan anahtarı "siteProducts_v2" yaptık.
  // Bu sayede tarayıcı eski fiyatları silip yeni küsuratlı fiyatları yükleyecek.
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('siteProducts_v2'); // <-- DEĞİŞTİ
    return savedProducts ? JSON.parse(savedProducts) : allProducts;
  });

  // 2. Kaydederken de yeni anahtarı kullanıyoruz.
  useEffect(() => {
    localStorage.setItem('siteProducts_v2', JSON.stringify(products)); // <-- DEĞİŞTİ
  }, [products]);

  // --- Fonksiyonlar ---

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);