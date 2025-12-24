// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminSellers from './admin/AdminSellers'; 
import AdminOrders from './admin/AdminOrders'; 

// VERİLER - ARTIK HEPSİ CANLI CONTEXT'TEN GELİYOR!
import { categories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useSellers } from '../context/SellerContext';
import { useOrders } from '../context/OrderContext'; // YENİ EKLENDİ

const sellersList = ["Cam Dünyası", "Yeşil Sera", "Hobi Market", "Taş Dünyası", "Doğa Sanat"];

// --- DASHBOARD HOME ---
const DashboardHome = () => {
  // CANLI VERİLERİ ÇEKİYORUZ
  const { products } = useProducts();
  const { sellers } = useSellers();
  const { orders } = useOrders(); // allOrders yerine orders kullanacağız

  // --- İSTATİSTİK HESAPLAMALARI ---
  // 1. Toplam Ciro (Sadece iptal edilmeyen siparişlerden)
  const totalRevenue = orders
    .filter(o => o.status !== "İptal" && o.status !== "İade Edildi")
    .reduce((acc, order) => acc + order.total, 0);
  
  // 2. Bekleyen Siparişler
  const pendingOrders = orders.filter(o => o.status === "Hazırlanıyor" || o.status === "Yeni Sipariş").length;

  // 3. Kritik Stok
  const criticalStockList = products.filter(p => p.stock > 0 && p.stock < 5);

  // 4. Kategori Dağılımı
  const categoryStats = categories.filter(c => c !== "Tümü").map(cat => {
    const count = products.filter(p => p.category === cat).length;
    const percentage = Math.round((count / products.length) * 100) || 0;
    return { name: cat, count, percent: percentage };
  });

  return (
    <div className="container-fluid p-4">
      {/* BAŞLIK */}
      <div className="d-flex justify-content-between align-items-end mb-5">
        <div>
          <h4 className="text-muted mb-1 fw-light">Hoş geldin, Yönetici 👋</h4>
          <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: '-1px' }}>İşletme Genel Bakış</h2>
        </div>
        <div className="text-end text-muted small">
          <div><i className="bi bi-calendar-event me-1"></i> {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      {/* 1. SATIR: İSTATİSTİK KARTLARI */}
      <div className="row g-4 mb-5">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 text-white h-100 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', borderRadius: '20px' }}>
            <div className="card-body position-relative p-4">
              <h6 className="text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '0.8rem' }}>Toplam Ciro</h6>
              <h2 className="display-6 fw-bold mb-0">{totalRevenue.toLocaleString('tr-TR')} ₺</h2>
              <div className="mt-3 small text-white-50"><i className="bi bi-arrow-up-circle-fill text-white me-1"></i> Geçen aya göre %12 artış</div>
              <i className="bi bi-wallet2 position-absolute" style={{ fontSize: '6rem', right: '-20px', bottom: '-20px', opacity: '0.2', transform: 'rotate(-15deg)' }}></i>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 text-white h-100 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)', borderRadius: '20px' }}>
            <div className="card-body position-relative p-4">
              <h6 className="text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '0.8rem' }}>Toplam Sipariş</h6>
              <h2 className="display-6 fw-bold mb-0">{orders.length}</h2>
              <div className="mt-3 small text-white-50"><i className="bi bi-bag-check-fill text-white me-1"></i> {pendingOrders} sipariş hazırlanıyor</div>
              <i className="bi bi-bag-heart position-absolute" style={{ fontSize: '6rem', right: '-20px', bottom: '-20px', opacity: '0.2', transform: 'rotate(-15deg)' }}></i>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 text-white h-100 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)', borderRadius: '20px' }}>
            <div className="card-body position-relative p-4">
              <h6 className="text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '0.8rem' }}>Aktif Ürünler</h6>
              <h2 className="display-6 fw-bold mb-0">{products.length}</h2>
              <div className="mt-3 small text-white-50"><i className="bi bi-exclamation-circle-fill text-white me-1"></i> {criticalStockList.length} ürün kritik seviyede</div>
              <i className="bi bi-box-seam position-absolute" style={{ fontSize: '6rem', right: '-20px', bottom: '-20px', opacity: '0.2', transform: 'rotate(-15deg)' }}></i>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 text-white h-100 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', borderRadius: '20px' }}>
            <div className="card-body position-relative p-4">
              <h6 className="text-white-50 text-uppercase fw-bold mb-2" style={{ fontSize: '0.8rem' }}>Girişimciler</h6>
              <h2 className="display-6 fw-bold mb-0">{sellers.length}</h2>
              <div className="mt-3 small text-white-50"><i className="bi bi-people-fill text-white me-1"></i> Büyüyen ailemiz</div>
              <i className="bi bi-shop position-absolute" style={{ fontSize: '6rem', right: '-20px', bottom: '-20px', opacity: '0.2', transform: 'rotate(-15deg)' }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SATIR: GRAFİK VE ANALİZ */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold text-dark m-0">Haftalık Satış Performansı</h5>
              <span className="badge bg-light text-dark border">Son 7 Gün</span>
            </div>
            
            <div className="d-flex align-items-end justify-content-between h-100 px-3 pb-2" style={{ minHeight: '250px' }}>
              {/* Basit Statik Grafik Çubukları (Görsel Amaçlı) */}
              {[{d:'Pzt',h:40,c:'#38ef7d'}, {d:'Sal',h:65,c:'#11998e'}, {d:'Çar',h:85,c:'#3a7bd5'}, {d:'Per',h:50,c:'#00d2ff'}, {d:'Cum',h:90,c:'#8E2DE2'}, {d:'Cmt',h:70,c:'#FFC837'}, {d:'Paz',h:30,c:'#FF8008'}].map((bar, i) => (
                <div key={i} className="d-flex flex-column align-items-center gap-2" style={{ width: '10%' }}>
                  <div className="w-100 rounded-top" style={{ height: '140px', background: '#e9ecef', position: 'relative' }}>
                    <div className="position-absolute bottom-0 w-100 rounded-top" style={{ height: `${bar.h}%`, background: bar.c }}></div>
                  </div>
                  <small className="text-muted fw-bold" style={{ fontSize: '0.7rem' }}>{bar.d}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <h5 className="fw-bold text-dark mb-4">Kategori Dağılımı</h5>
            <div className="d-flex flex-column justify-content-center h-100 gap-4">
              {categoryStats.map((cat, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold small">{cat.name}</span>
                    <span className="small text-muted">{cat.count} Ürün</span>
                  </div>
                  <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                    <div className="progress-bar" style={{ width: `${cat.percent}%`, backgroundColor: index % 3 === 0 ? '#11998e' : index % 3 === 1 ? '#3a7bd5' : '#FF8008' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SATIR: SON SİPARİŞLER VE KRİTİK STOK */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
            <div className="card-header bg-white p-4 border-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold m-0">Son Siparişler</h5>
                <Link to="siparisler" className="btn btn-sm btn-light rounded-pill px-3">Tümünü Gör</Link>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted small">
                  <tr>
                    <th className="ps-4">Müşteri</th>
                    <th>Tarih</th>
                    <th>Tutar</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td className="ps-4 fw-bold">{order.customer}</td>
                      <td className="text-muted small">{order.date}</td>
                      <td className="fw-bold text-dark">{order.total} ₺</td>
                      <td>
                        <span className={`badge rounded-pill fw-normal px-2 ${order.status === 'Teslim Edildi' ? 'bg-success bg-opacity-10 text-success' : order.status === 'İptal' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-warning bg-opacity-10 text-warning'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white p-4 border-0">
              <h5 className="fw-bold m-0 text-danger"><i className="bi bi-exclamation-triangle-fill me-2"></i>Kritik Stok</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {criticalStockList.length > 0 ? (
                  criticalStockList.slice(0, 5).map(prod => (
                    <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3 border-0">
                      <div className="d-flex align-items-center">
                        <img src={`/images/${prod.image}`} alt="img" className="rounded-circle me-3 border" style={{ width: '40px', height: '40px', objectFit: 'cover' }} onError={(e)=>{e.target.src="https://via.placeholder.com/40"}} />
                        <div>
                          <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{prod.name}</div>
                          <small className="text-muted">Kategori: {prod.category}</small>
                        </div>
                      </div>
                      <span className="badge bg-danger rounded-pill">Son {prod.stock}</span>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-check-circle fs-1 text-success d-block mb-2"></i>
                    Stok durumu harika!
                  </div>
                )}
              </ul>
            </div>
            {criticalStockList.length > 0 && (
              <div className="card-footer bg-white border-0 p-3 text-center">
                 <Link to="stok" className="btn btn-sm btn-outline-danger w-100 rounded-pill">Stok Yönetimine Git</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STOK YÖNETİMİ BİLEŞENİ ---
const StockManagement = () => {
  const { products, updateProduct, addProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: categories[1], description: "", seller: sellersList[0], price: "", stock: "", image: "" });

  const updateStock = (id, amount) => {
    const productToUpdate = products.find(p => p.id === id);
    if (productToUpdate) {
      const newStock = Math.max(0, productToUpdate.stock + amount);
      updateProduct({ ...productToUpdate, stock: newStock });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return alert("Eksik bilgi!");
    const productToAdd = { id: Date.now(), ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock), rating: 0, image: newProduct.image || "teraryum.jpg" };
    addProduct(productToAdd);
    setShowModal(false);
    setNewProduct({ name: "", category: categories[1], description: "", seller: sellersList[0], price: "", stock: "", image: "" });
  };

  return (
    <div className="container-fluid p-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Stok Yönetimi</h2>
        <button className="btn btn-success rounded-pill px-4" onClick={() => setShowModal(true)}><i className="bi bi-plus-lg me-2"></i>Yeni Ürün</button>
      </div>
      {/* Modal ve Tablo kodları aynı şekilde devam edecek (Context bağlı) */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 className="fw-bold mb-4">Yeni Ürün Ekle</h4>
            <div className="row g-3">
              <div className="col-md-6"><label className="small fw-bold">Ürün Adı</label><input className="form-control" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} /></div>
              <div className="col-md-6"><label className="small fw-bold">Kategori</label><select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>{categories.filter(c => c !== "Tümü").map((cat, i) => <option key={i} value={cat}>{cat}</option>)}</select></div>
              <div className="col-12"><label className="small fw-bold">Açıklama</label><textarea className="form-control" rows="2" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea></div>
              <div className="col-md-6"><label className="small fw-bold">Satıcı</label><select className="form-select" value={newProduct.seller} onChange={(e) => setNewProduct({...newProduct, seller: e.target.value})}>{sellersList.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div>
              <div className="col-md-6"><label className="small fw-bold">Görsel (dosya.jpg)</label><input className="form-control" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} /></div>
              <div className="col-md-6"><label className="small fw-bold">Fiyat</label><input type="number" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} /></div>
              <div className="col-md-6"><label className="small fw-bold">Stok</label><input type="number" className="form-control" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} /></div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4"><button className="btn btn-light" onClick={() => setShowModal(false)}>İptal</button><button className="btn btn-success" onClick={handleAddProduct}>Kaydet</button></div>
          </div>
        </div>
      )}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary"><tr><th className="py-3 ps-4">Ürün</th><th>Kategori</th><th>Satıcı</th><th>Fiyat</th><th className="text-center">Stok</th><th className="text-center">İşlem</th><th className="text-center">Durum</th></tr></thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="ps-4"><div className="d-flex align-items-center"><img src={`/images/${product.image}`} className="rounded me-3 border" style={{ width: '40px', height: '40px', objectFit: 'cover' }} onError={(e)=>{e.target.src="https://via.placeholder.com/40"}} alt="" /><span className="fw-semibold text-dark">{product.name}</span></div></td>
                  <td><span className="badge bg-light text-secondary border">{product.category}</span></td>
                  <td><small className="text-muted fw-bold">{product.seller}</small></td>
                  <td className="fw-bold text-secondary">{product.price} TL</td>
                  <td className="text-center"><span className={`fs-5 fw-bold ${product.stock === 0 ? 'text-muted' : product.stock <= 5 ? 'text-danger' : 'text-success'}`}>{product.stock}</span></td>
                  <td className="text-center"><div className="btn-group shadow-sm"><button className="btn btn-sm btn-outline-secondary" onClick={() => updateStock(product.id, -1)}>-</button><button className="btn btn-sm btn-outline-success" onClick={() => updateStock(product.id, 1)}>+</button></div></td>
                  <td className="text-center">{product.stock === 0 ? <span className="badge bg-secondary">Tükendi</span> : product.stock <= 5 ? <span className="badge bg-warning text-dark">Kritik</span> : <span className="badge bg-success">Stokta</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- ANA ADMIN LAYOUT ---
const AdminDashboard = () => {
  return (
    <div className="d-flex bg-light" style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <div className="flex-grow-1" style={{ overflowY: 'auto', height: '100vh' }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="stok" element={<StockManagement />} />
          <Route path="saticilar" element={<AdminSellers />} />
          <Route path="siparisler" element={<AdminOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;