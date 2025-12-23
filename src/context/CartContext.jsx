// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const KDV_RATE = 0.20; // %20 KDV
const CART_STORAGE_KEY = 'eticaret_sepet';

// Tema (uyumlu yeşil tonlar)
const THEME = {
  green: '#2d4a27',
  greenSoft: 'rgba(45, 74, 39, 0.92)',
  greenLight: '#e9f3ea',
  text: '#1f2937',
  muted: '#6b7280',
  danger: '#dc3545',
  white: '#ffffff'
};

export const CartProvider = ({ children }) => {
  // ✅ Recoverability: Sepeti localStorage'dan yükle
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  // ✅ Genel Popup Config (success / warning)
  const [popupConfig, setPopupConfig] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // ✅ Silme Onay Modal Config
  const [deleteConfig, setDeleteConfig] = useState({
    show: false,
    id: null
  });

  // ✅ Reliability + Recoverability: Sepet değişince kaydet
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ ESC ile modal kapatma
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && deleteConfig.show) {
        handleCancelDelete();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteConfig.show]);

  // ✅ Popup tetikleyici (mesaj + tip)
  const triggerPopup = (message, type = 'success') => {
    setPopupConfig({ show: true, message, type });
    setTimeout(() => {
      setPopupConfig({ show: false, message: '', type: 'success' });
    }, 2500);
  };

  // ✅ Sepete Ürün Ekleme (Stok Fail-Safe + Performans + Popup)
  const addToCart = (product) => {
    const startTime = performance.now();

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let result = prevItems;

      if (existingItem) {
        // Stok sınırı
        if (existingItem.quantity >= (product.stock ?? Infinity)) {
          triggerPopup(
            `Üzgünüz, bu üründen stokta sadece ${product.stock ?? existingItem.stock} adet var.`,
            'warning'
          );
          result = prevItems;
        } else {
          result = prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          triggerPopup('Ürün sepetinize eklendi!', 'success');
        }
      } else {
        // İlk ekleme stok kontrolü
        if ((product.stock ?? 0) <= 0) {
          triggerPopup('Bu ürünün stoğu tükenmiştir.', 'warning');
          result = prevItems;
        } else {
          result = [...prevItems, { ...product, quantity: 1 }];
          triggerPopup('Ürün sepetinize eklendi!', 'success');
        }
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`[PERFORMANS] Sepete Ekleme Süresi: ${duration.toFixed(2)} ms`);
      if (duration > 100) console.warn('DİKKAT: Performans hedefi (100ms) aşıldı!');

      return result;
    });
  };

  // ✅ Miktar Güncelleme (+ / - / set) + Fail-safe Validasyon + Popup
  // Kod 1 ile uyum için action parametresi kalsın, ekstra newValue opsiyonel.
  const updateQuantity = (id, action, newValue = null) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        let finalQuantity = item.quantity;

        if (action === 'increment') finalQuantity = item.quantity + 1;
        else if (action === 'decrement') finalQuantity = item.quantity - 1;
        else if (action === 'set' && newValue !== null) finalQuantity = parseInt(newValue, 10);

        // Negatif / 0 / NaN => 1
        if (isNaN(finalQuantity) || finalQuantity < 1) {
          triggerPopup('Miktar en az 1 olmalıdır.', 'warning');
          return { ...item, quantity: 1 };
        }

        // Stok fazlası => stok
        if (item.stock != null && finalQuantity > item.stock) {
          triggerPopup(`Maksimum stok sınırına (${item.stock}) ulaştınız.`, 'warning');
          return { ...item, quantity: item.stock };
        }

        return { ...item, quantity: finalQuantity };
      })
    );
  };

  // ✅ Sepetten Silme: modal aç
  const removeFromCart = (id) => {
    setDeleteConfig({ show: true, id });
  };

  // ✅ Silme Onaylandı
  const handleConfirmDelete = () => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== deleteConfig.id));
    setDeleteConfig({ show: false, id: null });
    triggerPopup('Ürün sepetten kaldırıldı.', 'success');
  };

  // ✅ Silme İptal
  const handleCancelDelete = () => {
    setDeleteConfig({ show: false, id: null });
  };

  // ✅ Fiyat Hesaplamaları
  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxTotal = subTotal * KDV_RATE;
  const totalPrice = subTotal + taxTotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        subTotal,
        taxTotal,
        totalPrice
      }}
    >
      {children}

      {/* ✅ GENEL BİLDİRİM POPUP (success / warning) - yeşil tema */}
      {popupConfig.show && (
        <div
          style={{
            position: 'fixed',
            top: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor:
              popupConfig.type === 'success'
                ? THEME.greenSoft
                : 'rgba(220, 53, 69, 0.92)', // danger
            color: 'white',
            padding: '12px 18px',
            borderRadius: '999px',
            zIndex: 9999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '92vw'
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                popupConfig.type === 'success'
                  ? 'rgba(255,255,255,0.18)'
                  : 'rgba(255,255,255,0.16)'
            }}
          >
            <i
              className={`bi ${
                popupConfig.type === 'success'
                  ? 'bi-check-lg'
                  : 'bi-exclamation-triangle-fill'
              }`}
            />
          </span>
          <span style={{ lineHeight: 1.2 }}>{popupConfig.message}</span>
        </div>
      )}

      {/* ✅ SİLME ONAY MODALI (Daha estetik + aynı buton boyu + EVET SAĞDA) */}
      {deleteConfig.show && (
        <div
          onClick={handleCancelDelete} // dışarı tıklayınca kapat
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(1200px 600px at 50% 20%, rgba(0,0,0,0.55), rgba(0,0,0,0.7))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '18px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // kart içine tıklama overlay'i kapatmasın
            style={{
              width: '100%',
              maxWidth: 520,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 18px 60px rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.6)',
              overflow: 'hidden'
            }}
          >
            {/* ÜST ŞERİT */}
            <div
              style={{
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background:
                  'linear-gradient(135deg, rgba(45,74,39,0.10), rgba(45,74,39,0.04))'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: THEME.greenLight,
                    border: '1px solid rgba(45,74,39,0.16)'
                  }}
                >
                  <i className="bi bi-trash3" style={{ color: THEME.green, fontSize: 20 }} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: THEME.text, fontSize: 18 }}>
                    Silme Onayı
                  </div>
                  <div style={{ color: THEME.muted, fontSize: 12 }}>
                    Güvenli işlem • Geri alınamaz
                  </div>
                </div>
              </div>

              <button
                onClick={handleCancelDelete}
                aria-label="Kapat"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  border: '1px solid rgba(0,0,0,0.06)',
                  background: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="bi bi-x-lg" style={{ color: THEME.muted, fontSize: 14 }} />
              </button>
            </div>

            {/* İÇERİK */}
            <div style={{ padding: '18px 20px 6px' }}>
              <h3 style={{ margin: 0, color: THEME.text, fontWeight: 900, fontSize: 26 }}>
                Emin misiniz?
              </h3>
              <p style={{ marginTop: 10, marginBottom: 0, color: THEME.muted, lineHeight: 1.5 }}>
                Bu ürünü sepetinizden silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>

              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 16,
                  background: 'rgba(45,74,39,0.06)',
                  border: '1px solid rgba(45,74,39,0.12)',
                  color: THEME.text,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start'
                }}
              >
                <i className="bi bi-info-circle" style={{ color: THEME.green, marginTop: 2 }} />
                <div style={{ fontSize: 13, color: THEME.text }}>
                  İpucu: <span style={{ color: THEME.muted }}>İsterseniz “Vazgeç” ile geri dönebilirsiniz.</span>
                </div>
              </div>
            </div>

            {/* BUTONLAR (aynı boy + EVET SAĞDA) */}
            <div
              style={{
                padding: '18px 20px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12
              }}
            >
              {/* SOL: Hayır */}
              <button
                onClick={handleCancelDelete}
                style={{
                  height: 48,
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.10)',
                  background: 'rgba(255,255,255,0.85)',
                  color: THEME.text,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10
                }}
              >
                <i className="bi bi-arrow-left" />
                Hayır, Vazgeç
              </button>

              {/* SAĞ: Evet */}
              <button
                onClick={handleConfirmDelete}
                style={{
                  height: 48,
                  borderRadius: 16,
                  border: '1px solid rgba(45,74,39,0.25)',
                  background: `linear-gradient(135deg, ${THEME.green}, #3b6b33)`,
                  color: THEME.white,
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(45,74,39,0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10
                }}
              >
                Evet, Sil
                <i className="bi bi-trash3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
