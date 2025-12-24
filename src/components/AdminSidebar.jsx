// src/components/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '260px', minHeight: '100vh' }}>
      {/* ANA LİNK DÜZELTİLDİ */}
      <Link to="/admin-dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-speedometer2 fs-3 me-2 text-success"></i>
        <span className="fs-5 fw-bold">Yönetici Paneli</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-1">
          {/* LİNKLER GÜNCELLENDİ: /admin -> /admin-dashboard */}
          <Link to="/admin-dashboard" className={`nav-link text-white ${activePath === '/admin-dashboard' || activePath === '/admin-dashboard/' ? 'active bg-success' : ''}`}>
            <i className="bi bi-grid-1x2-fill me-2"></i>
            Genel Bakış
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="/admin-dashboard/stok" className={`nav-link text-white ${activePath.includes('/stok') ? 'active bg-success' : ''}`}>
            <i className="bi bi-box-seam-fill me-2"></i>
            Stok Yönetimi
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="/admin-dashboard/saticilar" className={`nav-link text-white ${activePath.includes('/saticilar') ? 'active bg-success' : ''}`}>
            <i className="bi bi-shop me-2"></i>
            Satıcılar
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link to="/admin-dashboard/siparisler" className={`nav-link text-white ${activePath.includes('/siparisler') ? 'active bg-success' : ''}`}>
            <i className="bi bi-receipt me-2"></i>
            Siparişler
          </Link>
        </li>
      </ul>
      <hr />
      <div className="mt-auto">
        <Link to="/" className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-box-arrow-left"></i> Siteye Dön
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;