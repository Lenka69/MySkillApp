import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Semua field wajib diisi.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak sama.');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      login(response.data.token, response.data.user);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Register gagal. Silakan coba lagi.');
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

          <h1>Learn practical skills from real SMK projects.</h1>

          <p>
            Daftar untuk mengakses panduan praktik teknik, membaca artikel,
            menonton tutorial, dan mempelajari skill terapan dari hasil praktik siswa SMK.
          </p>

          <div className="auth-stats">
            <div className="auth-stat-card">Otomotif</div>
            <div className="auth-stat-card">Kelistrikan</div>
            <div className="auth-stat-card">Bangunan</div>
            <div className="auth-stat-card">Elektronika</div>
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

            <h2>Create Your Account</h2>
            <p>Daftar untuk mulai mengakses konten praktik teknik SMK.</p>
          </div>

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                className="form-input"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

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
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Konfirmasi Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button className="primary-button" type="submit">
              Register
            </button>
          </form>

          <div className="auth-switch">
            Sudah punya akun? <Link to="/login">Login di sini</Link>
          </div>
        </div>
      </section>
    </main>
  );
}