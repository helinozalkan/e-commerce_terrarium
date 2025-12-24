// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

// MERKEZİ VERİ DOSYASINDAN IMPORT EDİYORUZ
import { allProducts, categories } from '../data/products';

const Products = () => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites(); 

  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("varsayilan");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Yıldız Puanlama Görseli
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="bi bi-star-half"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  // Filtreleme ve Sıralama Mantığı
  useEffect(() => {
    let tempProducts = [...allProducts];

    // 1. Kategori Filtreleme
    if (selectedCategory !== "Tümü") {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    // 2. Sıralama
    if (sortOption === "artan-fiyat") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "azalan-fiyat") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "isim-az") {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "isim-za") {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategory, sortOption]);

  const themeColor = '#198754'; 

  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Sayfa Başlığı */}
      <div className="container-fluid px-lg-5 pt-5 pb-4">
        <div className="text-center mb-4 border-bottom pb-4">
          <div style={{ color: themeColor, fontSize: '1.2rem' }}>Hayalinizdeki Dünyayı Kurun</div>
          <div className="baslik3" style={{ fontSize: '50px' }}>Butik Teraryum Malzemeleri</div>
          <p className="text-muted mt-2">Fanuslardan canlı bitkilere, topraktan minyatür figürlere kadar her şey.</p>
        </div>
      </div>

      <div className="container-fluid px-lg-5">
        <div className="row">
          
          {/* SOL TARA: YAPIŞKAN (STICKY) SIDEBAR */}
          <div className="col-lg-3 col-xl-2 mb-4">
            <div className="bg-white p-4 shadow-sm rounded-4" style={{ position: 'sticky', top: '20px', border: '1px solid #eee' }}>
              <h5 className="fw-bold mb-4" style={{ color: '#333' }}><i className="bi bi-tree me-2"></i>Kategoriler</h5>
              <div className="d-flex flex-column gap-2">
                {categories.map((cat, index) => (
                  <button 
                    key={index} 
                    className="btn text-start d-flex justify-content-between align-items-center py-2 px-3 rounded-3 transition-all"
                    style={{ 
                      backgroundColor: selectedCategory === cat ? themeColor : 'transparent',
                      color: selectedCategory === cat ? '#fff' : '#555',
                      border: selectedCategory === cat ? 'none' : '1px solid transparent'
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span style={{ fontWeight: selectedCategory === cat ? '600' : '400' }}>{cat}</span>
                    {cat !== "Tümü" && (
                       <span className="badge rounded-pill" style={{ backgroundColor: selectedCategory === cat ? 'rgba(255,255,255,0.3)' : '#eee', color: selectedCategory === cat ? '#fff' : '#777' }}>
                         {allProducts.filter(p => p.category === cat).length}
                       </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ TARA: ÜRÜN LİSTESİ */}
          <div className="col-lg-9 col-xl-10">
            
            {/* Üst Bar */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-sm mx-1">
              <span className="text-muted ms-2"><strong>{filteredProducts.length}</strong> ürün bulundu</span>
              <div className="d-flex align-items-center mt-2 mt-md-0">
                <label className="me-2 text-muted small">Sırala:</label>
                <select className="form-select form-select-sm border-0 bg-light" style={{ width: '180px', borderRadius: '20px' }} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="varsayilan">Varsayılan</option>
                  <option value="artan-fiyat">Fiyat (Düşükten Yükseğe)</option>
                  <option value="azalan-fiyat">Fiyat (Yüksekten Düşüğe)</option>
                  <option value="isim-az">İsim (A - Z)</option>
                  <option value="isim-za">İsim (Z - A)</option>
                </select>
              </div>
            </div>

            {/* ÜRÜN KARTLARI */}
            <div className="row g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((urun) => (
                  <div key={urun.id} className="col-md-6 col-lg-4 col-xl-3">
                    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.2s' }}>
                      
                      {/* --- GÖRSEL ALANI VE UYARILAR --- */}
                      <div className="position-relative bg-white text-center">
                        {/* Ürün Tükendiyse Linke Tıklanmasın (Opsiyonel, tıklanabilir de yapılabilir) */}
                        <Link to={`/product/${urun.id}`} style={{ pointerEvents: urun.stock === 0 ? 'none' : 'auto' }}>
                          <img 
                            src={`/images/${urun.image}`} 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x300?text=Urun+Resmi"; }}
                            className="card-img-top" 
                            style={{ 
                              height: '250px', 
                              objectFit: 'cover', 
                              width: '100%', 
                              display: 'block',
                              // Stok 0 ise Siyah-Beyaz yap ve soluklaştır
                              filter: urun.stock === 0 ? 'grayscale(100%)' : 'none', 
                              opacity: urun.stock === 0 ? 0.6 : 1
                            }} 
                            alt={urun.name} 
                          />
                        </Link>

                        {/* STOK UYARISI: KRİTİK STOK (0 ile 5 arası) -> Sol Üst Köşe */}
                        {urun.stock > 0 && urun.stock < 5 && (
                          <span 
                            className="position-absolute top-0 start-0 m-2 badge bg-danger shadow-sm"
                            style={{ zIndex: 5, fontSize: '0.75rem' }}
                          >
                            Son {urun.stock} ürün!
                          </span>
                        )}

                        {/* STOK UYARISI: TÜKENDİ (Stok 0 ise) -> Ortada Büyük Yazı */}
                        {urun.stock === 0 && (
                          <div 
                            className="position-absolute top-50 start-50 translate-middle bg-dark text-white px-4 py-2 rounded fw-bold shadow"
                            style={{ zIndex: 5, fontSize: '1.2rem', opacity: 0.9 }}
                          >
                            TÜKENDİ
                          </div>
                        )}
                        
                        {/* KALP BUTONU */}
                        <button 
                          className="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-2 p-2 d-flex align-items-center justify-content-center"
                          style={{ width: '35px', height: '35px', zIndex: 10 }}
                          onClick={(e) => {
                            e.preventDefault(); 
                            toggleFavorite(urun);
                          }}
                        >
                          <i 
                            className={`bi ${isFavorite(urun.id) ? 'bi-heart-fill text-danger' : 'bi-heart'}`} 
                            style={{ fontSize: '1.1rem' }}
                          ></i>
                        </button>
                      </div>
                      
                      {/* Kart Gövdesi */}
                      <div className="card-body d-flex flex-column p-4 text-start">
                        <div className="flex-grow-1">
                          <span className="text-muted small text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>{urun.category}</span>
                          <h6 className="card-title fw-bold mt-1 mb-1 text-truncate">
                            <Link to={`/product/${urun.id}`} className="text-dark text-decoration-none">
                              {urun.name}
                            </Link>
                          </h6>
                          
                          <div className="starts mb-2 small text-warning">
                            {renderStars(urun.rating)}
                            <span className="text-muted ms-1 small">({urun.rating})</span>
                          </div>

                          <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' }}>
                            {urun.description}
                          </p>
                        </div>
                        
                        <div className="fs-5 fw-bold text-dark mb-2">{urun.price} TL</div>

                        {/* BUTON MANTIĞI: STOK KONTROLÜ */}
                        {urun.stock > 0 ? (
                          // Stok VARSA -> Yeşil Ekle Butonu
                          <button 
                            className="btn text-white w-100 py-2 btn-sm" 
                            style={{ backgroundColor: themeColor, borderRadius: '15px', fontWeight: '600' }}
                            onClick={() => addToCart(urun)}
                          >
                            Sepete Ekle
                          </button>
                        ) : (
                          // Stok YOKSA -> Gri Pasif Buton
                          <button 
                            className="btn btn-secondary w-100 py-2 btn-sm" 
                            style={{ borderRadius: '15px', fontWeight: '600', cursor: 'not-allowed', opacity: 0.6 }}
                            disabled // Butonu devre dışı bırakır
                          >
                            Stokta Yok
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="p-5 bg-white rounded-4 shadow-sm">
                    <i className="bi bi-search fs-1 text-muted"></i>
                    <h4 className="mt-3 text-muted">Bu kriterlere uygun ürün bulunamadı.</h4>
                    <button className="btn btn-outline-secondary mt-3" onClick={() => setSelectedCategory("Tümü")}>Tüm Ürünleri Göster</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;