// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminSellers from './admin/AdminSellers'; 
import AdminOrders from './admin/AdminOrders'; 

// MERKEZİ VERİ VE KATEGORİLER IMPORT EDİLDİ
import { allProducts, categories } from '../data/products';

// SATICI LİSTESİ (Modalda seçim için)
const sellersList = ["Cam Dünyası", "Yeşil Sera", "Hobi Market", "Taş Dünyası", "Doğa Sanat"];

// --- DASHBOARD HOME BİLEŞENİ ---
const DashboardHome = ({ inventory }) => {
  const totalProducts = inventory.length;
  const criticalItems = inventory.filter(i => i.stock > 0 && i.stock <= 5).length;
  const outOfStock = inventory.filter(i => i.stock === 0).length;
  const uniqueSellers = [...new Set(inventory.map(item => item.seller))].length;

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold text-dark mb-4">Panel Özeti</h2>
      <div className="row g-4 mb-5">
        <div className="col-md-3"><div className="card text-white bg-primary h-100 rounded-4 shadow-sm border-0"><div className="card-body"><div><h6 className="card-title text-white-50">Toplam Ürün</h6><h2 className="fw-bold mb-0">{totalProducts}</h2></div><i className="bi bi-box-seam fs-1 opacity-50 position-absolute end-0 top-0 m-3"></i></div></div></div>
        <div className="col-md-3"><div className="card text-white bg-success h-100 rounded-4 shadow-sm border-0"><div className="card-body"><div><h6 className="card-title text-white-50">Aktif Satıcı</h6><h2 className="fw-bold mb-0">{uniqueSellers}</h2></div><i className="bi bi-shop fs-1 opacity-50 position-absolute end-0 top-0 m-3"></i></div></div></div>
        <div className="col-md-3"><div className="card text-dark bg-warning h-100 rounded-4 shadow-sm border-0"><div className="card-body"><div><h6 className="card-title text-black-50">Kritik Stok</h6><h2 className="fw-bold mb-0">{criticalItems}</h2></div><i className="bi bi-exclamation-triangle fs-1 opacity-50 position-absolute end-0 top-0 m-3"></i></div></div></div>
        <div className="col-md-3"><div className="card text-white bg-danger h-100 rounded-4 shadow-sm border-0"><div className="card-body"><div><h6 className="card-title text-white-50">Tükenenler</h6><h2 className="fw-bold mb-0">{outOfStock}</h2></div><i className="bi bi-x-circle fs-1 opacity-50 position-absolute end-0 top-0 m-3"></i></div></div></div>
      </div>
    </div>
  );
};

// --- STOK YÖNETİMİ BİLEŞENİ (GÜNCELLENDİ) ---
const StockManagement = ({ inventory, setInventory }) => {
  const [showModal, setShowModal] = useState(false);
  
  // DETAYLI FORM STATE
  const [newProduct, setNewProduct] = useState({
    name: "", 
    category: categories[1], // Varsayılan: Fanuslar
    description: "",
    seller: sellersList[0], // Varsayılan: İlk satıcı
    price: "", 
    stock: "",
    image: "" // Görsel ismi
  });

  const updateStock = (id, amount) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + amount);
        return { ...item, stock: newStock };
      }
      return item;
    }));
  };

  const handleAddProduct = () => {
    // Basit Validasyon
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.description) {
      return alert("Lütfen tüm zorunlu alanları doldurun!");
    }

    const productToAdd = {
      id: inventory.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      rating: 0, // Yeni ürün
      image: newProduct.image || "teraryum.jpg" // Görsel girilmezse varsayılan
    };

    setInventory([...inventory, productToAdd]);
    setShowModal(false);
    setNewProduct({ name: "", category: categories[1], description: "", seller: sellersList[0], price: "", stock: "", image: "" });
  };

  return (
    <div className="container-fluid p-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Stok Yönetimi</h2>
        <button className="btn btn-success rounded-pill px-4" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-2"></i>Yeni Ürün
        </button>
      </div>

      {/* --- GELİŞMİŞ MODAL --- */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h4 className="fw-bold mb-4 border-bottom pb-2">Yeni Ürün Ekle</h4>
            
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Ürün Adı *</label>
                <input type="text" className="form-control" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Kategori</label>
                <select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                  {categories.filter(c => c !== "Tümü").map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
              </div>
              
              <div className="col-12">
                <label className="form-label small fw-bold">Açıklama *</label>
                <textarea className="form-control" rows="2" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Satıcı</label>
                <select className="form-select" value={newProduct.seller} onChange={(e) => setNewProduct({...newProduct, seller: e.target.value})}>
                  {sellersList.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Görsel Dosya Adı</label>
                <input type="text" className="form-control" placeholder="örn: vazo.jpg" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Fiyat (TL) *</label>
                <input type="number" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Stok Adedi *</label>
                <input type="number" className="form-control" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button className="btn btn-light" onClick={() => setShowModal(false)}>İptal</button>
              <button className="btn btn-success px-4" onClick={handleAddProduct}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TABLO (GÖRSEL EKLENDİ) --- */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 ps-4">Ürün</th> {/* Görsel + İsim */}
                <th>Kategori</th>
                <th>Satıcı</th>
                <th>Fiyat</th>
                <th className="text-center">Stok</th>
                <th className="text-center">İşlem</th>
                <th className="text-center">Durum</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((product) => (
                <tr key={product.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <img 
                        src={`/images/${product.image}`} 
                        alt={product.name}
                        className="rounded-3 me-3 border"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
                      />
                      <span className="fw-semibold text-dark">{product.name}</span>
                    </div>
                  </td>
                  <td><span className="badge bg-light text-secondary border">{product.category}</span></td>
                  <td><small className="text-muted fw-bold">{product.seller}</small></td>
                  <td className="fw-bold text-secondary">{product.price} TL</td>
                  <td className="text-center">
                    <span className={`fs-5 fw-bold ${product.stock === 0 ? 'text-muted' : product.stock <= 5 ? 'text-danger' : 'text-success'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="btn-group shadow-sm">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => updateStock(product.id, -1)}><i className="bi bi-dash"></i></button>
                      <button className="btn btn-sm btn-outline-success" onClick={() => updateStock(product.id, 1)}><i className="bi bi-plus"></i></button>
                    </div>
                  </td>
                  <td className="text-center">
                    {product.stock === 0 ? <span className="badge bg-secondary">Tükendi</span> : 
                     product.stock <= 5 ? <span className="badge bg-warning text-dark">Kritik</span> : 
                     <span className="badge bg-success">Stokta</span>}
                  </td>
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
  const [inventory, setInventory] = useState(allProducts);

  return (
    <div className="d-flex bg-light" style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <div className="flex-grow-1" style={{ overflowY: 'auto', height: '100vh' }}>
        <Routes>
          <Route path="/" element={<DashboardHome inventory={inventory} />} />
          <Route path="stok" element={<StockManagement inventory={inventory} setInventory={setInventory} />} />
          <Route path="saticilar" element={<AdminSellers />} />
          <Route path="siparisler" element={<AdminOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;