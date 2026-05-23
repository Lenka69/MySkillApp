import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Gauge,
  Hammer,
  LogOut,
  Package,
  PlayCircle,
  ShieldAlert,
  UserRound,
  Wrench
} from 'lucide-react';

import api from '../services/api';

const fallbackImage =
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useMemo(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get(`/contents/${id}`);
        const data = response.data.content || response.data;
        setContent(data);
      } catch (error) {
        console.error('Gagal mengambil detail konten:', error);
        alert('Konten tidak ditemukan atau sesi login berakhir.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url || url.includes('example')) return '';

    if (url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return '';
  };

  if (loading) {
    return (
      <main className="detail-page">
        <div className="detail-loading">Memuat detail konten...</div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="detail-page">
        <div className="detail-loading">Konten tidak ditemukan.</div>
      </main>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(content.videoUrl);

  return (
    <main className="detail-page">
      <nav className="home-navbar">
        <div className="home-brand" onClick={() => navigate('/')}>
          <div className="home-logo">
            <Wrench size={22} />
          </div>
          <span>MySkill</span>
        </div>

        <div className="home-user-area">
          <span className="home-user-name">
            {currentUser?.name || currentUser?.email || 'User'}
          </span>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </nav>

      <section className="detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={18} />
          Kembali ke Home
        </button>

        <article className="detail-card">
          <div className="detail-image-wrapper">
            <img
              src={content.imageUrl || fallbackImage}
              alt={content.title}
              className="detail-image"
            />

            <div className="detail-image-overlay">
              <span>{content.category || 'Teknik SMK'}</span>
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-badges">
              <span>{content.category || 'Teknik SMK'}</span>
              <span>{content.difficulty || 'Mudah'}</span>
              <span>{content.duration || '20 menit'}</span>
            </div>

            <h1>{content.title}</h1>

            <p className="detail-description">
              {content.description}
            </p>

            <div className="detail-info-grid">
              <InfoCard
                icon={<BookOpen size={20} />}
                label="Bidang"
                value={content.field || 'Teknik SMK'}
              />

              <InfoCard
                icon={<PlayCircle size={20} />}
                label="Format"
                value={content.format || 'Artikel + Video'}
              />

              <InfoCard
                icon={<UserRound size={20} />}
                label="Penulis"
                value={content.author || 'Siswa SMK'}
              />

              <InfoCard
                icon={<Clock size={20} />}
                label="Estimasi"
                value={content.duration || '20 menit'}
              />

              <InfoCard
                icon={<Gauge size={20} />}
                label="Kesulitan"
                value={content.difficulty || 'Mudah'}
              />
            </div>

            <section className="detail-section">
              <div className="detail-section-heading">
                <PlayCircle size={22} />
                <h2>Video Praktik</h2>
              </div>

              {embedUrl ? (
                <div className="video-embed-wrapper">
                  <iframe
                    src={embedUrl}
                    title={content.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="video-placeholder">
                  <PlayCircle size={44} />
                  <div>
                    <strong>Video tutorial belum tersedia</strong>
                    <p>
                      Placeholder ini dapat diganti dengan link YouTube asli
                      saat dokumentasi konten sudah lengkap.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="detail-section">
              <div className="detail-section-heading">
                <Hammer size={22} />
                <h2>Alat dan Bahan</h2>
              </div>

              <div className="tools-materials-grid">
                <ListBox
                  icon={<Hammer size={20} />}
                  title="Alat yang Dibutuhkan"
                  items={content.tools}
                  emptyText="Belum ada data alat."
                />

                <ListBox
                  icon={<Package size={20} />}
                  title="Bahan yang Dibutuhkan"
                  items={content.materials}
                  emptyText="Belum ada data bahan."
                />
              </div>
            </section>

            <section className="detail-section">
              <div className="detail-section-heading">
                <BookOpen size={22} />
                <h2>Langkah-langkah Praktik</h2>
              </div>

              <div className="steps-list">
                {(content.steps || []).length > 0 ? (
                  content.steps.map((step, index) => (
                    <div className="step-item" key={index}>
                      <div className="step-number">{index + 1}</div>
                      <p>{step}</p>
                    </div>
                  ))
                ) : (
                  <div className="detail-empty-box">
                    Belum ada langkah-langkah praktik.
                  </div>
                )}
              </div>
            </section>

            <section className="safety-section">
              <div className="detail-section-heading safety-heading">
                <ShieldAlert size={23} />
                <h2>Tips Keselamatan Kerja</h2>
              </div>

              <div className="safety-list">
                {(content.safetyTips || []).length > 0 ? (
                  content.safetyTips.map((tip, index) => (
                    <div className="safety-item" key={index}>
                      <ShieldAlert size={18} />
                      <p>{tip}</p>
                    </div>
                  ))
                ) : (
                  <p>Belum ada tips keselamatan kerja.</p>
                )}
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="detail-info-card">
      <div className="detail-info-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function ListBox({ icon, title, items = [], emptyText }) {
  return (
    <div className="list-box">
      <div className="list-box-title">
        {icon}
        <h3>{title}</h3>
      </div>

      {(items || []).length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="list-empty">{emptyText}</p>
      )}
    </div>
  );
}