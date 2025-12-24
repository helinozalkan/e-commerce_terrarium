// src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { allProducts } from '../data/products'; // Varsayılan veriler

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // 1. Başlangıçta localStorage kontrolü yapıyoruz.
  // Eğer tarayıcıda kayıtlı veri varsa onu kullan, yoksa dosyadaki veriyi al.
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('siteProducts');
    return savedProducts ? JSON.parse(savedProducts) : allProducts;
  });

  // 2. Ürünlerde herhangi bir değişiklik olduğunda (stok, fiyat vb.)
  // bunu localStorage'a "siteProducts" adıyla kaydet.
  useEffect(() => {
    localStorage.setItem('siteProducts', JSON.stringify(products));
  }, [products]);

  // --- Fonksiyonlar ---

  // Admin: Stok veya Ürün Bilgisi Güncelleme
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Admin: Yeni Ürün Ekleme
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