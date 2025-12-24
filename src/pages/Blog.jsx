// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

// Sahte Blog Verileri
const blogPosts = [
  { id: 1, title: "Teraryum Bakımının 5 Altın Kuralı", cat: "Bakım Rehberi", date: "24 Ara 2025", img: "bakim_kitap.jpeg", desc: "Bitkilerinizin uzun ömürlü olması için dikkat etmeniz gereken püf noktalar." },
  { id: 2, title: "Evde Kendi Ekosistemini Kur", cat: "DIY", date: "20 Mart 2024", img: "fanus_geometrik.jpg", desc: "Adım adım kendi fanusunuzu nasıl tasarlarsınız? Malzemeler ve teknikler." },
  { id: 3, title: "Sukulentler Neden Çürür?", cat: "Bitki Sağlığı", date: "15 Ara 2023", img: "bitki_sukulent.jpg", desc: "En sık yapılan sulama hataları ve sukulentleri kurtarma yolları." },
  { id: 4, title: "Ofis Masası İçin En İyi Bitkiler", cat: "Dekorasyon", date: "10 Ara 2023", img: "fanus_silindir.jpg", desc: "Az ışıkta yaşayan ve motivasyonu artıran ofis dostu bitkiler." },
  { id: 5, title: "Yosun Duvarı Nasıl Yapılır?", cat: "Trend", date: "05 Ocak 2023", img: "bitki_moss.jpg", desc: "İskandinav tarzı yosun duvarlar ile evinize modern bir dokunuş katın." },
  { id: 6, title: "Hava Bitkileri (Tillandsia) Rehberi", cat: "Bitki Tanıtımı", date: "01 Nisan 2023", img: "bitki_tillandsia.jpg", desc: "Toprağa ihtiyaç duymayan bu büyüleyici bitkilerin sırrı ne?" },
];

const Blog = () => {
  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* --- ÜST BÖLÜM: SLIDER VE BAŞLIK --- */}
      <div className="row align-items-center py-5 px-lg-5" style={{ background: '#198754', color: 'white', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }}>
        
        {/* Sol Yazı Alanı */}
        <div className="col-lg-6 mb-5 mb-lg-0 px-5">
          <span className="badge bg-white text-success px-3 py-2 rounded-pill mb-3">Yeşil Blog</span>
          <h1 className="display-4 fw-bold mb-4">Doğanın Sırlarını Keşfedin</h1>
          <p className="lead opacity-75 mb-4">
            Teraryum tasarımı, bitki bakımı ve dekorasyon fikirleri hakkında en güncel yazılarımızı derledik. İlham almaya hazır mısın?
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-light rounded-pill px-4 fw-bold">En Yeniler</button>
            <button className="btn btn-outline-light rounded-pill px-4">Popüler</button>
          </div>
        </div>

        {/* Sağ: Swiper Effect Cards (Deste Görünümü) */}
        <div className="col-lg-6 d-flex justify-content-center">
          <div style={{ width: '320px', height: '420px' }}>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 2500 }}
              className="mySwiper h-100"
            >
              {blogPosts.slice(0, 4).map(post => (
                <SwiperSlide key={post.id} className="rounded-4 overflow-hidden shadow-lg bg-white">
                  <div className="position-relative h-100">
                    <img src={`/images/${post.img}`} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                      <span className="badge bg-warning text-dark mb-2">{post.cat}</span>
                      <h5 className="text-white fw-bold mb-0">{post.title}</h5>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* --- ALT BÖLÜM: BLOG LİSTESİ (GRID) --- */}
      <div className="container py-5 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-dark">Son Yazılar</h3>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <input type="text" className="form-control rounded-pill border-0 shadow-sm" placeholder="Yazı ara..." style={{ paddingRight: '40px' }} />
            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted" style={{ zIndex: 5 }}></i>
          </div>
        </div>

        <div className="row g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-card">
                <div className="position-relative">
                  <img 
                    src={`/images/${post.img}`} 
                    className="card-img-top" 
                    alt={post.title} 
                    style={{ height: '220px', objectFit: 'cover' }}
                    onError={(e)=>{e.target.src="https://via.placeholder.com/300"}}
                  />
                  <span className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm">{post.date}</span>
                </div>
                <div className="card-body p-4">
                  <small className="text-success fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>{post.cat}</small>
                  <h5 className="card-title fw-bold mt-2 mb-3">
                    <Link to="#" className="text-dark text-decoration-none stretch-link">{post.title}</Link>
                  </h5>
                  <p className="card-text text-muted small">{post.desc}</p>
                </div>
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                  <div className="d-flex align-items-center">
                    <img src="/images/helin2.jpeg" className="rounded-circle me-2" width="30" height="30" style={{ objectFit:'cover' }} alt="yazar" onError={(e)=>{e.target.style.display='none'}}/>
                    <small className="text-muted">Helin Özalkan</small>
                    <span className="ms-auto small text-muted"><i className="bi bi-eye me-1"></i> 1.2k</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Blog;