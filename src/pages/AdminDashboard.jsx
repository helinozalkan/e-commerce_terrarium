// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

const MASTER_PRODUCTS = [
  { id: 1, name: "Geometrik Prizma Fanus", category: "Fanuslar", price: 850, image: "fanus_geometrik.jpg" },
  { id: 2, name: "Elma Cam Fanus (Orta)", category: "Fanuslar", price: 250, image: "fanus_elma.jpg" },
  { id: 3, name: "Armut Cam Fanus", category: "Fanuslar", price: 275, image: "fanus_armut.jpg" },
  { id: 4, name: "Silindir Vazo (Büyük)", category: "Fanuslar", price: 300, image: "fanus_silindir.jpg" },
  { id: 5, name: "Asılabilir Top Fanus", category: "Fanuslar", price: 180, image: "fanus_top.jpg" },
  { id: 6, name: "Yumurta Cam Teraryum", category: "Fanuslar", price: 220, image: "fanus_yumurta.jpg" },
  { id: 7, name: "Altıgen Kapaklı Kutu", category: "Fanuslar", price: 650, image: "fanus_ucgen.jpg" },
  { id: 8, name: "Mantar Kapaklı Şişe", category: "Fanuslar", price: 350, image: "fanus_sise.jpg" },
  { id: 9, name: "Diyagonal Ağızlı Kase", category: "Fanuslar", price: 190, image: "fanus_diyagonal.jpg" },
  { id: 10, name: "Kadeh Ayaklı Fanus", category: "Fanuslar", price: 400, image: "fanus_kadeh.jpg" },
  { id: 11, name: "Sukulent Mix (3'lü)", category: "Bitkiler", price: 150, image: "bitki_sukulent.jpg" },
  { id: 12, name: "Fittonia (Kırmızı)", category: "Bitkiler", price: 85, image: "bitki_fittonia.jpg" },
  { id: 13, name: "Canlı Yosun (Moss)", category: "Bitkiler", price: 120, image: "bitki_moss.jpg" },
  { id: 14, name: "Tillandsia (Hava Bitkisi)", category: "Bitkiler", price: 200, image: "bitki_tillandsia.jpg" },
  { id: 15, name: "Minyatür Kaktüs Seti", category: "Bitkiler", price: 180, image: "bitki_kaktus.jpg" },
  { id: 16, name: "Pilea (Çin Parası)", category: "Bitkiler", price: 110, image: "bitki_pilea.jpg" },
  { id: 17, name: "Echeveria Rozet", category: "Bitkiler", price: 60, image: "bitki_echeveria.jpg" },
  { id: 18, name: "Teraryum Sarmaşığı", category: "Bitkiler", price: 95, image: "bitki_sarmasik.jpg" },
  { id: 19, name: "Tavşan Kulağı Kaktüs", category: "Bitkiler", price: 75, image: "bitki_tavsan.jpg" },
  { id: 20, name: "Haworthia Zebra", category: "Bitkiler", price: 90, image: "bitki_zebra.jpg" },
  { id: 21, name: "Teraryum Toprağı (2L)", category: "Malzemeler", price: 80, image: "malz_toprak.jpg" },
  { id: 22, name: "Aktif Karbon", category: "Malzemeler", price: 60, image: "malz_karbon.jpg" },
  { id: 23, name: "Lav Kırığı (Drenaj)", category: "Malzemeler", price: 50, image: "malz_lav.jpg" },
  { id: 24, name: "Beyaz Dekor Kumu", category: "Malzemeler", price: 45, image: "malz_kum_beyaz.jpg" },
  { id: 25, name: "Sphagnum Yosunu", category: "Malzemeler", price: 110, image: "malz_sphagnum.jpg" },
  { id: 26, name: "Doğal Dere Çakılı", category: "Malzemeler", price: 40, image: "malz_cakil.jpg" },
  { id: 27, name: "Mavi Kristal Kum", category: "Malzemeler", price: 55, image: "malz_kum_mavi.jpg" },
  { id: 28, name: "Vermikülit", category: "Malzemeler", price: 35, image: "malz_vermikulit.jpg" },
  { id: 29, name: "Ağaç Kabuğu (Bark)", category: "Malzemeler", price: 50, image: "malz_kabuk.jpg" },
  { id: 30, name: "Kuru Yosun (Dekor)", category: "Malzemeler", price: 90, image: "malz_kuru_yosun.jpg" },
  { id: 31, name: "Minyatür Ahşap Ev", category: "Dekor", price: 45, image: "dekor_ev.jpg" },
  { id: 32, name: "Yapay Göl Jeli", category: "Dekor", price: 120, image: "dekor_jel.jpg" },
  { id: 33, name: "Mantar Seti (3'lü)", category: "Dekor", price: 30, image: "dekor_mantar.jpg" },
  { id: 34, name: "Oturan Çift Figürü", category: "Dekor", price: 55, image: "dekor_cift.jpg" },
  { id: 35, name: "Sokak Lambası", category: "Dekor", price: 40, image: "dekor_lamba.jpg" },
  { id: 36, name: "Driftwood (Yalı Dalı)", category: "Dekor", price: 85, image: "dekor_dal.jpg" },
  { id: 37, name: "Yapay Çim Parçası", category: "Dekor", price: 25, image: "dekor_cim.jpg" },
  { id: 38, name: "Taş Köprü", category: "Dekor", price: 50, image: "dekor_kopru.jpg" },
  { id: 39, name: "Beyaz Çit", category: "Dekor", price: 35, image: "dekor_cit.jpg" },
  { id: 40, name: "Tavşan Figürü", category: "Dekor", price: 30, image: "dekor_tavsan.jpg" },
  { id: 41, name: "Teraryum Cımbızı (30cm)", category: "Bakım", price: 110, image: "bakim_cimbiz.jpg" },
  { id: 42, name: "Su Spreyi (Cam)", category: "Bakım", price: 150, image: "bakim_sprey.jpg" },
  { id: 43, name: "Mini Tırmık & Kürek", category: "Bakım", price: 90, image: "bakim_set.jpg" },
  { id: 44, name: "Budama Makası", category: "Bakım", price: 130, image: "bakim_makas.jpg" },
  { id: 45, name: "Temizleme Fırçası", category: "Bakım", price: 40, image: "bakim_firca.jpg" },
  { id: 46, name: "Sıvı Gübre", category: "Bakım", price: 75, image: "bakim_gubre.jpeg" },
  { id: 47, name: "Kurulum Eldiveni", category: "Bakım", price: 25, image: "bakim_eldiven.jpg" },
  { id: 48, name: "Sulama Damlalığı", category: "Bakım", price: 60, image: "bakim_damlalik.jpg" },
  { id: 49, name: "Bitki Yapıştırıcısı", category: "Bakım", price: 95, image: "bakim_yapistirici.jpg" },
  { id: 50, name: "Kurulum Rehberi", category: "Bakım", price: 50, image: "bakim_kitap.jpeg" },
  { id: 51, name: "Amazon Ormanı Başlangıç Seti", category: "Setler", price: 449.99, image: "https://dekoratif.dyo.com.tr/uploads/2023/10/teraryum.jpg" },
  { id: 52, name: "Nordik Canlı Yosun Paketi", category: "Bitkiler", price: 79.50, image: "https://productimages.hepsiburada.net/s/316/375-375/110000309504872.jpg" },
  { id: 53, name: "Sahra Serisi Beyaz Kum", category: "Malzemeler", price: 59.90, image: "https://www.akvaryumexpress.com/uploads/urunler/crystl-pro-kum-beyaz-kalsiyum-karbonotlu-8saxg.jpg" },
  { id: 54, name: "Geometrik Kristal Fanus", category: "Fanuslar", price: 299.00, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiXmrVSwvVPRaAFvS0LYirNDK9ZWxGVO_XPw&s" },
  { id: 55, name: "Tropikal Bonsai Ağacı", category: "Bitkiler", price: 850.50, image: "https://www.cicekdiyari.com/kresim/ginseng-bonsai-bahce%20.JPG" },
  { id: 56, name: "Mistik Orman Figür Seti", category: "Dekor", price: 124.95, image: "https://www.marmaracicek.com/urunler/orman-evi-teraryum--8582.JPG" },
  { id: 57, name: "LED Aydınlatmalı Kapak", category: "Bakım", price: 189.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwjBvQBMKUZ_AN8R4JBX-gAgShAv_wxuGsw&s" },
  { id: 58, name: "Antik Nehir Çakıl Taşları", category: "Malzemeler", price: 45.00, image: "https://m.media-amazon.com/images/I/81d+DV9qPmL._UF350,350_QL80_.jpg" }
];

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([
    { ...MASTER_PRODUCTS[0], stock: 10 },
    { ...MASTER_PRODUCTS[50], stock: 5 } // Bir adet internetten gelen ürün örnek olsun
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // KRİTİK FONKSİYON: Resim yolunu kontrol eder (ISO 25010: Veri Güvenirliği)
  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/150";
    return image.startsWith("http") ? image : `/images/${image}`;
  };

  useEffect(() => {
    if (searchTerm.length >= 2 && !selectedProduct) {
      const filtered = MASTER_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, selectedProduct]);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setSuggestions([]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      if (inventory.find(item => item.id === selectedProduct.id)) {
        alert("Bu ürün zaten envanterde mevcut!");
        return;
      }
      setInventory([{ ...selectedProduct, stock: 10 }, ...inventory]);
      setSearchTerm('');
      setSelectedProduct(null);
    }
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f0f4f0', minHeight: '100vh' }}>
      <div className="container bg-white p-4 shadow-lg rounded-4">
        
        <div className="text-center mb-5 border-bottom pb-4">
          <h2 className="fw-bold" style={{ color: '#2d4a27' }}>
            <i className="bi bi-gear-fill me-2"></i>Merkezi Envanter Sistemi
          </h2>
          <p className="text-muted small">Tüm Koleksiyon (58 Ürün) Senkronize Edildi</p>
        </div>

        {/* AKILLI ÜRÜN ARAMA FORMU */}
        <div className="card border-0 bg-light p-4 mb-5 rounded-4 shadow-sm">
          <form className="row g-3 align-items-end" onSubmit={handleAdd}>
            <div className="col-md-5 position-relative">
              <label className="small fw-bold mb-2 text-secondary">ÜRÜN ARA</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 rounded-start-pill"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 rounded-end-pill px-3" 
                  placeholder="Koleksiyondan ürün ismi..." 
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setSelectedProduct(null);}}
                />
              </div>

              {suggestions.length > 0 && (
                <div className="list-group position-absolute w-100 mt-1 shadow-lg border-0 rounded-3" style={{ zIndex: 1050 }}>
                  {suggestions.map(p => (
                    <button key={p.id} type="button" className="list-group-item list-group-item-action" onClick={() => handleSelect(p)}>
                      <div className="d-flex align-items-center">
                        <img src={getImagePath(p.image)} width="30" height="30" className="rounded me-2" alt="" />
                        <span className="small">{p.name} <span className="text-success fw-bold ms-2">{p.price} TL</span></span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-md-2 text-center">
              <label className="small fw-bold mb-2 text-secondary">BİRİM FİYAT</label>
              <div className="form-control rounded-pill bg-white fw-bold text-success border-0 shadow-sm py-2">
                {selectedProduct ? `${selectedProduct.price} TL` : "—"}
              </div>
            </div>

            {/* GÖRSEL ÖNİZLEME (OTO) */}
            <div className="col-md-3 text-center">
              <label className="small fw-bold mb-2 text-secondary">GÖRSEL ÖNİZLEME</label>
              <div className="d-flex justify-content-center align-items-center border rounded-4 bg-white shadow-sm" style={{ height: '85px', overflow: 'hidden' }}>
                {selectedProduct ? (
                  <img src={getImagePath(selectedProduct.image)} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                ) : (
                  <i className="bi bi-image text-muted opacity-25 fs-2"></i>
                )}
              </div>
            </div>

            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm" disabled={!selectedProduct} style={{ backgroundColor: '#2d4a27' }}>
                ENVANTERE EKLE
              </button>
            </div>
          </form>
        </div>

        {/* TABLO */}
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr className="small text-uppercase">
                <th>Ürün Bilgisi</th>
                <th className="text-center">Fiyat</th>
                <th className="text-center" style={{ width: '150px' }}>Stok</th>
                <th className="text-end">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id} className="border-bottom">
                  <td>
                    <div className="d-flex align-items-center py-2">
                      <img src={getImagePath(item.image)} alt="" className="rounded-3 shadow-sm me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      <div>
                        <div className="fw-bold small">{item.name}</div>
                        <span className="badge bg-light text-secondary fw-normal" style={{ fontSize: '10px' }}>{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center fw-bold">{item.price} TL</td>
                  <td className="text-center">
                    <input 
                      type="number" 
                      className={`form-control form-control-sm text-center fw-bold ${item.stock < 10 ? 'text-danger border-danger' : ''}`}
                      value={item.stock}
                      onChange={(e) => setInventory(inventory.map(p => p.id === item.id ? {...p, stock: parseInt(e.target.value) || 0} : p))}
                    />
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger border-0" onClick={() => setInventory(inventory.filter(p => p.id !== item.id))}>
                      <i className="bi bi-trash3-fill"></i>
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

export default AdminDashboard;