// src/pages/OurStory.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Mevcut görsellerden kullanalım
const teamMembers = [
  { id: 1, name: "Helin Özalkan", role: "Operasyon ve Kalite Lideri", img: "helin2.jpeg" },
  { id: 2, name: "Beyzanur Bayır", role: "Müşteri Deneyimi Direktörü", img: "beyza2.jpeg" },
  { id: 3, name: "Ahsen Berra Özdoğan", role: "Baş Tasarımcı ve Küratör", img: "ahsen.jpeg" },
];

const milestones = [
  { year: "2020", title: "İlk Tohum", desc: "Küçük bir balkonda, hobi olarak başlayan ilk teraryum denemeleri.", icon: "bi-flower1" },
  { year: "2021", title: "Atölye Kuruldu", desc: "Artan talep üzerine evimizin garajını profesyonel bir atölyeye çevirdik.", icon: "bi-house-heart" },
  { year: "2022", title: "İlk Sergi", desc: "Doğayı sanatla buluşturduğumuz ilk sergimizde büyük ilgi gördük.", icon: "bi-award" },
  { year: "2023", title: "Online Mağaza", desc: "Türkiye'nin her yerine yeşil mutluluk dağıtmak için sitemizi açtık.", icon: "bi-globe" },
  { year: "2024", title: "Büyüyen Aile", desc: "15'ten fazla yerel üretici ve sanatçı ile dev bir ekosistem olduk.", icon: "bi-people" },
];

const OurStory = () => {
  // YENİ GÖRSEL: Yüksek çözünürlüklü, doğa temalı bir stok fotoğraf (Unsplash)
  const heroImageUrl = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"; 

  return (
    <div className="bg-light" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* --- HERO BÖLÜMÜ --- */}
      <div className="position-relative d-flex align-items-center justify-content-center text-center text-white" 
           style={{ 
             height: '60vh', 
             background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${heroImageUrl}) center/cover fixed`
           }}>
        <div className="container" style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '2px' }}>Doğanın Kalbine Yolculuk</h1>
          <p className="lead fs-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
            "Her şey küçük bir tohumla başladı. Şimdi ise binlerce evin nefes alan köşesiyiz."
          </p>
        </div>
      </div>

      {/* --- MİSYON & VİZYON KARTLARI --- */}
      <div className="container mt-n5 position-relative" style={{ zIndex: 5, marginTop: '-50px' }}>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 text-center hover-up">
              <div className="mb-3 text-success"><i className="bi bi-heart-pulse fs-1"></i></div>
              <h4 className="fw-bold">Tutku</h4>
              <p className="text-muted">Her bir teraryumu, yaşayan bir sanat eseri olarak görüyor ve aşkla tasarlıyoruz.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 text-center hover-up">
              <div className="mb-3 text-success"><i className="bi bi-recycle fs-1"></i></div>
              <h4 className="fw-bold">Sürdürülebilirlik</h4>
              <p className="text-muted">Doğaya zarar vermeyen, geri dönüştürülebilir malzemeler kullanıyoruz.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 text-center hover-up">
              <div className="mb-3 text-success"><i className="bi bi-stars fs-1"></i></div>
              <h4 className="fw-bold">Özgünlük</h4>
              <p className="text-muted">Hiçbir tasarımımız birbirinin aynısı değildir. Her biri kendine has bir dünya.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- ZAMAN TÜNELİ (SWIPER) --- */}
      <div className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-dark">Bizim Hikayemiz</h2>
          <div className="d-flex justify-content-center"><div style={{ width: '60px', height: '3px', background: '#198754' }}></div></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-5"
        >
          {milestones.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center overflow-hidden" style={{ backgroundColor: '#fff' }}>
                <div className="rounded-circle bg-success bg-opacity-10 mx-auto d-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px', color: '#198754' }}>
                  <i className={`bi ${item.icon} fs-2`}></i>
                </div>
                
                {/* DÜZELTİLEN KISIM: Tarih Boyutu ve Konumu */}
                <h2 className="fw-bold text-success opacity-25 display-4 position-absolute top-0 end-0 me-3 mt-3" style={{ zIndex: 0 }}>
                  {item.year}
                </h2>
                
                <div className="position-relative" style={{ zIndex: 1 }}>
                  <h4 className="fw-bold mt-3">{item.title}</h4>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- TAKIMIMIZ --- */}
      <div className="container mb-5">
        <div className="row align-items-center bg-white rounded-5 shadow-sm p-5 g-5">
          <div className="col-lg-4 text-center text-lg-start">
            <h2 className="fw-bold display-6">Bu Dünyayı Yaratanlar</h2>
            <p className="text-muted mt-3">
              Doğa aşığı, tasarım tutkunu ve detaycı ekibimizle tanışın. Biz kocaman yeşil bir aileyiz.
            </p>
            <button className="btn btn-outline-success rounded-pill px-4 mt-2">Ekibe Katıl</button>
          </div>
          <div className="col-lg-8">
            <div className="row g-3 justify-content-center">
              {teamMembers.map((member) => (
                <div key={member.id} className="col-6 col-md-4 text-center">
                  <div className="mb-3 position-relative d-inline-block">
                    <img 
                      src={`/images/${member.img}`} 
                      alt={member.name} 
                      className="rounded-circle shadow"
                      style={{ width: '120px', height: '120px', objectFit: 'cover', border: '4px solid #fff' }}
                      onError={(e)=>{e.target.src="https://via.placeholder.com/150"}}
                    />
                  </div>
                  <h6 className="fw-bold mb-0">{member.name}</h6>
                  <small className="text-muted d-block" style={{ fontSize: '0.85rem' }}>{member.role}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OurStory;