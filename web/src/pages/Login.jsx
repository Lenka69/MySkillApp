import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email dan password wajib diisi.');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      login(response.data.token, response.data.user);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-brand">
            <span className="auth-logo">M</span>
            <span>My Skill</span>
          </div>

          <h1>Access your practical learning content.</h1>

          <p>
            Lanjutkan belajar dan temukan berbagai panduan praktik teknik SMK,
            mulai dari otomotif, kelistrikan, elektronika, bangunan, sampai
            perbaikan rumah.
          </p>

          <div className="auth-stats">
            <div className="auth-stat-card">Artikel Praktik</div>
            <div className="auth-stat-card">Video Tutorial</div>
            <div className="auth-stat-card">SMK Technical Skill</div>
          </div>
        </div>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card-header">
            <div className="auth-brand">
              <span className="auth-logo">M</span>
              <span>My Skill</span>
            </div>

            <h2>Welcome Back</h2>
            <p>Masuk untuk melanjutkan belajar dan melihat konten praktik.</p>
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="auth-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <span>Forgot password?</span>
            </div>

            <button className="primary-button" type="submit">
              Login
            </button>
          </form>

          <div className="auth-switch">
            Belum punya akun? <Link to="/register">Register di sini</Link>
          </div>
        </div>
      </section>
    </main>
  );
}