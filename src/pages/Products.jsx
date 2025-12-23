// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext'; // YENİ: Context importu

// TERARYUM ÜRÜN VERİLERİ
const allProducts = [
  // 1. KATEGORİ: FANUSLAR
  { id: 1, name: "Geometrik Prizma Fanus", category: "Fanuslar", rating: 4.8, description: "El yapımı bakır çıtalı modern teraryum fanusu.", price: 850, image: "fanus_geometrik.jpg" },
  { id: 2, name: "Elma Cam Fanus (Orta)", category: "Fanuslar", rating: 4.2, description: "Klasik elma formunda üfleme cam fanus.", price: 250, image: "fanus_elma.jpg" },
  { id: 3, name: "Armut Cam Fanus", category: "Fanuslar", rating: 4.5, description: "Zarif armut tasarımıyla şık bir görünüm.", price: 275, image: "fanus_armut.jpg" },
  { id: 4, name: "Silindir Vazo (Büyük)", category: "Fanuslar", rating: 3.9, description: "Minimalist tasarımlar için yüksek silindir cam.", price: 300, image: "fanus_silindir.jpg" },
  { id: 5, name: "Asılabilir Top Fanus", category: "Fanuslar", rating: 4.1, description: "Makrome iplerle asmaya uygun, düz tabanlı.", price: 180, image: "fanus_top.jpg" },
  { id: 6, name: "Yumurta Cam Teraryum", category: "Fanuslar", rating: 4.6, description: "Oval hatlarıyla bitkiler için geniş alan sağlar.", price: 220, image: "fanus_yumurta.jpg" },
  { id: 7, name: "Altıgen Kapaklı Kutu", category: "Fanuslar", rating: 5.0, description: "Geometrik cam kapaklı saklama ve sergileme kutusu.", price: 650, image: "fanus_ucgen.jpg" },
  { id: 8, name: "Mantar Kapaklı Şişe", category: "Fanuslar", rating: 4.3, description: "Nemli ekosistemler (Mossarium) için ideal.", price: 350, image: "fanus_sise.jpg" },
  { id: 9, name: "Diyagonal Ağızlı Kase", category: "Fanuslar", rating: 4.0, description: "Kolay müdahale edilebilir, eğik ağızlı cam.", price: 190, image: "fanus_diyagonal.jpg" },
  { id: 10, name: "Kadeh Ayaklı Fanus", category: "Fanuslar", rating: 4.7, description: "Yüksek ayaklı, sunum için gösterişli fanus.", price: 400, image: "fanus_kadeh.jpg" },

  // 2. KATEGORİ: BİTKİLER
  { id: 11, name: "Sukulent Mix (3'lü)", category: "Bitkiler", rating: 4.9, description: "Teraryum uyumlu 3 farklı mini sukulent.", price: 150, image: "bitki_sukulent.jpg" },
  { id: 12, name: "Fittonia (Kırmızı)", category: "Bitkiler", rating: 4.4, description: "Nemli ortamları seven kırmızı damarlı yapraklar.", price: 85, image: "bitki_fittonia.jpg" },
  { id: 13, name: "Canlı Yosun (Moss)", category: "Bitkiler", rating: 4.1, description: "Teraryum zeminini kaplamak için canlı plaka yosun.", price: 120, image: "bitki_moss.jpg" },
  { id: 14, name: "Tillandsia (Hava Bitkisi)", category: "Bitkiler", rating: 4.8, description: "Toprağa ihtiyaç duymayan özel hava bitkisi.", price: 200, image: "bitki_tillandsia.jpg" },
  { id: 15, name: "Minyatür Kaktüs Seti", category: "Bitkiler", rating: 4.5, description: "Dikenli ve dayanıklı 5'li mini kaktüs paketi.", price: 180, image: "bitki_kaktus.jpg" },
  { id: 16, name: "Pilea (Çin Parası)", category: "Bitkiler", rating: 4.2, description: "Yuvarlak yapraklı, şans getirdiğine inanılan bitki.", price: 110, image: "bitki_pilea.jpg" },
  { id: 17, name: "Echeveria Rozet", category: "Bitkiler", rating: 4.6, description: "Gül formunda, etli yapraklı popüler sukulent.", price: 60, image: "bitki_echeveria.jpg" },
  { id: 18, name: "Teraryum Sarmaşığı", category: "Bitkiler", rating: 3.8, description: "Ficus Pumila, hızlı yayılan minik yapraklı sarmaşık.", price: 95, image: "bitki_sarmasik.jpg" },
  { id: 19, name: "Tavşan Kulağı Kaktüs", category: "Bitkiler", rating: 4.7, description: "Opuntia microdasys, sevimli görünümüyle popüler.", price: 75, image: "bitki_tavsan.jpg" },
  { id: 20, name: "Haworthia Zebra", category: "Bitkiler", rating: 4.3, description: "Çizgili desenleriyle dikkat çeken dayanıklı tür.", price: 90, image: "bitki_zebra.jpg" },

  // 3. KATEGORİ: MALZEMELER
  { id: 21, name: "Teraryum Toprağı (2L)", category: "Malzemeler", rating: 4.8, description: "Sukulent ve kaktüsler için özel geçirgen karışım.", price: 80, image: "malz_toprak.jpg" },
  { id: 22, name: "Aktif Karbon", category: "Malzemeler", rating: 4.5, description: "Bakteri ve koku oluşumunu engelleyen filtrasyon.", price: 60, image: "malz_karbon.jpg" },
  { id: 23, name: "Lav Kırığı (Drenaj)", category: "Malzemeler", rating: 4.6, description: "Taban drenajı için volkanik kırmızı taş.", price: 50, image: "malz_lav.jpg" },
  { id: 24, name: "Beyaz Dekor Kumu", category: "Malzemeler", rating: 4.2, description: "İnce taneli, parlak beyaz silis kumu.", price: 45, image: "malz_kum_beyaz.jpg" },
  { id: 25, name: "Sphagnum Yosunu", category: "Malzemeler", rating: 4.7, description: "Su tutma kapasitesi yüksek kuru yosun lifleri.", price: 110, image: "malz_sphagnum.jpg" },
  { id: 26, name: "Doğal Dere Çakılı", category: "Malzemeler", rating: 4.1, description: "Nehir yatağından toplanmış yuvarlak hatlı taşlar.", price: 40, image: "malz_cakil.jpg" },
  { id: 27, name: "Mavi Kristal Kum", category: "Malzemeler", rating: 4.0, description: "Su efekti vermek için cam kırığı görünümlü kum.", price: 55, image: "malz_kum_mavi.jpg" },
  { id: 28, name: "Vermikülit", category: "Malzemeler", rating: 4.4, description: "Toprağı havalandıran ve nem dengesini sağlayan mineral.", price: 35, image: "malz_vermikulit.jpg" },
  { id: 29, name: "Ağaç Kabuğu (Bark)", category: "Malzemeler", rating: 4.3, description: "Zemin örtücü doğal çam kabukları.", price: 50, image: "malz_kabuk.jpg" },
  { id: 30, name: "Kuru Yosun (Dekor)", category: "Malzemeler", rating: 4.6, description: "Bakım gerektirmeyen şoklanmış yeşil yosun.", price: 90, image: "malz_kuru_yosun.jpg" },

  // 4. KATEGORİ: DEKOR
  { id: 31, name: "Minyatür Ahşap Ev", category: "Dekor", rating: 4.9, description: "El boyaması sevimli minyatür dağ evi.", price: 45, image: "dekor_ev.jpg" },
  { id: 32, name: "Yapay Göl Jeli", category: "Dekor", rating: 4.1, description: "Isıtılarak sıvılaşan, donunca su görünümü veren jel.", price: 120, image: "dekor_jel.jpg" },
  { id: 33, name: "Mantar Seti (3'lü)", category: "Dekor", rating: 4.8, description: "Kırmızı benekli minik mantar figürleri.", price: 30, image: "dekor_mantar.jpg" },
  { id: 34, name: "Oturan Çift Figürü", category: "Dekor", rating: 4.5, description: "Romantik teraryumlar için bankta oturan çift.", price: 55, image: "dekor_cift.jpg" },
  { id: 35, name: "Sokak Lambası", category: "Dekor", rating: 4.2, description: "Vintage görünümlü minyatür sokak aydınlatması.", price: 40, image: "dekor_lamba.jpg" },
  { id: 36, name: "Driftwood (Yalı Dalı)", category: "Dekor", rating: 4.7, description: "Doğal formlu, sterilize edilmiş dekoratif dal.", price: 85, image: "dekor_dal.jpg" },
  { id: 37, name: "Yapay Çim Parçası", category: "Dekor", rating: 3.9, description: "Bahçe görünümü için kesilebilir çim halı.", price: 25, image: "dekor_cim.jpg" },
  { id: 38, name: "Taş Köprü", category: "Dekor", rating: 4.6, description: "Reçineden yapılmış eski taş köprü modeli.", price: 50, image: "dekor_kopru.jpg" },
  { id: 39, name: "Beyaz Çit", category: "Dekor", rating: 4.3, description: "Esnek yapılı, şekil verilebilir minyatür çit.", price: 35, image: "dekor_cit.jpg" },
  { id: 40, name: "Tavşan Figürü", category: "Dekor", rating: 4.8, description: "Beyaz sevimli minyatür tavşan biblosu.", price: 30, image: "dekor_tavsan.jpg" },

  // 5. KATEGORİ: BAKIM
  { id: 41, name: "Teraryum Cımbızı (30cm)", category: "Bakım", rating: 4.9, description: "Dar ağızlı fanuslar için uzun, eğri uçlu cımbız.", price: 110, image: "bakim_cimbiz.jpg" },
  { id: 42, name: "Su Spreyi (Cam)", category: "Bakım", rating: 4.7, description: "Bitkileri nemlendirmek için şık cam sprey şişesi.", price: 150, image: "bakim_sprey.jpg" },
  { id: 43, name: "Mini Tırmık & Kürek", category: "Bakım", rating: 4.4, description: "3 parçalı ahşap saplı mini bahçıvan seti.", price: 90, image: "bakim_set.jpg" },
  { id: 44, name: "Budama Makası", category: "Bakım", rating: 4.6, description: "İnce dallar ve yapraklar için hassas makas.", price: 130, image: "bakim_makas.jpg" },
  { id: 45, name: "Temizleme Fırçası", category: "Bakım", rating: 4.1, description: "Yaprak üzerindeki tozları ve toprağı temizlemek için.", price: 40, image: "bakim_firca.jpg" },
  { id: 46, name: "Sıvı Gübre", category: "Bakım", rating: 4.3, description: "Yeşil yapraklı bitkiler için besin takviyesi.", price: 75, image: "bakim_gubre.jpeg" },
  { id: 47, name: "Kurulum Eldiveni", category: "Bakım", rating: 4.0, description: "Kaktüs dikimi için koruyucu nitril eldiven.", price: 25, image: "bakim_eldiven.jpg" },
  { id: 48, name: "Sulama Damlalığı", category: "Bakım", rating: 4.5, description: "Kök dibine hassas su vermek için uzun uçlu şişe.", price: 60, image: "bakim_damlalik.jpg" },
  { id: 49, name: "Bitki Yapıştırıcısı", category: "Bakım", rating: 4.2, description: "Hava bitkilerini sabitlemek için bitki dostu jel.", price: 95, image: "bakim_yapistirici.jpg" },
  { id: 50, name: "Kurulum Rehberi", category: "Bakım", rating: 4.8, description: "Adım adım teraryum yapımını anlatan kitapçık.", price: 50, image: "bakim_kitap.jpeg" },
];

