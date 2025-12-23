// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // YENİ

const Cart = () => {
  // Context'ten verileri ve fonksiyonları çekiyoruz
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  // Para formatı (TL)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount) + ' TL';
  };

  return (
    <div className="container" style={{ maxWidth: '960px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
      <div className="text-center mb-4">
        <h1 className="display-5" style={{ fontFamily: "'Playfair Display', serif" }}>Sepetim</h1>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" colSpan="2">Ürün</th>
                  <th scope="col" className="text-center">Fiyat</th>
                  <th scope="col" className="text-center">Miktar</th>
                  <th scope="col" className="text-end">Toplam</th>
                  <th scope="col" className="text-center">İşlem</th>
                </tr>
              </thead>
              <tbody style={{ verticalAlign: 'middle' }}>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: '80px' }}>
                      <Link to={`/product/${item.id}`}>
                        {/* Resim yolunu kontrol ediyoruz, başında /images/ var mı diye */}
                        <img 
                          src={item.image.startsWith('/') ? item.image : `/images/${item.image}`} 
                          alt={item.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/product/${item.id}`} className="text-dark text-decoration-none fw-bold">
                        {item.name}
                      </Link>
                      <small className="d-block text-muted">Boyut: Standart</small>
                    </td>
                    <td className="text-center">{formatCurrency(item.price)}</td>
                    <td className="text-center">
                      <div className="input-group justify-content-center mx-auto" style={{ width: '120px' }}>
                        <button 
                          className="btn btn-outline-secondary btn-sm" 
                          type="button" 
                          onClick={() => updateQuantity(item.id, 'decrement')}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          className="form-control form-control-sm text-center" 
                          value={item.quantity} 
                          readOnly 
                        />
                        <button 
                          className="btn btn-outline-secondary btn-sm" 
                          type="button" 
                          onClick={() => updateQuantity(item.id, 'increment')}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end fw-bold">{formatCurrency(item.price * item.quantity)}</td>
                    <td className="text-center">
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-danger" 
                        title="Ürünü Kaldır" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4" className="text-end" style={{ fontSize: '1.15rem' }}>Genel Toplam:</th>
                  <th colSpan="2" className="text-start fs-5">{formatCurrency(totalPrice)}</th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Link to="/" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left"></i> Alışverişe Devam Et
            </Link>
            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ backgroundColor: 'rgb(91, 140, 213)', borderColor: 'rgb(91, 140, 213)' }}>
              Sepeti Onayla <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center p-5 bg-light rounded">
          <i className="bi bi-cart-x fs-1 text-secondary"></i>
          <h4 className="mt-3">Sepetinizde ürün bulunmamaktadır.</h4>
          <p className="text-muted">Hemen alışverişe başlayarak sepetinizi doldurabilirsiniz.</p>
          <Link to="/" className="btn btn-primary mt-2" style={{ backgroundColor: 'rgb(91, 140, 213)', borderColor: 'rgb(91, 140, 213)' }}>
            Alışverişe Başla
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;