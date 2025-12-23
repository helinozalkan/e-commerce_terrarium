// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // 1. ADIM: Başlangıçta localStorage'ı kontrol et
  const [favorites, setFavorites] = useState(() => {
    // Tarayıcıda kayıtlı favoriler var mı?
    const savedFavorites = localStorage.getItem('favorites');
    // Varsa JSON'dan çevirip kullan, yoksa boş dizi başlat
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // 2. ADIM: Favoriler her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Favoriye Ekle / Çıkar (Toggle) Mantığı
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.find((item) => item.id === product.id);
      if (isExist) {
        // Varsa çıkar
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        // Yoksa ekle
        return [...prevFavorites, product];
      }
    });
  };

  // Bir ürünün favori olup olmadığını kontrol eder
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);