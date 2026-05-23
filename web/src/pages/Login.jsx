import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api, { shouldRetryRequest, wakeServer } from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [serverReady, setServerReady] = useState(false);
  const [serverStatus, setServerStatus] = useState('Menyiapkan server Render...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prepareServer = async () => {
      setServerReady(false);
      setServerStatus('Menyiapkan server Render... Login pertama mungkin membutuhkan beberapa detik.');

      const isReady = await wakeServer();

      if (isReady) {
        setServerReady(true);
        setServerStatus('Server siap digunakan.');
      } else {
        setServerReady(true);
        setServerStatus('Server sedang bangun. Silakan coba login, proses pertama mungkin sedikit lebih lama.');
      }
    };

    prepareServer();
  }, []);

  const loginWithRetry = async () => {
    try {
      return await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });
    } catch (firstError) {
      if (!shouldRetryRequest(firstError)) {
        throw firstError;
      }

      setServerStatus('Server Render sedang bangun. Mencoba ulang login...');
      await wakeServer();

      await new Promise((resolve) => setTimeout(resolve, 2500));

      return await api.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Email dan password wajib diisi.');
      return;
    }

    try {
      setLoading(true);

      const response = await loginWithRetry();

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
      console.error('LOGIN ERROR:', error.response?.data || error.message);

      if (error.response) {
        setErrorMessage(
          error.response.data?.message ||
            'Login gagal. Periksa kembali email dan password Anda.'
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

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Memproses...' : serverReady ? 'Login' : 'Menyiapkan server...'}
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