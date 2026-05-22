equire('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Content = require('../models/Content');
const connectDB = require('../config/db');

const dummyData = [
  {
    title: "Cara Mengganti Oli Motor Matic",
    category: "Otomotif",
    description: "Panduan dasar perawatan rutin.",
    imageUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    tools: ["Kunci ring 12 mm", "Wadah penampung", "Corong"],
    materials: ["Oli mesin baru"],
    steps: ["Panaskan mesin 3 menit", "Buka baut pembuangan oli", "Tampung oli bekas", "Isi oli baru"],
    safetyTips: ["Gunakan sarung tangan", "Jangan buang oli sembarangan"],
    difficulty: "Mudah",
    duration: "20 Menit"
  }
];

const seedData = async () => {
  await connectDB();
  await Content.deleteMany(); // Reset data
  await Content.insertMany(dummyData);
  console.log('Data Seeded!');
  process.exit();
};

seedData();