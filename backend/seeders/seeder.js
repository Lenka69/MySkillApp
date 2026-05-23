// backend/seeders/seeder.js

require('dotenv').config();

const connectDB = require('../config/db');
const Content = require('../models/Content');

const contents = [
  {
    title: 'Cara Mengganti Oli Motor',
    category: 'Otomotif',
    description: 'Panduan dasar mengganti oli motor secara aman untuk siswa SMK jurusan teknik otomotif.',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Kunci ring', 'Wadah oli bekas', 'Corong', 'Lap kain', 'Sarung tangan'],
    materials: ['Oli mesin baru', 'Seal ring baut oli jika diperlukan'],
    steps: [
      'Parkir motor di tempat datar dan aman.',
      'Panaskan mesin selama 2–3 menit agar oli lebih mudah mengalir.',
      'Matikan mesin dan siapkan wadah penampung oli bekas.',
      'Buka baut pembuangan oli menggunakan kunci yang sesuai.',
      'Tunggu sampai oli lama keluar sepenuhnya.',
      'Pasang kembali baut pembuangan oli dengan rapat.',
      'Tuangkan oli baru sesuai kapasitas mesin.',
      'Nyalakan mesin sebentar dan cek apakah ada kebocoran.'
    ],
    safetyTips: [
      'Gunakan sarung tangan.',
      'Jangan membuka baut oli saat mesin terlalu panas.',
      'Buang oli bekas pada tempat yang sesuai.'
    ],
    difficulty: 'Mudah',
    duration: '20 menit',
    field: 'Teknik Kendaraan Ringan',
    format: 'Artikel + Video',
    author: 'Siswa Teknik Otomotif'
  },
  {
    title: 'Memasang Stop Kontak Rumah',
    category: 'Kelistrikan',
    description: 'Tutorial memasang stop kontak rumah sederhana dengan memperhatikan prosedur keselamatan kerja.',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Obeng plus', 'Obeng minus', 'Tespen', 'Tang potong', 'Isolasi listrik'],
    materials: ['Stop kontak', 'Kabel listrik'],
    steps: [
      'Matikan sumber listrik utama terlebih dahulu.',
      'Periksa kabel menggunakan tespen.',
      'Kupas ujung kabel secukupnya.',
      'Pasang kabel pada terminal stop kontak.',
      'Kencangkan baut terminal.',
      'Pasang stop kontak ke dinding.',
      'Nyalakan listrik dan lakukan pengujian.'
    ],
    safetyTips: [
      'Pastikan listrik sudah dimatikan sebelum bekerja.',
      'Gunakan alat dengan gagang isolator.',
      'Jangan menyentuh kabel terbuka.'
    ],
    difficulty: 'Sedang',
    duration: '30 menit',
    field: 'Teknik Instalasi Tenaga Listrik',
    format: 'Artikel + Video',
    author: 'Siswa Teknik Kelistrikan'
  },
  {
    title: 'Membuat Rak Dinding Kayu Sederhana',
    category: 'Bangunan',
    description: 'Panduan membuat rak dinding sederhana dari kayu menggunakan alat dasar.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Gergaji', 'Bor', 'Meteran', 'Amplas', 'Obeng'],
    materials: ['Papan kayu', 'Sekrup', 'Bracket rak', 'Cat kayu'],
    steps: [
      'Ukur papan kayu sesuai ukuran rak yang diinginkan.',
      'Potong papan menggunakan gergaji.',
      'Haluskan permukaan kayu dengan amplas.',
      'Pasang bracket pada papan.',
      'Bor dinding sesuai titik pemasangan.',
      'Pasang rak ke dinding menggunakan sekrup.',
      'Periksa kekuatan rak sebelum digunakan.'
    ],
    safetyTips: [
      'Gunakan kacamata pelindung saat memotong kayu.',
      'Pastikan posisi bor stabil.',
      'Jauhkan tangan dari mata gergaji.'
    ],
    difficulty: 'Sedang',
    duration: '60 menit',
    field: 'Teknik Konstruksi',
    format: 'Artikel + Video',
    author: 'Siswa Teknik Bangunan'
  },
  {
    title: 'Membersihkan Filter Udara Motor',
    category: 'Otomotif',
    description: 'Langkah membersihkan filter udara motor agar performa mesin tetap baik.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Obeng', 'Kuas kecil', 'Kompresor angin', 'Lap kain'],
    materials: ['Cairan pembersih filter jika diperlukan'],
    steps: [
      'Matikan motor dan pastikan mesin dalam kondisi dingin.',
      'Buka cover filter udara.',
      'Lepaskan filter udara dari rumah filter.',
      'Bersihkan debu menggunakan kuas atau kompresor angin.',
      'Pasang kembali filter udara.',
      'Tutup kembali cover filter dengan rapat.'
    ],
    safetyTips: [
      'Jangan membersihkan filter dekat api.',
      'Gunakan masker jika filter sangat berdebu.',
      'Pastikan filter terpasang kembali dengan benar.'
    ],
    difficulty: 'Mudah',
    duration: '15 menit',
    field: 'Teknik Kendaraan Ringan',
    format: 'Artikel',
    author: 'Siswa Teknik Otomotif'
  },
  {
    title: 'Membuat Lampu Belajar LED Sederhana',
    category: 'Elektronika',
    description: 'Praktik membuat lampu belajar sederhana menggunakan LED, resistor, saklar, dan baterai.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Solder', 'Timah solder', 'Tang potong', 'Multimeter'],
    materials: ['LED', 'Resistor', 'Saklar kecil', 'Baterai', 'Kabel jumper'],
    steps: [
      'Siapkan rangkaian LED, resistor, saklar, dan baterai.',
      'Hubungkan resistor ke kaki positif LED.',
      'Sambungkan saklar ke jalur baterai.',
      'Solder setiap sambungan dengan hati-hati.',
      'Uji rangkaian menggunakan baterai.',
      'Rapikan kabel dan casing lampu.'
    ],
    safetyTips: [
      'Hati-hati saat menggunakan solder panas.',
      'Periksa polaritas LED sebelum diuji.',
      'Jangan menyentuh ujung solder secara langsung.'
    ],
    difficulty: 'Sedang',
    duration: '45 menit',
    field: 'Teknik Elektronika',
    format: 'Artikel + Video',
    author: 'Siswa Teknik Elektronika'
  },
  {
    title: 'Memperbaiki Keran Bocor',
    category: 'Peralatan Rumah',
    description: 'Panduan sederhana memperbaiki keran bocor dengan mengganti karet atau seal keran.',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    tools: ['Kunci inggris', 'Obeng', 'Tang', 'Lap kain'],
    materials: ['Karet keran', 'Seal tape'],
    steps: [
      'Matikan aliran air utama.',
      'Buka bagian kepala keran menggunakan kunci.',
      'Lepaskan karet atau seal yang rusak.',
      'Ganti dengan karet atau seal baru.',
      'Pasang kembali kepala keran.',
      'Nyalakan air dan cek apakah masih bocor.'
    ],
    safetyTips: [
      'Pastikan aliran air sudah dimatikan.',
      'Jangan memutar keran terlalu keras.',
      'Gunakan kunci sesuai ukuran agar komponen tidak rusak.'
    ],
    difficulty: 'Mudah',
    duration: '20 menit',
    field: 'Perbaikan Rumah',
    format: 'Artikel',
    author: 'Siswa SMK'
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await Content.deleteMany();
    await Content.insertMany(contents);

    console.log('Seeder berhasil: data konten My Skill sudah dimasukkan.');
    process.exit(0);
  } catch (error) {
    console.error('Seeder gagal:', error.message);
    process.exit(1);
  }
};

seedData();