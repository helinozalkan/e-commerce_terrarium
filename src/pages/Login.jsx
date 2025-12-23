// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Proje odak noktası sepet olduğu için basit bir admin kontrolü
    if (credentials.email === 'admin@terrarium.com' && credentials.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Geçersiz Admin bilgileri. Lütfen kontrol ediniz.');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', backgroundColor: '#f0f4f0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 p-4" style={{ borderRadius: '20px' }}>
              <div className="text-center mb-4">
                <i className="bi bi-shield-lock text-success" style={{ fontSize: '3rem' }}></i>
                <h2 className="fw-bold mt-2" style={{ color: '#2d4a27' }}>Yönetici Girişi</h2>
                <p className="text-muted small">Sadece yetkili personel erişim sağlayabilir.</p>
              </div>

              {error && <div className="alert alert-danger small py-2">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">E-Posta</label>
                  <input 
                    type="email" 
                    className="form-control rounded-pill px-3" 
                    placeholder="admin@terrarium.com"
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold">Şifre</label>
                  <input 
                    type="password" 
                    className="form-control rounded-pill px-3" 
                    placeholder="••••••••"
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-pill py-2 fw-bold" style={{ backgroundColor: '#2d4a27' }}>
                  Sisteme Giriş Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;