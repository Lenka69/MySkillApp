import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api, { shouldRetryRequest, wakeServer } from '../services/api';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [serverReady, setServerReady] = useState(false);
  const [serverStatus, setServerStatus] = useState('Menyiapkan server Render...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prepareServer = async () => {
      setServerReady(false);
      setServerStatus('Menyiapkan server Render... Register pertama mungkin membutuhkan beberapa detik.');

      const isReady = await wakeServer();

      if (isReady) {
        setServerReady(true);
        setServerStatus('Server siap digunakan.');
      } else {
        setServerReady(true);
        setServerStatus('Server sedang bangun. Silakan coba register, proses pertama mungkin sedikit lebih lama.');
      }
    };

    prepareServer();
  }, []);

  const registerWithRetry = async () => {
    try {
      return await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
    } catch (firstError) {
      if (!shouldRetryRequest(firstError)) {
        throw firstError;
      }

      setServerStatus('Server Render sedang bangun. Mencoba ulang register...');
      await wakeServer();

      await new Promise((resolve) => setTimeout(resolve, 2500));

      return await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
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
      setLoading(true);

      const response = await registerWithRetry();

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('REGISTER ERROR:', error.response?.data || error.message);

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            'Register gagal. Silakan coba lagi.'
        );
      } else {
        setErrorMessage(
          'Tidak bisa terhubung ke server. Server Render mungkin sedang bangun, silakan coba lagi beberapa detik.'
        );
      }
    } finally {
      setLoading(false);
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

          <div
            style={{
              marginBottom: 16,
              padding: '12px 14px',
              borderRadius: 14,
              background: serverReady ? '#ecfdf5' : '#eff6ff',
              color: serverReady ? '#047857' : '#1d4ed8',
              border: serverReady ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.5
            }}
          >
            {serverStatus}
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

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : serverReady ? 'Register' : 'Menyiapkan server...'}
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