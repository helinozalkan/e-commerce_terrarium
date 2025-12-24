// src/pages/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Yıldız Render Fonksiyonu (Tasarım bütünlüğü için)
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

  const themeColor = '#198754'; // Yeşil Tema

  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* BAŞLIK ALANI */}
      <div className="container pt-5 pb-4">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold" style={{ fontFamily: '"Playfair Display", serif', color: '#333' }}>
            Favori Koleksiyonum
          </h1>
          <div className="mx-auto mt-3" style={{ height: '3px', width: '60px', backgroundColor: themeColor }}></div>
          <p className="text-muted mt-3">Beğendiğiniz ve takip ettiğiniz özel parçalar.</p>
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <div className="container">
        {favorites.length > 0 ? (
          <div className="row g-4">
            {favorites.map((urun) => (
              <div key={urun.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.2s' }}>
                  
                  {/* RESİM ALANI */}
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
                    
                    {/* SİLME BUTONU (X İKONU) */}
                    <button 
                      className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
                      style={{ width: '32px', height: '32px', zIndex: 10 }}
                      onClick={() => toggleFavorite(urun)}
                      title="Favorilerden Kaldır"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  
                  {/* KART GÖVDESİ */}
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
                    
                    <div className="fs-5 fw-bold text-dark mb-2">{urun.price.toFixed(2)} TL</div>

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
            ))}
          </div>
        ) : (
          /* BOŞ DURUM (EMPTY STATE) */
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-heartbreak text-muted" style={{ fontSize: '5rem', opacity: 0.5 }}></i>
            </div>
            <h3 className="fw-bold text-muted">Henüz favori ürününüz yok.</h3>
            <p className="text-muted mb-4">Beğendiğiniz ürünleri kalp ikonuna tıklayarak buraya ekleyebilirsiniz.</p>
            <Link to="/urunler" className="btn btn-lg text-white px-5 rounded-pill" style={{ backgroundColor: themeColor }}>
              Koleksiyonu Keşfet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;