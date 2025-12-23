// src/pages/Products.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Genişletilmiş Örnek Ürün Verisi
const allProducts = [
  { id: 1, name: "Çini Vazo", description: "El yapımı özel çini vazo.", price: 450, image: "urun_çini.jpg" },
  { id: 2, name: "Örgü Bebek", description: "Organik iplerden örgü oyuncak.", price: 200, image: "orgu.jpg" },
  { id: 3, name: "Ahşap Kutu", description: "Ceviz ağacından oyma kutu.", price: 350, image: "ahşap.png" },
  { id: 4, name: "Gümüş Kolye", description: "925 ayar gümüş el işi kolye.", price: 600, image: "taki.jpg" },
  { id: 5, name: "Deri Cüzdan", description: "Hakiki deri el dikimi cüzdan.", price: 300, image: "deri.png" },
  { id: 6, name: "Dokuma Kilim", description: "Anadolu motifli kök boya kilim.", price: 1200, image: "dokuma.png" },
  { id: 7, name: "Seramik Kupa", description: "Özel tasarım seramik kupa.", price: 150, image: "seramik.jpg" },
  { id: 8, name: "Doğal Sabun", description: "Lavanta özlü el yapımı sabun.", price: 80, image: "bakim.jpg" },
];

const Products = () => {
  const { addToCart } = useCart();

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* Sayfa Başlığı */}
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <div style={{ color: 'rgb(91, 140, 213)', fontSize: '1.2rem' }}>Keşfet</div>
          <div className="baslik3" style={{ fontSize: '50px' }}>Tüm Ürünlerimiz</div>
          <p className="text-muted mt-2">El emeği göz nuru, özenle hazırlanmış ürün koleksiyonumuz.</p>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="container">
        <div className="row px-lg-5">
          {allProducts.map((urun) => (
            <div key={urun.id} className="col-lg-6 mb-4">
              {/* Ana sayfadaki kart tasarımı (.a sınıfı css.css'ten geliyor) */}
              <div className="a container bg-white h-100 shadow-sm" style={{ borderRadius: '20px', padding: '20px' }}>
                <div className="row align-items-center h-100">
                  
                  {/* Sol Taraf: Resim */}
                  <div className="col-md-6 text-center">
                    <Link to={`/product/${urun.id}`}>
                      <img 
                        src={`/images/${urun.image}`} 
                        className="img-grow img-fluid" 
                        style={{ 
                          borderRadius: '15px', 
                          maxHeight: '230px', 
                          width: '100%', 
                          objectFit: 'cover',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }} 
                        alt={urun.name} 
                      />
                    </Link>
                  </div>

                  {/* Sağ Taraf: Bilgiler */}
                  <div className="col-md-6 mt-3 mt-md-0">
                    <h3 className="baslik3 fw-bold fs-4">
                      <Link to={`/product/${urun.id}`} className="text-dark text-decoration-none">
                        {urun.name}
                      </Link>
                    </h3>
                    
                    {/* Yıldızlar */}
                    <div className="starts mb-2" style={{ color: 'rgb(91, 140, 213)' }}>
                      {[...Array(5)].map((_, i) => <i key={i} className="bi bi-star-fill small"></i>)}
                    </div>
                    
                    <p className="text-muted small mb-3">{urun.description}</p>
                    
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="baslik3 fw-bold fs-4 text-dark">{urun.price} TL</div>
                    </div>

                    <button 
                      className="btn text-white mt-3 w-100" 
                      style={{ 
                        backgroundColor: 'rgb(91, 140, 213)', 
                        borderRadius: '20px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => addToCart(urun)}
                    >
                      Sepete Ekle <i className="bi bi-cart-plus ms-2"></i>
                    </button>
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

export default Products;