import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Wrench } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <main className="admin-page">
      <section className="admin-card">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Kembali ke Home
        </button>

        <div className="admin-header">
          <div className="admin-icon">
            <ShieldCheck size={34} />
          </div>

          <div>
            <h1>Admin Panel MySkill</h1>
            <p>
              Halaman ini hanya dapat diakses oleh akun dengan role admin.
            </p>
          </div>
        </div>

        <div className="admin-info-grid">
          <div>
            <span>Nama Admin</span>
            <strong>{user?.name || 'Admin MySkill'}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user?.email || 'admin@myskill.com'}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{user?.role || 'admin'}</strong>
          </div>
        </div>

        <div className="admin-placeholder">
          <Wrench size={28} />
          <div>
            <h2>Manajemen Konten</h2>
            <p>
              Untuk versi pengembangan berikutnya, admin dapat diberi fitur
              tambah konten, edit konten, dan hapus konten praktik. Untuk saat
              ini, halaman ini sudah membuktikan bahwa sistem role admin berjalan.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}