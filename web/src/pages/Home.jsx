import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Wrench, Clock, Gauge, BookOpen } from 'lucide-react';

import api from '../services/api';

const categories = [
  'Semua',
  'Kelistrikan',
  'Bangunan',
  'Otomotif',
  'Elektronika',
  'Peralatan Rumah'
];

const fallbackImage =
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop';

export default function Home() {
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');
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
    const fetchContents = async () => {
      try {
        const response = await api.get('/contents');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.contents || [];

        setContents(data);
      } catch (error) {
        console.error('Gagal mengambil konten:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  const filteredContents = contents.filter((item) => {
    const matchCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;

    const keyword = search.toLowerCase();

    const matchSearch =
      item.title?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <main className="home-page">
      <nav className="home-navbar">
        <div className="home-brand" onClick={() => navigate('/')}>
          <div className="home-logo">
            <Wrench size={22} />
          </div>
          <span>MySkill</span>
        </div>

        <div className="home-user-area">
        {currentUser?.role === 'admin' && (
            <button className="admin-button" onClick={() => navigate('/admin')}>
            Admin Panel
            </button>
        )}

        <span className="home-user-name">
            {currentUser?.name || currentUser?.email || 'User'}
        </span>

        <button className="logout-button" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
        </button>
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero-content">
          <div className="hero-badge">
            Platform Praktik Teknik SMK
          </div>

          <h1>Pelajari Skill Praktik Teknik dari Hasil Karya Siswa SMK</h1>

          <p>
            Temukan panduan membuat barang, memperbaiki kendaraan,
            mempelajari kelistrikan, elektronika, bangunan, dan perbaikan
            rumah melalui artikel serta video praktik.
          </p>

          <div className="hero-stats">
            <div>
              <strong>{contents.length}</strong>
              <span>Konten Praktik</span>
            </div>
            <div>
              <strong>{categories.length - 1}</strong>
              <span>Kategori</span>
            </div>
            <div>
              <strong>SMK</strong>
              <span>Technical Skill</span>
            </div>
          </div>
        </div>

        <div className="home-hero-card">
          <BookOpen size={42} />
          <h3>Belajar dari praktik nyata</h3>
          <p>
            Setiap konten berisi alat, bahan, langkah pengerjaan,
            dan tips keselamatan kerja.
          </p>
        </div>
      </section>

      <section className="home-toolbar">
        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Cari judul konten, contoh: oli, stop kontak, rak kayu..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? 'category-chip active'
                  : 'category-chip'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Konten Praktik Terbaru</h2>
            <p>
              Pilih salah satu konten untuk melihat detail alat, bahan,
              langkah-langkah, dan tips keselamatan.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Memuat konten...</div>
        ) : filteredContents.length === 0 ? (
          <div className="empty-state">
            Tidak ada konten yang sesuai dengan pencarian atau kategori.
          </div>
        ) : (
          <div className="content-grid">
            {filteredContents.map((item) => (
              <article className="content-card" key={item._id}>
                <div className="content-image-wrapper">
                  <img
                    src={item.imageUrl || fallbackImage}
                    alt={item.title}
                    className="content-image"
                  />

                  <span className="content-category">
                    {item.category}
                  </span>
                </div>

                <div className="content-body">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="content-meta">
                    <span>
                      <Gauge size={15} />
                      {item.difficulty || 'Mudah'}
                    </span>

                    <span>
                      <Clock size={15} />
                      {item.duration || '20 menit'}
                    </span>
                  </div>

                  <button
                    className="detail-button"
                    onClick={() => navigate(`/contents/${item._id}`)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}