// src/pages/admin/AdminOrders.jsx
import React, { useState } from 'react';
import { allOrders } from '../../data/orders'; // YENİ: Veri dosyasını import ettik

const AdminOrders = () => {
  // Mock data yerine import ettiğimiz veriyi kullanıyoruz
  const [orders, setOrders] = useState(allOrders);

  // Sipariş Durumu Güncelleme
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  // Renkli Durum Rozetleri
  const getStatusBadge = (status) => {
    switch (status) {
      case "Yeni Sipariş": return "bg-primary";
      case "Hazırlanıyor": return "bg-warning text-dark";
      case "Kargolandı": return "bg-info text-dark";
      case "Teslim Edildi": return "bg-success";
      case "İptal": return "bg-danger";
      case "İade Edildi": return "bg-danger";
      case "İade Talebi": return "bg-secondary";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Sipariş Yönetimi</h2>
        <div className="text-muted">
          Toplam <span className="fw-bold text-success">{orders.length}</span> Sipariş
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 ps-4">Sipariş No</th>
                <th>Müşteri</th>
                <th>Tarih</th>
                <th>Ürün Adedi</th>
                <th>Tutar</th>
                <th className="text-center">Durum</th>
                <th className="text-center">Yönetim</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4 fw-bold text-dark">#{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="text-muted small">{order.date}</td>
                  <td>{order.items} adet</td>
                  <td className="fw-bold text-dark">{order.total.toFixed(2)} TL</td>
                  
                  <td className="text-center">
                    <span className={`badge ${getStatusBadge(order.status)} px-3 py-2 rounded-pill`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="dropdown">
                      <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        İşlem
                      </button>
                      <ul className="dropdown-menu shadow border-0">
                        <li><h6 className="dropdown-header">Durum Güncelle</h6></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus(order.id, "Hazırlanıyor")}>Hazırlanıyor</button></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus(order.id, "Kargolandı")}>Kargolandı</button></li>
                        <li><button className="dropdown-item" onClick={() => updateStatus(order.id, "Teslim Edildi")}>Teslim Edildi</button></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><button className="dropdown-item text-danger" onClick={() => updateStatus(order.id, "İptal")}>Siparişi İptal Et</button></li>
                      </ul>
                    </div>
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

export default AdminOrders;