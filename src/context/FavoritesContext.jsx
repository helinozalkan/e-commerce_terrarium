// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

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