// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  // Faz 2: KDV Hesaplama (%20)
  const taxRate = 0.20;
  const subTotal = totalPrice / (1 + taxRate);
  const taxAmount = totalPrice - subTotal;

  // Matematiksel Doğruluk Formatı
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(amount) + ' TL';
  };

  // 1. Madde: Kütüphanesiz Onay Mekanizması
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      // Tarayıcı içi standart onay kutusu
      const confirmDelete = window.confirm(`${item.name} ürününü sepetten çıkarmak istiyor musunuz?`);
      if (confirmDelete) {
        removeFromCart(item.id);
      }
    } else {
      updateQuantity(item.id, 'decrement');
    }
  };

  return (
    // 3. Madde: Zemin Renklendirmesi (#f8fbf8 - Soft Doğa Yeşili)
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fbf8', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1000px', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        
        <div className="text-center mb-4 border-bottom pb-3">
          <h1 className="fw-bold" style={{ color: '#2d4a27' }}>Sepetim</h1>
          <p className="text-muted small">Kusursuz detaylar, güvenli adımlar.</p>
        </div>

        {cartItems.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light text-secondary small text-uppercase">
                  <tr>
                    <th scope="col">Ürün Bilgisi</th>
                    <th scope="col" className="text-center">Birim Fiyat</th>
                    <th scope="col" className="text-center">Miktar</th>
                    <th scope="col" className="text-end">Toplam</th>
                    <th scope="col" className="text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td style={{ minWidth: '300px' }}>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.image.startsWith('http') ? item.image : `/images/${item.image}`} 
                            alt={item.name} 
                            className="rounded-3 shadow-sm me-3"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div>
                            <span className="fw-bold d-block">{item.name}</span>
                            <span className="text-success small"><i className="bi bi-check2-circle me-1"></i>Stokta Var</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{formatCurrency(item.price)}</td>
                      <td className="text-center">
                        <div className="d-inline-flex align-items-center border rounded-pill bg-white p-1">
                          <button className="btn btn-sm btn-light rounded-circle" onClick={() => handleDecrement(item)}>-</button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button className="btn btn-sm btn-light rounded-circle" onClick={() => updateQuantity(item.id, 'increment')}>+</button>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-success">{formatCurrency(item.price * item.quantity)}</td>
                      <td className="text-center">
                        <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item.id)}>
                          <i className="bi bi-trash3 fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row justify-content-between mt-5">
              {/* 2. Madde: Profesyonel Ödeme Simgeleri */}
              <div className="col-md-5 mb-4">
                <div className="p-3 border rounded-4 bg-light text-center">
                  <p className="small text-muted mb-2 fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>Kabul Edilen Ödeme Yöntemleri</p>
                  <div className="d-flex justify-content-center align-items-center gap-3 opacity-75" style={{ filter: 'grayscale(1)' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height="12" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height="18" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/TROY_Logo.png" height="25" alt="Troy" />
                    <div className="vr h-100 mx-1"></div>
                    <i className="bi bi-shield-lock-fill text-dark fs-5" title="Güvenli Ödeme"></i>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="p-4 rounded-4" style={{ backgroundColor: '#fdfdfd', border: '1px solid #eee' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Ara Toplam:</span>
                    <span>{formatCurrency(subTotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
                    <span className="text-muted">KDV (%20):</span>
                    <span>{formatCurrency(taxAmount)}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2">
                    <h5 className="fw-bold mb-0">Genel Toplam:</h5>
                    <h4 className="fw-bold text-success mb-0">{formatCurrency(totalPrice)}</h4>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link to="/checkout" className="btn btn-success btn-lg w-100 rounded-pill shadow-lg py-3 fw-bold" style={{ backgroundColor: '#2d4a27', border: 'none' }}>
                    ÖDEMEYE GEÇ <i className="bi bi-chevron-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted opacity-25"></i>
            <h3 className="mt-4 text-muted">Sepetiniz Boş</h3>
            <Link to="/" className="btn btn-success mt-3 px-5 rounded-pill" style={{ backgroundColor: '#2d4a27' }}>
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;