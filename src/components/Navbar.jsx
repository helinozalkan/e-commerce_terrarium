// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate eklendi
import { useCart } from '../context/CartContext'; 
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Admin giriş durumunu localStorage'dan kontrol ediyoruz
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Dinamik Sepet Sayısı
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dinamik Favori Sayısı
  const { favorites } = useFavorites();

  // Çıkış Fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload(); // Sayfayı yenileyerek state'i temizler
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #2d4a27' }}>
      <div className="container py-1">
        
        {/* LOGO VE MARKA */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="https://img.pikbest.com/origin/09/22/78/98ApIkbEsTMvz.png!f305cw" alt="Logo" width="45" height="45" className="me-2" />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-4 lh-1" style={{ color: '#2d4a27', letterSpacing: '1px' }}>TERRARIUM</span>
            <span className="small fw-light tracking-widest text-secondary" style={{ fontSize: '0.7rem' }}>LABORATORY</span>
          </div>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item px-3">
              <Link className="nav-link text-dark hover-success" to="/urunler">Koleksiyonlar</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link text-dark hover-success" to="/hikayemiz">Hikayemiz</Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link text-dark hover-success" to="/blog">Blog</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* FAVORİLER */}
            <Link to="/favoriler" className="text-dark position-relative">
              <i className="bi bi-heart fs-5"></i>
              {favorites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* SEPET */}
            <Link to="/sepetim" className="position-relative text-decoration-none text-dark">
              <i className="bi bi-bag-check fs-4 text-success"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="vr mx-2 d-none d-lg-block"></div>
            
            <div className="d-flex align-items-center">
              {/* ŞARTLI RENDER: Admin giriş yaptıysa Panel, yapmadıysa Giriş Yap butonu */}
              {isAdmin ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/admin-dashboard" className="btn btn-success btn-sm rounded-pill px-3 fw-bold shadow-sm">
                    <i className="bi bi-speedometer2 me-1"></i> Panel
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold">
                    Çıkış
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold">
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;