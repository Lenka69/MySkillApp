import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Detail() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/contents/${id}`).then(res => setContent(res.data));
  }, [id]);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => navigate('/')} className="mb-4 text-blue-600">← Kembali</button>
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Langkah-langkah</h3>
            <ul className="list-decimal pl-5">{content.steps.map((s,i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div>
            <h3 className="font-bold text-red-600">Safety Tips</h3>
            <ul className="list-disc pl-5 text-red-600">{content.safetyTips.map((s,i) => <li key={i}>{s}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}