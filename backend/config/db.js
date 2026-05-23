// backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI belum diatur di file .env');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:');
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;