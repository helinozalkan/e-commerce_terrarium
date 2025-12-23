// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // YENİ: Context import edildi

// Swiper stilleri
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

// Mock Data (Ürün Verileri)
const mockProducts = [
  { id: 1, name: "Çini Vazo", description: "El yapımı özel çini vazo.", price: 450, image: "urun_çini.jpg" },
  { id: 2, name: "Örgü Bebek", description: "Organik iplerden örgü oyuncak.", price: 200, image: "orgu.jpg" },
  { id: 3, name: "Ahşap Kutu", description: "Ceviz ağacından oyma kutu.", price: 350, image: "ahşap.png" },
  { id: 4, name: "Gümüş Kolye", description: "925 ayar gümüş el işi kolye.", price: 600, image: "taki.jpg" },
];

const Home = () => {
  // Context'ten sepete ekleme fonksiyonunu çekiyoruz
  const { addToCart } = useCart();

  // Sayaç ve Geri Sayım State'leri
  const [countdown, setCountdown] = useState({ hours: "00", minutes: "00", seconds: "00" });

  // Geri Sayım Mantığı
  useEffect(() => {
    const countdownDate = new Date(new Date().getTime() + 5 * 60 * 60 * 1000); // 5 saat sonrası

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCountdown({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0")
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sayaç Animasyonu Mantığı (Yıllık Deneyim vb.)
  useEffect(() => {
    const counters = document.querySelectorAll(".num");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const valueDisplay = entry.target;
          let startValue = 0;
          let endValue = parseInt(valueDisplay.getAttribute("data-value"));
          let duration = Math.floor(2000 / endValue);
          
          let counter = setInterval(() => {
            startValue += 1;
            valueDisplay.textContent = startValue;
            if (startValue === endValue) {
              clearInterval(counter);
            }
          }, duration);
          observer.unobserve(valueDisplay);
        }
      });
    });

    counters.forEach((c) => observer.observe(c));
  }, []);

  return (
    <>
      {/* 1. BÖLÜM: SLIDESHOW (Büyük Resimler) */}
      <div className="container-fluid p-0">
        <div className="row position-relative m-0">
          <div className="slideshow">
            <img src="/images/index.jpg" className="img-fluid w-100 responsive-img slide-img" alt="Slide 1" />
            <img src="/images/indexx.jpg" className="img-fluid w-100 responsive-img slide-img" alt="Slide 2" />
          </div>
          <div className="position-absolute top-50 start-50 translate-middle w-50" style={{ marginTop: '-70px', zIndex: 10 }}>
            <div className="text-center">
              <div className="text-center fw-bold mb-3" style={{ color: 'black', fontSize: '1.2rem' }}>DÜŞLE, İNAN , BAŞAR</div>
              <div className="baslik2" style={{ color: 'white', fontSize: '4vw' }}>El İşçiliğiyle Üretilmiş, Emeğe Saygı Duyanların Tercihi</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: TRENDING SWIPER (Dönen Yuvarlak Resimler) */}
      <section id="tranding">
        <div className="container-fluid" style={{ padding: '0px', marginTop: '50px' }}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 0.5,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination]}
            className="tranding-slider"
          >
             {['çini.png', 'orgu.jpg', 'seramik.jpg', 'kekik.jpg', 'ahşap.png', 'dokuma.png', 'taki.jpg'].map((img, index) => (
               <SwiperSlide key={index} className="tranding-slide">
                 <div className="tranding-slide-img">
                   <img src={`/images/${img}`} alt="Trending" />
                 </div>
               </SwiperSlide>
             ))}
          </Swiper>
        </div>
      </section>

      {/* 3. BÖLÜM: İSTATİSTİK SAYAÇLARI */}
      <div className="wrapper container d-flex justify-content-center">
        <div className="container border-end border-warning col-12 col-lg-3 text-center">
          <div className="sayac d-flex justify-content-center">
            <span className="num" data-value="15">00</span>
            <span style={{ marginTop: '40px' }}>+</span>
          </div>
          <span className="text">Yıllık Deneyim</span>
        </div>
        <div className="container border-end border-warning col-12 col-lg-3 text-center">
          <div className="sayac d-flex justify-content-center">
            <span className="num" data-value="50">00</span>
            <span style={{ marginTop: '40px' }}>+</span>
          </div>
          <span className="text">Girişimci</span>
        </div>
        <div className="container border-end border-warning col-12 col-lg-3 text-center">
          <div className="sayac d-flex justify-content-center">
            <span className="num" data-value="200">00</span>
            <span style={{ marginTop: '40px' }}>+</span>
          </div>
          <span className="text">Günlük Ziyaretçi</span>
        </div>
        <div className="container col-12 col-lg-3 text-center">
          <div className="sayac d-flex justify-content-center">
            <span className="num" data-value="35">00</span>
            <span style={{ marginTop: '40px' }}>+</span>
          </div>
          <span className="text">Başarılar</span>
        </div>
      </div>

      {/* 4. BÖLÜM: YENİ ÜRÜNLER SWIPER (Kategoriler) */}
      <div className="container-fluid mt-5 bg-light py-5 ms-4">
        <div className="row">
          <div className="col-12 col-md-5 text-center py-5">
            <div className="text-start" style={{ color: 'rgb(91, 140, 213)' }}>El Emeği Ürünlerin Hikayesine Ortak Olun</div>
            <div className="baslik3 text-start text-black fw-bold" style={{ fontSize: '3vw' }}>Yeni Ürünlerimizi Deneyin</div>
            <div className="text-start mt-3">Geleneksel değerlerle modern tasarım anlayışını bir araya getiren bu e-ticaret deneyimi...</div>
          </div>
          <div className="col-12 col-md-7">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              navigation={true}
              modules={[Navigation]}
              className="ilk mb-5"
            >
              {[
                { img: 'çini.png', text: 'Seramik ve Çini' },
                { img: 'ahşap.png', text: 'Ahşap Ürünler' },
                { img: 'dokuma.png', text: 'Dokuma Ürünler' },
                { img: 'taki.jpg', text: 'Takılar ve Aksesuarlar' },
                { img: 'deri.png', text: 'Deri Ürünler' }
              ].map((item, i) => (
                <SwiperSlide key={i} className="k iki">
                  <img className="img" src={`/images/${item.img}`} alt={item.text} />
                  <div className="text-overlay">{item.text}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* 5. BÖLÜM: POPÜLER ÜRÜNLER (Sepete Ekle İşlemi Burada) */}
      <div className="container-fluid mt-5">
        <div className="text-center">
          <div style={{ color: 'rgb(91, 140, 213)' }}>Ürünler</div>
          <div className="baslik3" style={{ fontSize: '50px' }}>Popüler Olan Ürünlerimiz</div>
        </div>
      </div>

      <div className="container bg-light mt-5">
        <div className="row px-5">
          {mockProducts.length > 0 ? (
            mockProducts.map((urun) => (
              <div key={urun.id} className="col-lg-6 mb-4">
                <div className="a container bg-white h-100" style={{ borderRadius: '5%' }}>
                  <div className="row mt-5 mb-5 align-items-center">
                    <div className="col-md-6 text-center">
                      <Link to={`/product/${urun.id}`}>
                        <img 
                          src={`/images/${urun.image}`}
                          className="img-grow img-fluid"
                          style={{ borderRadius: '5%', maxHeight: '230px', width: 'auto', objectFit: 'cover' }}
                          alt={urun.name}
                        />
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <h3 className="baslik3 fw-bold fs-5 mt-3 mt-md-0">
                        <Link to={`/product/${urun.id}`} className="text-dark text-decoration-none">
                          {urun.name}
                        </Link>
                      </h3>
                      <div className="starts" style={{ color: 'rgb(91, 140, 213)' }}>
                        {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
                      </div>
                      <p style={{ fontSize: '14px', marginTop: '10px' }}>{urun.description}</p>
                      <div className="baslik3 fw-bold d-inline-block fs-4 mt-2">{urun.price} TL</div>
                      
                      {/* GÜNCELLENEN BUTON KISMI */}
                      <button 
                        className="btn text-white mt-2 d-block" 
                        style={{ backgroundColor: 'rgb(91, 140, 213)', borderRadius: '20px' }}
                        onClick={() => addToCart(urun)} // Context fonksiyonunu tetikler
                      >
                        Sepete Ekle
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Ürün bulunamadı.</p>
          )}
        </div>
      </div>

      {/* 6. BÖLÜM: GERİ SAYIM & İNDİRİM */}
      <div className="container-fluid p-0 bg-dark mt-5" style={{ minHeight: '200px', height: 'auto' }}>
        <div className="row m-0">
          <div className="baslik3 col-12 col-md-6 text-white p-5" style={{ fontWeight: 'bold', fontSize: '45px' }}>
            Girişimcilerden %50'den Fazla İndirim
            <div>
              <button type="button" className="btn ms-2 text-white"
                style={{ backgroundColor: 'rgb(91, 140, 213)', borderRadius: '20px', height: '40px', width: '120px', marginTop: '0px' }}>
                Hemen Al
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 text-white p-5">
            <div className="countdown d-flex justify-content-around">
              <div className="text-center">
                <div className="border fixed-size" id="hour">{countdown.hours}</div>
                <div className="baslik3 fs-3 mt-3">Saat</div>
              </div>
              <div className="text-center">
                <div className="border fixed-size" id="minute">{countdown.minutes}</div>
                <div className="baslik3 fs-3 mt-3">Dakika</div>
              </div>
              <div className="text-center">
                <div className="border fixed-size" id="second">{countdown.seconds}</div>
                <div className="baslik3 fs-3 mt-3">Saniye</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. BÖLÜM: YAZILIM EKİBİ */}
      <div className="container-fluid mt-5">
        <div className="text-center">
          <div style={{ color: 'rgb(91, 140, 213)' }}>Yazılım Ekibimiz</div>
          <div className="baslik3" style={{ fontSize: '50px' }}>Yılın Girişimcileri</div>
        </div>
      </div>
      
      <div className="container">
        <div className="row bg-light px-5 justify-content-center">
          {[
            { img: 'beyza2.jpeg', name: 'Beyzanur Bayır', role: 'CRM & Analytics Solutions Director' },
            { img: 'ahsen.jpeg', name: 'Ahsen Berra Özdoğan', role: 'Principal Innovation Engineer' },
            { img: 'helin2.jpeg', name: 'Helin Özalkan', role: 'Cybernetic Systems Engineer' },
            { img: 'salih.jpeg', name: 'Salih Kerem Gündoğan', role: 'Chief Code Officer' },
            { img: 'zeynep.jpeg', name: 'Zeynep Nuriye Tekin', role: 'Quantum Systems Developer' }
          ].map((person, idx) => (
            <div key={idx} className="col-12 col-md-4 mt-4 mb-5 d-flex justify-content-center">
               <div className="b bg-white rounded-4" style={{ height: '410px', width: '350px' }}>
                  <img src={`/images/${person.img}`} className="img-b rounded-top-4" style={{ height: '300px', width: '350px', objectFit: 'cover', objectPosition: 'top' }} alt={person.name} />
                  <div className="baslik3 text-center fs-4 fw-bold mt-3">{person.name}</div>
                  <div className="text-center" style={{ fontSize: '13px', color: 'rgb(91, 140, 213)' }}>{person.role}</div>
                  <div className="text-center mt-2" style={{ color: 'rgb(91, 140, 213)' }}>
                    <i className="bi bi-facebook mx-2"></i>
                    <i className="bi bi-linkedin mx-2"></i>
                    <i className="bi bi-instagram mx-2"></i>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. BÖLÜM: YORUMLAR (Cards Efekti) */}
      <div className="container p-0 mt-5 mb-5 d-flex justify-content-center">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="my"
        >
          <SwiperSlide className="z">
            <div className="text-center text-dark fw-normal fs-6 p-4">
               <img src="/images/ogretmen.jpeg" alt="Yorumcu" style={{borderRadius: '50%', height: '100px', width: '100px'}} />
               <div className="fs-6 px-3 mt-3">Harika bir girişim, tebrik ediyorum.</div>
               <div className="baslik3 fw-bold fs-4 mt-4">Ahmet Gerçek</div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="z">
            <div className="text-center text-dark fw-normal fs-6 p-4">
               <img src="/images/kadin_ceo.jpeg" alt="Yorumcu" style={{borderRadius: '50%', height: '100px', width: '100px'}} />
               <div className="fs-6 px-3 mt-3">Kadın girişimcileri desteklemeniz çok güzel.</div>
               <div className="baslik3 fw-bold fs-4 mt-4">Ela Erdem</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 9. BÖLÜM: FOOTER */}
      <div className="container-fluid text-white p-0 mt-5 position-relative" style={{ width: '100%' }}>
          <img src="/images/çini.png" className="img-fluid w-100 position-absolute" style={{ top: 0, left: 0, zIndex: -1, height: '100%', objectFit: 'cover' }} alt="bg" />
          <div className="container-fluid text-white" style={{ zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '40px 5%' }}>
             <div className="row">
                <div className="col-lg-3 mb-4 text-center">
                   <div className="rounded-4 p-4 shadow-sm" style={{ background: 'linear-gradient(135deg, rgba(212, 28, 28, 0.3), rgba(255,255,255,0.15))', backdropFilter: 'blur(10px)' }}>
                      <img className="rounded-4 mb-3 shadow" src="/images/logo.png" alt="Logo" style={{ width: '80%', height: 'auto' }} />
                   </div>
                </div>
                <div className="col-lg-3 mb-4">
                   <h4>Ürünler</h4>
                   <p>Seramik ve Çini</p>
                   <p>Organik Kozmetik</p>
                </div>
                <div className="col-lg-3 mb-4">
                   <h4>Şirket</h4>
                   <p>Hakkımızda</p>
                   <p>İletişim</p>
                </div>
                <div className="col-lg-3 mb-4">
                  <h4>Sosyal Medya</h4>
                  <div className="d-flex gap-3 fs-4">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-instagram"></i>
                  </div>
                </div>
             </div>
          </div>
      </div>
    </>
  );
};

export default Home;