const categories = ["Tümü", "Fanuslar", "Bitkiler", "Malzemeler", "Dekor", "Bakım"];

const Products = () => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites(); // YENİ: Favori fonksiyonlarını çektik

  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("varsayilan");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

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

  useEffect(() => {
    let tempProducts = [...allProducts];
    if (selectedCategory !== "Tümü") {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }
    if (sortOption === "artan-fiyat") tempProducts.sort((a, b) => a.price - b.price);
    else if (sortOption === "azalan-fiyat") tempProducts.sort((a, b) => b.price - a.price);
    else if (sortOption === "isim-az") tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "isim-za") tempProducts.sort((a, b) => b.name.localeCompare(a.name));

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
          
          {/* Sidebar */}
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

          {/* Ürün Listesi */}
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
                      
                      {/* Resim Alanı ve FAVORİ BUTONU */}
                      <div className="position-relative bg-white text-center">
                        <Link to={`/product/${urun.id}`}>
                          <img 
                            src={`/images/${urun.image}`} 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x300?text=Urun+Resmi"; }}
                            className="card-img-top" 
                            style={{ 
                              height: '250px', 
                              objectFit: 'cover', 
                              width: '100%', 
                              display: 'block' 
                            }} 
                            alt={urun.name} 
                          />
                        </Link>
                        
                        {/* YENİ EKLENEN KALP BUTONU */}
                        <button 
                          className="btn btn-light rounded-circle shadow-sm position-absolute top-0 end-0 m-2 p-2 d-flex align-items-center justify-content-center"
                          style={{ width: '35px', height: '35px', zIndex: 10 }}
                          onClick={(e) => {
                            e.preventDefault(); // Link'e gitmeyi engelle
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

                        <button 
                          className="btn text-white w-100 py-2 btn-sm" 
                          style={{ backgroundColor: themeColor, borderRadius: '15px', fontWeight: '600' }}
                          onClick={() => addToCart(urun)}
                        >
                          Sepete Ekle
                        </button>
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