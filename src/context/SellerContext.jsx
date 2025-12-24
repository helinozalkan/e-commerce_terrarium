// src/context/SellerContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// GÜNCELLENMİŞ SATICI VE BAŞVURU LİSTESİ (NORMAL İSİMLER)
const initialSellers = [
  // --- AKTİF SATICILAR ---
  { id: 1, name: "Ayşe Yılmaz", shopName: "Cam Dünyası", email: "ayse@cam.com", phone: "0555 111 22 33", status: "Aktif", joinDate: "2023-10-12" },
  { id: 2, name: "Mehmet Demir", shopName: "Yeşil Sera", email: "mehmet@sera.com", phone: "0555 222 33 44", status: "Aktif", joinDate: "2023-08-05" },
  { id: 3, name: "Selin Kara", shopName: "Hobi Market", email: "selin@hobi.com", phone: "0555 333 44 55", status: "Aktif", joinDate: "2024-01-15" },
  { id: 4, name: "Caner Çelik", shopName: "Taş Dünyası", email: "caner@tas.com", phone: "0555 444 55 66", status: "Pasif", joinDate: "2023-11-20" },
  { id: 101, name: "Elif Öztürk", shopName: "Toprak Ana", email: "elif@toprak.com", phone: "0532 111 22 33", status: "Aktif", joinDate: "2023-05-10" },
  { id: 102, name: "Murat Şen", shopName: "Minyatür Orman", email: "murat@orman.com", phone: "0533 222 33 44", status: "Aktif", joinDate: "2023-06-15" },
  { id: 103, name: "Deniz Aksoy", shopName: "Cam ve Sanat", email: "deniz@sanat.com", phone: "0535 333 44 55", status: "Aktif", joinDate: "2023-09-01" },
  { id: 104, name: "Kenan Yıldız", shopName: "Yeşil Vadi", email: "kenan@yesilvadi.com", phone: "0536 444 55 66", status: "Aktif", joinDate: "2023-01-20" },
  { id: 105, name: "Fatma Çetin", shopName: "Boncuk Dünyası", email: "fatma@boncuk.com", phone: "0537 555 66 77", status: "Aktif", joinDate: "2023-03-12" },
  { id: 106, name: "Cüneyt Aslan", shopName: "Atölye Renk", email: "cuneyt@atolye.com", phone: "0538 666 77 88", status: "Aktif", joinDate: "2023-07-30" },
  { id: 107, name: "Adile Güneş", shopName: "Masal Bahçesi", email: "adile@masal.com", phone: "0539 777 88 99", status: "Aktif", joinDate: "2023-12-05" },
  { id: 108, name: "Şener Kılıç", shopName: "Neşeli Bahçe", email: "sener@neseli.com", phone: "0541 888 99 00", status: "Aktif", joinDate: "2024-01-02" },
  { id: 109, name: "Tarık Bulut", shopName: "Doğa Yolu", email: "tarik@doga.com", phone: "0542 999 00 11", status: "Aktif", joinDate: "2023-02-14" },
  { id: 110, name: "Türkan Aydın", shopName: "Sera Vakti", email: "turkan@sera.com", phone: "0543 123 45 67", status: "Pasif", joinDate: "2023-04-23" },

  // --- ONAY BEKLEYEN BAŞVURULAR ---
  { id: 5, name: "Zeynep Su", shopName: "Minik Bahçem", email: "zeynep@mail.com", phone: "0532 123 45 67", status: "Onay Bekliyor", joinDate: "2024-02-01" },
  { id: 6, name: "Burak Öz", shopName: "Doğal Tasarım", email: "burak@mail.com", phone: "0533 987 65 43", status: "Onay Bekliyor", joinDate: "2024-02-02" },
  { id: 201, name: "Barış Tepe", shopName: "Tasarım 360", email: "baris@tasarim.com", phone: "0544 234 56 78", status: "Onay Bekliyor", joinDate: "2024-02-03" },
  { id: 202, name: "Cem Yılmazer", shopName: "Usta Elleri", email: "cem@usta.com", phone: "0545 345 67 89", status: "Onay Bekliyor", joinDate: "2024-02-04" },
  { id: 203, name: "Müzeyyen Gül", shopName: "Sanat Köşesi", email: "muzeyyen@sanat.com", phone: "0546 456 78 90", status: "Onay Bekliyor", joinDate: "2024-02-04" },
  { id: 204, name: "Zeki Demir", shopName: "Elit Tasarım", email: "zeki@elit.com", phone: "0547 567 89 01", status: "Onay Bekliyor", joinDate: "2024-02-05" },
  { id: 205, name: "Ajda Sarı", shopName: "Yıldız Bitkiler", email: "ajda@yildiz.com", phone: "0548 678 90 12", status: "Onay Bekliyor", joinDate: "2024-02-05" },
  { id: 206, name: "Tarkan Bey", shopName: "Doğa Tutkusu", email: "tarkan@dogatutkusu.com", phone: "0549 789 01 23", status: "Onay Bekliyor", joinDate: "2024-02-06" },
];

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // 1. ÖNEMLİ: İsimleri değiştirdiğimiz için versiyonu v3 yaptık.
  // Bu sayede tarayıcı eski listeyi (ünlüleri) silip bu yeni listeyi yükleyecek.
  const [sellers, setSellers] = useState(() => {
    const saved = localStorage.getItem('siteSellers_v3'); 
    return saved ? JSON.parse(saved) : initialSellers;
  });

  // 2. LocalStorage'a kaydederken de v3 kullanıyoruz.
  useEffect(() => {
    localStorage.setItem('siteSellers_v3', JSON.stringify(sellers));
  }, [sellers]);

  const addSeller = (newSeller) => {
    setSellers(prev => [...prev, { ...newSeller, id: Date.now(), joinDate: new Date().toISOString().split('T')[0] }]);
  };

  const updateSellerStatus = (id, newStatus) => {
    setSellers(prev => prev.map(seller => seller.id === id ? { ...seller, status: newStatus } : seller));
  };

  const deleteSeller = (id) => {
    setSellers(prev => prev.filter(seller => seller.id !== id));
  };

  return (
    <SellerContext.Provider value={{ sellers, addSeller, updateSellerStatus, deleteSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSellers = () => useContext(SellerContext);