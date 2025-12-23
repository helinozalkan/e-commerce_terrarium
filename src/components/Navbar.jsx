// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // YENİ: Context'i import ettik

const Navbar = () => {
  const isLoggedIn = false; 
  const username = "Misafir";

  // YENİ: Sepetteki toplam ürün sayısını hesaplıyoruz
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgb(91, 140, 213)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex ms-4" to="/" style={{ marginLeft: '5px' }}>
          {/* Logo yolunu kontrol etmeyi unutmayın */}
          <img src="/images/logo.png" alt="Logo" width="40" height="40" className="align-text-top" />
          <div className="baslik fs-3 ms-2">
            <span className="dropdown-item text-white">ETİCARET</span>
          </div>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mt-1" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: '110px' }}>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/girisimciler">Girişimcilerimiz</Link>
            </li>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/siparisler">Sipariş İşlemleri</Link>
            </li>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/urunler">Ürünlerimiz</Link>
            </li>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/satici-ol">Satıcı Ol</Link>
            </li>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/ekibimiz">Ekibimiz</Link>
            </li>
            <li className="nav-item ps-3">
              <Link className="nav-link" to="/motivasyon">Ekipten Mesaj Var!</Link>
            </li>
          </ul>

          <Link to="/favoriler">
            <i className="bi bi-heart text-white fs-5" style={{ marginLeft: '20px' }}></i>
          </Link>

          {/* GÜNCELLENEN SEPET KISMI */}
          <Link to="/sepetim" className="position-relative text-decoration-none">
            <i className="bi bi-cart3 text-white fs-5" style={{ marginLeft: '20px' }}></i>
            {totalItems > 0 && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '10px', marginLeft: '-5px', marginTop: '-5px' }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          <div className="d-flex me-3" style={{ marginLeft: '20px' }}>
            <i className="bi bi-person-circle text-white fs-4"></i>
            {isLoggedIn ? (
              <Link to="/logout" className="text-white mt-2 ms-2" style={{ fontSize: '15px', textDecoration: 'none' }}>
                {username}
              </Link>
            ) : (
              <Link to="/login" className="text-white mt-2 ms-2" style={{ fontSize: '15px', textDecoration: 'none' }}>
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;