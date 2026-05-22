import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/contents')
      .then(res => setContents(res.data))
      .catch(() => navigate('/login'));
  }, [navigate]);

  // Mengambil daftar kategori unik secara otomatis dari data
  const categories = ['Semua', ...new Set(contents.map(c => c.category))];

  // Logic pemfilteran (Pencarian & Kategori)
  const filteredContents = contents.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Semua' || c.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        
        {/* === FITUR PENCARIAN & FILTER === */}
        <div className="mb-8 space-y-4">
          <input 
            type="text" 
            placeholder="Cari judul konten (contoh: oli, kabel...)" 
            className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                  category === cat 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* === GRID KONTEN === */}
        {filteredContents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredContents.map(c => (
              <div 
                key={c._id} 
                className="bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer overflow-hidden hover:shadow-lg transition-all" 
                onClick={() => navigate(`/detail/${c._id}`)}
              >
                <img src={c.imageUrl} className="w-full h-48 object-cover"/>
                <div className="p-4">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block mb-2">
                    {c.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{c.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-500 text-lg">Konten praktik tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}