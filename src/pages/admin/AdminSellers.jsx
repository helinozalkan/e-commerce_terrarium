// src/pages/admin/AdminSellers.jsx
import React, { useState, useEffect } from 'react';
import { allProducts } from '../../data/products'; // Ürün verilerini çekiyoruz

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);

  // Veri Yükleme ve Hesaplama
  useEffect(() => {
    // 1. Benzersiz satıcı isimlerini bul
    const uniqueSellerNames = [...new Set(allProducts.map(p => p.seller))];

    // 2. Her satıcı için istatistikleri hesapla
    const calculatedSellers = uniqueSellerNames.map((sellerName, index) => {
      // Bu satıcının ürünlerini filtrele
      const sellerProducts = allProducts.filter(p => p.seller === sellerName);
      
      // Toplam Stok Değeri (Ciro Potansiyeli)
      const totalRevenue = sellerProducts.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
      
      // Vitrin için ilk 3 ürün görseli
      const showcaseImages = sellerProducts.slice(0, 3).map(p => p.image);

      return {
        id: index + 1,
        shopName: sellerName,
        name: "Girişimci " + (index + 1), // Gerçek isim veride olmadığı için
        productCount: sellerProducts.length,
        sales: totalRevenue, // Burada "Stok Değeri"ni gösteriyoruz
        status: index % 4 === 2 ? "Onay Bekliyor" : "Aktif", // Rastgele statü
        joinDate: "2024-01-1" + index,
        images: showcaseImages
      };
    });

    setSellers(calculatedSellers);
  }, []);

  const toggleStatus = (id) => {
    setSellers(sellers.map(seller => {
      if (seller.id === id) {
        return { 
          ...seller, 
          status: seller.status === "Aktif" ? "Pasif" : "Aktif" 
        };
      }
      return seller;
    }));
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Girişimci Yönetimi</h2>
        <div className="text-muted">
          Toplam <span className="fw-bold text-success">{sellers.length}</span> Satıcı
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 ps-4">Mağaza</th>
                <th>Vitrin (Örnek Ürünler)</th> {/* YENİ KOLON */}
                <th>Ürün Adedi</th>
                <th>Stok Değeri</th>
                <th>Katılım</th>
                <th className="text-center">Durum</th>
                <th className="text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id}>
                  <td className="ps-4">
                    <div className="fw-bold text-dark">{seller.shopName}</div>
                    <div className="small text-muted">{seller.name}</div>
                  </td>
                  
                  {/* ÜRÜN GÖRSELLERİ (VİTRİN) */}
                  <td>
                    <div className="d-flex">
                      {seller.images.map((img, idx) => (
                        <img 
                          key={idx}
                          src={`/images/${img}`} 
                          className="rounded-circle border border-white shadow-sm me-1"
                          style={{ width: '35px', height: '35px', objectFit: 'cover', marginLeft: idx > 0 ? '-10px' : '0' }}
                          alt="Product"
                          title="Satıcının ürünü"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ))}
                      {seller.productCount > 3 && (
                        <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center small text-muted" 
                             style={{ width: '35px', height: '35px', marginLeft: '-10px', fontSize: '10px' }}>
                          +{seller.productCount - 3}
                        </div>
                      )}
                    </div>
                  </td>

                  <td><span className="badge bg-light text-dark border">{seller.productCount} Ürün</span></td>
                  <td className="fw-bold text-success">{seller.sales.toLocaleString('tr-TR')} TL</td>
                  <td className="text-muted small">{seller.joinDate}</td>
                  
                  <td className="text-center">
                    {seller.status === "Aktif" && <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Aktif</span>}
                    {seller.status === "Pasif" && <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 rounded-pill">Pasif</span>}
                    {seller.status === "Onay Bekliyor" && <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill">Onay</span>}
                  </td>

                  <td className="text-center">
                    <button 
                      className={`btn btn-sm rounded-pill px-3 fw-bold ${seller.status === "Aktif" ? 'btn-outline-danger' : 'btn-outline-success'}`}
                      onClick={() => toggleStatus(seller.id)}
                    >
                      {seller.status === "Aktif" ? "Pasife Al" : "Onayla"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSellers;