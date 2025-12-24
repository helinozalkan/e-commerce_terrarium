// src/pages/admin/AdminSellers.jsx
import React, { useState } from 'react';
import { useSellers } from '../../context/SellerContext';

const AdminSellers = () => {
  const { sellers, addSeller, updateSellerStatus, deleteSeller } = useSellers();
  
  const [filter, setFilter] = useState("Hepsi"); // Filtreleme: Hepsi, Aktif, Onay Bekliyor
  const [showModal, setShowModal] = useState(false);
  
  // Yeni Satıcı Formu State'i
  const [newSeller, setNewSeller] = useState({
    name: "", shopName: "", email: "", phone: "", status: "Aktif"
  });

  // Tabloda gösterilecek veriyi filtrele
  const filteredSellers = sellers.filter(seller => {
    if (filter === "Hepsi") return true;
    if (filter === "Onay Bekliyor") return seller.status === "Onay Bekliyor";
    return seller.status !== "Onay Bekliyor"; // Aktif ve Pasifler
  });

  const handleAdd = () => {
    if(!newSeller.name || !newSeller.shopName) return alert("İsim ve Mağaza adı zorunludur!");
    addSeller(newSeller);
    setShowModal(false);
    setNewSeller({ name: "", shopName: "", email: "", phone: "", status: "Aktif" });
  };

  return (
    <div className="container-fluid p-4">
      {/* Üst Başlık ve Buton */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark">Satıcı Yönetimi</h2>
          <p className="text-muted mb-0">Platformdaki mağazaları ve başvuruları yönetin.</p>
        </div>
        <button className="btn btn-success rounded-pill px-4" onClick={() => setShowModal(true)}>
          <i className="bi bi-person-plus-fill me-2"></i>Yeni Satıcı Ekle
        </button>
      </div>

      {/* Filtre Butonları (Tablar) */}
      <div className="d-flex gap-2 mb-4">
        <button 
          className={`btn rounded-pill px-4 ${filter === 'Hepsi' ? 'btn-dark' : 'btn-outline-secondary border-0'}`}
          onClick={() => setFilter("Hepsi")}
        >
          Tümü ({sellers.length})
        </button>
        <button 
          className={`btn rounded-pill px-4 ${filter === 'Aktif' ? 'btn-success' : 'btn-outline-secondary border-0'}`}
          onClick={() => setFilter("Aktif")}
        >
          Mevcut Satıcılar
        </button>
        <button 
          className={`btn rounded-pill px-4 position-relative ${filter === 'Onay Bekliyor' ? 'btn-warning text-dark' : 'btn-outline-secondary border-0'}`}
          onClick={() => setFilter("Onay Bekliyor")}
        >
          Başvurular 
          {sellers.filter(s => s.status === 'Onay Bekliyor').length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {sellers.filter(s => s.status === 'Onay Bekliyor').length}
            </span>
          )}
        </button>
      </div>

      {/* Satıcı Tablosu */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 ps-4">Mağaza Adı</th>
                <th>Girişimci</th>
                <th>İletişim</th>
                <th>Katılım Tarihi</th>
                <th className="text-center">Durum</th>
                <th className="text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.length > 0 ? (
                filteredSellers.map((seller) => (
                  <tr key={seller.id}>
                    <td className="ps-4 fw-bold text-dark">{seller.shopName}</td>
                    <td>
                      <div className="fw-semibold">{seller.name}</div>
                    </td>
                    <td>
                      <div className="small text-muted"><i className="bi bi-envelope me-1"></i>{seller.email}</div>
                      <div className="small text-muted"><i className="bi bi-telephone me-1"></i>{seller.phone}</div>
                    </td>
                    <td className="text-muted small">{seller.joinDate}</td>
                    
                    <td className="text-center">
                      {seller.status === "Aktif" && <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">Aktif</span>}
                      {seller.status === "Pasif" && <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 rounded-pill">Pasif</span>}
                      {seller.status === "Onay Bekliyor" && <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill">Onay Bekliyor</span>}
                    </td>

                    <td className="text-center">
                      {seller.status === "Onay Bekliyor" ? (
                        <div className="btn-group">
                          <button className="btn btn-sm btn-success" onClick={() => updateSellerStatus(seller.id, "Aktif")} title="Onayla"><i className="bi bi-check-lg"></i> Onayla</button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteSeller(seller.id)} title="Reddet"><i className="bi bi-x-lg"></i> Reddet</button>
                        </div>
                      ) : (
                        <div className="dropdown">
                          <button className="btn btn-sm btn-light border rounded-pill px-3" type="button" data-bs-toggle="dropdown">
                            Yönet
                          </button>
                          <ul className="dropdown-menu border-0 shadow">
                            <li>
                              <button className="dropdown-item" onClick={() => updateSellerStatus(seller.id, seller.status === "Aktif" ? "Pasif" : "Aktif")}>
                                {seller.status === "Aktif" ? "Pasife Al" : "Aktifleştir"}
                              </button>
                            </li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><button className="dropdown-item text-danger" onClick={() => deleteSeller(seller.id)}>Sil</button></li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    Kayıt bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* YENİ SATICI EKLEME MODALI */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow-lg" style={{ width: '450px' }}>
            <h4 className="fw-bold mb-4">Yeni Satıcı Ekle</h4>
            
            <div className="mb-3">
              <label className="form-label small fw-bold">Girişimci Adı</label>
              <input type="text" className="form-control" value={newSeller.name} onChange={e => setNewSeller({...newSeller, name: e.target.value})} placeholder="Örn: Ayşe Yılmaz" />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Mağaza Adı</label>
              <input type="text" className="form-control" value={newSeller.shopName} onChange={e => setNewSeller({...newSeller, shopName: e.target.value})} placeholder="Örn: Terrarium Sanatı" />
            </div>
            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label small fw-bold">Email</label>
                <input type="email" className="form-control" value={newSeller.email} onChange={e => setNewSeller({...newSeller, email: e.target.value})} />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">Telefon</label>
                <input type="text" className="form-control" value={newSeller.phone} onChange={e => setNewSeller({...newSeller, phone: e.target.value})} />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">Durum</label>
              <select className="form-select" value={newSeller.status} onChange={e => setNewSeller({...newSeller, status: e.target.value})}>
                <option value="Aktif">Aktif (Direkt Onayla)</option>
                <option value="Onay Bekliyor">Onay Bekliyor (Başvuru)</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-light" onClick={() => setShowModal(false)}>İptal</button>
              <button className="btn btn-success" onClick={handleAdd}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellers;