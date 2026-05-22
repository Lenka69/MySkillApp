import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-emerald-600 text-white p-2 rounded">Masuk</button>
        <p className="text-center text-sm">Belum punya akun? <Link to="/register" className="text-blue-600">Daftar</Link></p>
      </form>
    </div>
  );
}