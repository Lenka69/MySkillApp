import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Password dan konfirmasi tidak cocok!');
    }
    if (password.length < 6) {
      return alert('Password minimal 6 karakter!');
    }

    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.token, res.data.user); // Langsung login setelah register
    } catch (err) {
      alert(err.response?.data?.message || 'Register gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Daftar Akun</h2>
        <input type="text" placeholder="Nama Lengkap" required className="w-full p-2 border rounded" onChange={e=>setName(e.target.value)} />
        <input type="email" placeholder="Email" required className="w-full p-2 border rounded" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password (Min 6)" required className="w-full p-2 border rounded" onChange={e=>setPassword(e.target.value)} />
        <input type="password" placeholder="Konfirmasi Password" required className="w-full p-2 border rounded" onChange={e=>setConfirmPassword(e.target.value)} />
        <button className="w-full bg-slate-900 text-white p-2 rounded">Daftar</button>
        <p className="text-center text-sm">Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
}
