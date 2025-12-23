// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

// Swiper stilleri
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

// FAZ 1 & 3: İçerikle Tam Uyumlu ve Kuruş Hassasiyetli Ürün Listesi [cite: 176, 184]
const mockProducts = [
  { 
    id: 1, 
    name: "Amazon Ormanı Başlangıç Seti", 
    description: "Vahşi Amazon ruhunu yansıtan bitki ve toprak kiti.", 
    price: 449.99, 
    image: "https://dekoratif.dyo.com.tr/uploads/2023/10/teraryum.jpg", 
    stock: 2 
  },
  { 
    id: 2, 
    name: "Nordik Canlı Yosun Paketi", 
    description: "İskandinav ormanlarından toplanmış uzun ömürlü canlı yosunlar.", 
    price: 79.50, 
    image: "https://productimages.hepsiburada.net/s/316/375-375/110000309504872.jpg", 
    stock: 12 
  },
  { 
    id: 3, 
    name: "Sahra Serisi Beyaz Kum", 
    price: 59.90, 
    description: "Yüksek drenaj özellikli, sterilize edilmiş dekoratif kum.", 
    image: "https://www.akvaryumexpress.com/uploads/urunler/crystl-pro-kum-beyaz-kalsiyum-karbonotlu-8saxg.jpg", 
    stock: 3 
  },
  { 
    id: 4, 
    name: "Geometrik Kristal Fanus", 
    price: 299.00, 
    description: "El yapımı, kurşunsuz kristal camdan üretilmiş modern tasarım.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiXmrVSwvVPRaAFvS0LYirNDK9ZWxGVO_XPw&s", 
    stock: 8 
  },
  { 
    id: 5, 
    name: "Tropikal Bonsai Ağacı", 
    price: 850.50, 
    description: "Teraryum içi ekosisteme uyumlu, cüce tropik ağaç türü.", 
    image: "https://www.cicekdiyari.com/kresim/ginseng-bonsai-bahce%20.JPG", 
    stock: 1 
  },
  { 
    id: 6, 
    name: "Mistik Orman Figür Seti", 
    price: 124.95, 
    description: "El boyaması minyatür mantar ve peri evi figürleri.", 
    image: "https://www.marmaracicek.com/urunler/orman-evi-teraryum--8582.JPG", 
    stock: 20 
  },
  { 
    id: 7, 
    name: "LED Aydınlatmalı Kapak", 
    price: 189.90, 
    description: "Fotosentezi destekleyen, USB bağlantılı akıllı ışık sistemi.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwjBvQBMKUZ_AN8R4JBX-gAgShAv_wxuGsw&s", 
    stock: 10 
  },
  { 
    id: 8, 
    name: "Antik Nehir Çakıl Taşları", 
    price: 45.00, 
    description: "Doğal aşınmış, farklı boyutlarda dere çakılları.", 
    image: "https://m.media-amazon.com/images/I/81d+DV9qPmL._UF350,350_QL80_.jpg", 
    stock: 25 
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const [countdown, setCountdown] = useState({ hours: "05", minutes: "00", seconds: "00" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => ({...prev, seconds: String(Math.max(0, prev.seconds - 1)).padStart(2, '0')}));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{backgroundColor: '#fcfdfc'}}>
      {/* 1. BÖLÜM: HERO AREA */}
      <div className="container-fluid p-0 position-relative" style={{ height: '85vh', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1920" 
          className="w-100 h-100" 
          style={{ objectFit: 'cover', filter: 'brightness(0.6)' }} 
          alt="Main Banner" 
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100">
          <h6 className="text-uppercase mb-3" style={{ letterSpacing: '5px', color: '#a8d5ba' }}>Doğayı evinize taşıyın</h6>
          <h1 className="display-2 fw-bold mb-4">Yaşayan Sanat Eserleri</h1>
          <p className="lead mb-5 px-5">El işçiliği ile hazırlanan minyatür ekosistemler ve tasarım aksesuarları.</p>
          <a href="#shop" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">Koleksiyonu Keşfet</a>
        </div>
      </div>

    {/* 2. BÖLÜM: GÜVEN SAYAÇLARI */}
<div className="container my-5 py-4">
  <div className="row g-4 text-center">
    {[
      {val: "0.1", label: "Saniyede Hızlı Sipariş", icon: "bi-lightning-charge", unit: ""},
      {val: "100", label: "Güvenli Ödeme Garantisi", icon: "bi-shield-check", unit: "%"},
      {val: "3", label: "Adımda Kolay Alışveriş", icon: "bi-box-seam", unit: ""},
      {val: "7/24", label: "Kesintisiz Destek", icon: "bi-headset", unit: ""}
    ].map((item, i) => (
      <div key={i} className="col-md-3">
        <div className="p-4 rounded-4 shadow-sm bg-white border-bottom border-4 border-success">
          <i className={`bi ${item.icon} fs-1 text-success mb-3`}></i>
          <h3 className="fw-bold mb-0">
            {/* Mantıksal kontrol: Ünite varsa değerin önüne veya arkasına uygun şekilde yerleştirir */}
            {item.unit === "%" ? `%${item.val}` : `${item.val}${item.unit}`}
          </h3>
          <p className="text-muted small text-uppercase fw-semibold mt-2">{item.label}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* 3. BÖLÜM: ÖNE ÇIKAN KATEGORİLER (Güncel Görseller) */}
      <section className="py-5" style={{backgroundColor: '#f4f9f4'}}>
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold display-5">İlham Veren Köşeler</h2>
              <p className="text-muted">Her bütçeye ve zevke uygun teraryum dünyası.</p>
            </div>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{ 768: { slidesPerView: 3 } }}
            navigation={true}
            modules={[Navigation]}
          >
            {[
              { title: "Cam Fanuslar", img: "https://www.cicekfuryasi.com/Upload/hayalimdeki-ask-canli-teraryum-ortaboy-fanus9_n.jpg" },
              { title: "Canlı Bitkiler", img: "https://www.asortie.com/blogs/uploads/en_haberler/canli-bitkiler-ile-ruhunuzu-dinlendirin.jpg" },
              { title: "Dekoratif Taşlar", img: "https://www.ekodoga.com/idea/je/02/myassets/products/870/granit-tas2.png?revision=1743240441" },
              { title: "Bakım Kitleri", img: "https://sc04.alicdn.com/kf/H67fbdfe449f74e398f62ea2595ae6a2cG.jpg" }
            ].map((cat, i) => (
              <SwiperSlide key={i}>
                <div className="card border-0 rounded-4 overflow-hidden shadow-sm">
                  <img src={cat.img} className="card-img-top" style={{height: '400px', objectFit: 'cover'}} alt={cat.title} />
                  <div className="card-body text-center bg-white">
                    <h5 className="fw-bold mb-0">{cat.title}</h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 4. BÖLÜM: ÜRÜN VİTRİNİ (Stok Uyarıları ile) [cite: 177, 181] */}
      <div id="shop" className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold">Haftanın Favorileri</h2>
          <div className="mx-auto bg-success" style={{height: '3px', width: '60px'}}></div>
        </div>
        <div className="row g-4">
          {mockProducts.map((urun) => (
            <div key={urun.id} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                {/* Dinamik Stok Uyarısı (Faz 2: Hata Koruması)  */}
                {urun.stock > 0 && urun.stock <= 3 && (
                  <span className="position-absolute top-0 end-0 bg-warning text-dark m-2 px-2 py-1 rounded-pill small fw-bold" style={{zIndex: 2}}>
                    Son {urun.stock} ürün!
                  </span>
                )}
                <div className="position-relative overflow-hidden">
                  <img src={urun.image} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt={urun.name} />
                  {urun.stock === 0 && <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 text-white fw-bold" style={{zIndex: 3}}>TÜKENDİ</div>}
                </div>
                <div className="card-body">
                  <h6 className="fw-bold mb-1">{urun.name}</h6>
                  <p className="text-muted small mb-3" style={{height: '40px', overflow: 'hidden'}}>{urun.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">{urun.price.toFixed(2)} TL</span>
                    <button 
                      className="btn btn-success btn-sm rounded-pill px-3"
                      disabled={urun.stock === 0}
                      onClick={() => addToCart(urun)}
                    >
                      <i className="bi bi-cart-plus me-1"></i> Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BÖLÜM: EKİP (Gerçek Görsellerle) */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Küratörlerimiz</h2>
          <p className="text-muted">Doğayı tasarımla buluşturan vizyoner ekibimiz.</p>
        </div>
        <div className="row justify-content-center">
          {[
            { name: 'Beyzanur Bayır', role: 'Müşteri Deneyimi Direktörü', img: 'https://media.licdn.com/dms/image/v2/D4D03AQF9qRGonfoVZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715858533756?e=2147483647&v=beta&t=2ebXlWwnsDd_tyJlXQ8bIOf14lkMT9x1W3HaA3U9CZA' },
            { name: 'Ahsen Berra Özdoğan', role: 'Baş Tasarımcı ve Küratör', img: 'https://media.licdn.com/dms/image/v2/D4D03AQFhohu67owvZQ/profile-displayphoto-shrink_200_200/B4DZQ9YGw9G0AY-/0/1736196518178?e=2147483647&v=beta&t=wIgm2EEK9z2SOMeIjjWifpLGJTJieaRC-lUb0eYG79g' },
            { name: 'Helin Özalkan', role: 'Operasyon ve Kalite Lideri', img: 'data:image/jpeg;base64,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' }
          ].map((person, idx) => (
            <div key={idx} className="col-md-3 text-center mb-4">
               <img src={person.img} className="rounded-circle mb-3 shadow" style={{ width: '180px', height: '180px', objectFit: 'cover', border: '5px solid #fff' }} alt={person.name} />
               <h5 className="fw-bold mb-1">{person.name}</h5>
               <p className="text-success small fw-bold">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. BÖLÜM: MÜŞTERİ DENEYİMLERİ */}
      <div className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h2 className="fw-bold">Neden Biz?</h2>
              <p className="text-muted">Bizi tercih eden mutlu sanatseverlerin yorumları.</p>
            </div>
            <div className="col-md-8">
              <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="my-swiper" style={{width: '280px', height: '320px'}}>
                <SwiperSlide className="bg-light rounded-4 p-4 shadow-sm border">
                   <div className="text-warning mb-2"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
                   <p className="small italic text-dark">"Kargolama hızı ve paketleme özeni şaşırtıcıydı. Ürünlerim sapasağlam ulaştı."</p>
                   <h6 className="fw-bold mt-4">Caner Y.</h6>
                   <p className="text-muted small">Mimar</p>
                </SwiperSlide>
                <SwiperSlide className="bg-light rounded-4 p-4 shadow-sm border">
                   <div className="text-warning mb-2"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
                   <p className="small italic text-dark">"Arayüz o kadar kolay ki siparişimi saniyeler içinde tamamladım. Harika tasarım!"</p>
                   <h6 className="fw-bold mt-4">Selin M.</h6>
                   <p className="text-muted small">Grafik Tasarımcı</p>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* 7. BÖLÜM: PRESTİJLİ FOOTER */}
<footer className="bg-dark text-white pt-5 pb-3">
  <div className="container">
    <div className="row g-4 mb-5">
      <div className="col-md-4">
        {/* Başlık ve Metin Beyaz */}
        <h4 className="fw-bold text-white mb-3">Terrarium Lab.</h4>
        <p className="text-white-50 small">Modern yaşam alanları için sürdürülebilir minyatür ekosistemler tasarlıyoruz.</p>
      </div>
      
      <div className="col-md-4">
        <h6 className="fw-bold text-white mb-3">Mağaza & Atölye</h6>
        <div className="small text-white">
          <p className="mb-2 text-white">
            <i className="bi bi-geo-alt-fill me-2 text-success"></i> Botanik Sokak, No: 12/A
          </p>
          <p className="mb-2 text-white">Kuzguncuk, Üsküdar / İstanbul</p>
          <p className="mb-0 text-white">
            <i className="bi bi-telephone-fill me-2 text-success"></i> +90 (216) 123 45 67
          </p>
        </div>
      </div>

      <div className="col-md-4 text-md-end">
        <h6 className="fw-bold text-white mb-3">Bizi Takip Edin</h6>
        <div className="d-flex gap-3 justify-content-md-end fs-4">
          {/* İkonlar Beyaz, Üzerine Gelince Yeşil Olur */}
          <i className="bi bi-instagram text-white" style={{cursor: 'pointer'}}></i>
          <i className="bi bi-pinterest text-white" style={{cursor: 'pointer'}}></i>
          <i className="bi bi-twitter text-white" style={{cursor: 'pointer'}}></i>
        </div>
      </div>
    </div>
    <hr className="border-secondary" />
    <p className="text-center text-white-50 small mt-4">© 2025 Butik Teraryum Sanat Atölyesi. Tüm hakları saklıdır.</p>
  </div>
</footer>
    </div>
  );
};

export default Home;