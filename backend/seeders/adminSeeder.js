require('dotenv').config();

const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@myskill.com';
    const adminPassword = 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin sudah tersedia.');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: 'Admin MySkill',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Akun admin berhasil dibuat.');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);

    process.exit(0);
  } catch (error) {
    console.error('Gagal membuat admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();