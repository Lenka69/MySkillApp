import React, { useState } from 'react';
import {
Car, Wrench, Zap, Cpu, Hammer, Droplets,
Search, User, Mail, Lock, ArrowLeft, PlayCircle,
LogOut, Menu, Clock, BarChart, FileText, AlertTriangle,
CheckCircle2, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
return twMerge(clsx(inputs));
}

// --- DATA ---
const categories = [
{ id: 'semua', name: 'Semua', icon: null },
{ id: 'otomotif', name: 'Otomotif', icon: Car },
{ id: 'kelistrikan', name: 'Kelistrikan', icon: Zap },
{ id: 'elektronika', name: 'Elektronika', icon: Cpu },
{ id: 'bangunan', name: 'Bangunan', icon: Hammer },
{ id: 'rumah-tangga', name: 'Rumah Tangga', icon: Droplets },
];

const contentData = [
{
id: 1,
title: "Cara Mengganti Oli Motor",
category: "Otomotif",
difficulty: "Mudah",
duration: "20 menit",
description: "Panduan dasar mengganti oli motor secara aman untuk pemula.",
fullDescription: "Tutorial ini menjelaskan cara mengganti oli motor secara sederhana dan aman. Materi ini cocok untuk siswa SMK jurusan teknik otomotif atau pengguna umum yang ingin memahami perawatan dasar kendaraan.",
tools: ["Kunci ring", "Wadah oli bekas", "Corong", "Lap kain", "Sarung tangan"],
materials: ["Oli mesin baru", "Seal ring baut oli jika diperlukan"],
steps: [
"Siapkan motor di tempat yang datar.",
"Panaskan mesin sebentar agar oli lebih mudah mengalir.",
"Matikan mesin dan siapkan wadah penampung oli.",
"Buka baut pembuangan oli menggunakan kunci yang sesuai.",
"Tunggu sampai oli lama keluar sepenuhnya.",
"Pasang kembali baut oli dengan rapat.",
"Tuangkan oli baru sesuai kapasitas mesin.",
"Tutup kembali lubang pengisian oli.",
"Nyalakan mesin dan periksa kebocoran.",
"Bersihkan alat dan area kerja."
],
safety: [
"Gunakan sarung tangan.",
"Jangan menyentuh bagian mesin yang terlalu panas.",
"Pastikan motor dalam posisi stabil.",
"Buang oli bekas pada tempat yang sesuai."
],
field: "Teknik Kendaraan Ringan",
format: "Artikel + Video",
image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop"
},
{
id: 2,
title: "Memasang Stop Kontak Rumah",
category: "Kelistrikan",
difficulty: "Sedang",
duration: "30 menit",
description: "Pelajari cara memasang stop kontak dengan memperhatikan keselamatan kerja.",
fullDescription: "Panduan praktis memasang stop kontak dinding untuk pemula, mencakup pemahaman jalur kabel listrik.",
tools: ["Obeng plus/minus", "Tang potong", "Tang kombinasi", "Testpen"],
materials: ["Stop kontak baru", "Kabel secukupnya", "Isolasi listrik"],
steps: [
"Matikan aliran listrik dari MCB utama.",
"Buka cover stop kontak lama.",
"Lepas kabel dari terminal.",
"Sambungkan kabel ke terminal stop kontak baru (fasa, netral, arde).",
"Pasang stop kontak ke inbow doos.",
"Nyalakan kembali MCB dan tes dengan testpen."
],
safety: [
"Pastikan aliran listrik benar-benar mati sebelum mulai.",
"Gunakan alat yang berisolator.",
"Gunakan alas kaki kering."
],
field: "Teknik Instalasi Tenaga Listrik",
format: "Artikel",
image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2000&auto=format&fit=crop"
},
{
id: 3,
title: "Membuat Rak Dinding Kayu",
category: "Bangunan",
difficulty: "Sedang",
duration: "60 menit",
description: "Tutorial membuat rak dinding sederhana menggunakan kayu dan alat dasar.",
fullDescription: "Proyek kreatif membuat rak dinding melayang untuk dekorasi atau penyimpanan praktis.",
tools: ["Gergaji", "Palu", "Bor listrik", "Meteran", "Pensil", "Waterpass"],
materials: ["Papan kayu", "Paku", "Sekrup", "Braket rak", "Amplas", "Pernis kayu"],
steps: [
"Ukur dan potong kayu sesuai ukuran yang diinginkan.",
"Amplas permukaan kayu hingga halus.",
"Beri lapisan pernis dan tunggu hingga kering.",
"Tentukan posisi rak di dinding menggunakan waterpass.",
"Bor lubang pada dinding dan pasang fisher.",
"Pasang braket dan tempelkan papan kayu."
],
safety: [
"Gunakan kacamata pelindung saat mengebor atau menggergaji.",
"Hati-hati saat menggunakan alat tajam."
],
field: "Teknik Bisnis Konstruksi dan Properti",
format: "Artikel + Video",
image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=2000&auto=format&fit=crop"
},
{
id: 4,
title: "Membersihkan Filter Udara Motor",
category: "Otomotif",
difficulty: "Mudah",
duration: "15 menit",
description: "Panduan membersihkan filter udara motor agar performa mesin tetap baik.",
fullDescription: "Pembersihan filter udara adalah bagian dari servis ringan yang bisa dilakukan sendiri di rumah.",
tools: ["Obeng plus"],
materials: ["Cairan pembersih khusus (jika filter tipe busa/cotton)"],
steps: [
"Buka baut cover filter udara dengan obeng.",
"Lepaskan filter udara dari boksnya.",
"Bersihkan kotoran (jika tipe kertas, cukup diketok perlahan atau ditiup kompresor ringan).",
"Pasang kembali filter udara.",
"Tutup cover dan kencangkan baut."
],
safety: [
"Jangan membersihkan filter kertas dengan air.",
"Pastikan posisi pemasangan filter tepat agar udara tidak bocor."
],
field: "Teknik Kendaraan Ringan",
format: "Artikel",
image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2000&auto=format&fit=crop"
},
{
id: 5,
title: "Membuat Lampu LED Sederhana",
category: "Elektronika",
difficulty: "Sedang",
duration: "45 menit",
description: "Praktik membuat lampu belajar menggunakan LED, resistor, dan baterai.",
fullDescription: "Dasar-dasar merangkai komponen elektronika untuk membuat lampu yang bermanfaat sehari-hari.",
tools: ["Solder", "Tang potong", "Pinset", "Penyedot timah"],
materials: ["Lampu LED", "Resistor", "Baterai 9V / USB kabel bekas", "Timah solder", "Kabel jumper"],
steps: [
"Siapkan skema rangkaian seri/paralel.",
"Hubungkan kaki positif LED ke resistor.",
"Solder sambungan agar kuat.",
"Hubungkan ujung resistor ke sumber daya positif.",
"Hubungkan kaki negatif LED ke sumber daya negatif.",
"Tes nyala lampu."
],
safety: [
"Hati-hati saat menggunakan solder panas.",
"Jangan sampai polaritas terbalik karena bisa merusak LED.",
"Gunakan pelindung mata dari asap solder."
],
field: "Teknik Audio Video / Elektronika",
format: "Artikel + Video",
image: "https://images.unsplash.com/photo-1517077304055-6e89abf092ba?q=80&w=2000&auto=format&fit=crop"
},
{
id: 6,
title: "Memperbaiki Keran Bocor",
category: "Rumah Tangga",
difficulty: "Mudah",
duration: "20 menit",
description: "Langkah-langkah memperbaiki keran bocor dengan alat sederhana.",
fullDescription: "Cara mudah mengatasi masalah keran bocor di rumah tanpa harus memanggil tukang ledeng.",
tools: ["Kunci inggris", "Obeng", "Lap kain"],
materials: ["Seal tape (Teflon tape)", "Karet seal baru (jika diperlukan)"],
steps: [
"Matikan aliran air utama.",
"Buka tuas keran menggunakan obeng.",
"Gunakan kunci inggris untuk melepas kepala keran.",
"Periksa karet seal, jika rusak ganti dengan yang baru.",
"Lilitkan seal tape pada ulir pipa.",
"Pasang kembali keran dan kencangkan.",
"Nyalakan air dan periksa apakah masih bocor."
],
safety: [
"Pastikan katup air utama benar-benar tertutup rapat sebelum membongkar."
],
field: "Teknik Bangunan Dasar",
format: "Artikel",
image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2000&auto=format&fit=crop"
}
];

// --- COMPONENTS ---
const Button = React.forwardRef(({ className, variant = 'primary', ...props }, ref) => {
return (
<button
ref={ref}
className={cn(
"inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
"h-11 px-6 py-2",
variant === 'primary' && "bg-slate-900 text-white hover:bg-slate-800",
variant === 'secondary' && "bg-emerald-600 text-white hover:bg-emerald-700",
variant === 'outline' && "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
className
)}
{...props}
/>
);
});
Button.displayName = "Button";

const Input = React.forwardRef(({ className, icon: Icon, ...props }, ref) => {
return (
<div className="relative">
{Icon && (
<Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
)}
<input
ref={ref}
className={cn(
"flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
Icon && "pl-10",
className
)}
{...props}
/>
</div>
);
});
Input.displayName = "Input";

export default function App() {
const [currentPage, setCurrentPage] = useState('login');
const [selectedContentId, setSelectedContentId] = useState(null);

const navigateTo = (page, id) => {
setCurrentPage(page);
if (id !== undefined) setSelectedContentId(id);
window.scrollTo(0, 0);
};

return (
  <>
    {currentPage === 'register' && <RegisterPage onNavigate={navigateTo} />}
    {currentPage === 'login' && <LoginPage onNavigate={navigateTo} />}
    {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
    {currentPage === 'detail' && selectedContentId !== null && (
      <DetailPage
        key="detail"
        content={contentData.find(c => c.id === selectedContentId)}
        onNavigate={navigateTo}
      />
    )}
  </>
);
}

function RegisterPage({ onNavigate }) {
return (
<motion.div
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
className="flex min-h-screen"
>
  {/* Left Side (Desktop) */}
  <div className="hidden lg:flex w-1/2 bg-slate-900 text-white relative overflow-hidden p-12 flex-col justify-between">
    <div className="absolute inset-0 opacity-20">
      <img
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop"
        alt="Workshop"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative z-10 flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
        <Wrench className="w-6 h-6 text-white" />
      </div>
      <span className="font-bold text-2xl tracking-tight">My Skill</span>
    </div>
    <div className="relative z-10 max-w-lg">
      <h1 className="text-5xl font-bold leading-tight mb-5">
        Learn practical skills from real SMK projects.
      </h1>
      <p className="text-slate-300 text-lg mb-8">
        Akses ratusan panduan praktik teknik, otomotif, kelistrikan, dan bangunan dalam satu genggaman.
      </p>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map(i => (
            <img
              key={i}
              src={`https://i.pravatar.cc/100?img=${i + 10}`}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-slate-900"
            />
          ))}
        </div>
        <span className="font-bold text-lg">+2k learners</span>
      </div>
    </div>
  </div>


  {/* Right Side */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">My Skill</span>
      </div>

      <h2 className="text-3xl font-bold mb-2 text-slate-900">Create Your Account</h2>
      <p className="text-slate-500 mb-8">Daftar untuk mulai mengakses konten praktik teknik SMK.</p>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('home'); }}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
          <Input icon={User} placeholder="Bagus Pratama" required />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input icon={Mail} type="email" placeholder="bagus@example.com" required />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <Input icon={Lock} type="password" placeholder="••••••••" required />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Konfirmasi Password</label>
          <Input icon={Lock} type="password" placeholder="••••••••" required />
        </div>

        <Button type="submit" className="w-full mt-6" variant="primary">
          Register
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Sudah punya akun?{' '}
        <button onClick={() => onNavigate('login')} className="text-emerald-600 font-medium hover:underline">
          Login di sini
        </button>
      </p>
    </div>
  </div>
</motion.div>


);
}

function LoginPage({ onNavigate }) {
return (
<motion.div
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
className="flex min-h-screen"
>
  {/* Left Side (Desktop) */}
  <div className="hidden lg:flex w-1/2 bg-slate-900 text-white relative overflow-hidden p-12 flex-col justify-between">
    <div className="absolute inset-0 opacity-20">
      <img
        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600&auto=format&fit=crop"
        alt="Technical practice"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative z-10 flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
        <Wrench className="w-6 h-6 text-white" />
      </div>
      <span className="font-bold text-2xl tracking-tight">My Skill</span>
    </div>
    <div className="relative z-10 max-w-lg">
      <h1 className="text-5xl font-bold leading-tight mb-5">
        Access your practical learning content.
      </h1>
      <p className="text-slate-300 text-lg">
        Lanjutkan belajar dan temukan inspirasi praktik teknik terbaru hari ini.
      </p>
    </div>
  </div>


  {/* Right Side */}
  <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">My Skill</span>
      </div>

      <h2 className="text-3xl font-bold mb-2 text-slate-900">Welcome Back</h2>
      <p className="text-slate-500 mb-8">Masuk untuk melanjutkan belajar dan melihat konten praktik.</p>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('home'); }}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input icon={Mail} type="email" placeholder="bagus@example.com" defaultValue="bagus@example.com" required />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <button type="button" className="text-xs text-emerald-600 hover:underline">Forgot password?</button>
          </div>
          <Input icon={Lock} type="password" placeholder="••••••••" defaultValue="password123" required />
        </div>

        <div className="flex items-center gap-2 pt-2 pb-4">
          <input type="checkbox" id="remember" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4" />
          <label htmlFor="remember" className="text-sm text-slate-500">Remember me</label>
        </div>

        <Button type="submit" className="w-full" variant="primary">
          Login
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Belum punya akun?{' '}
        <button onClick={() => onNavigate('register')} className="text-emerald-600 font-medium hover:underline">
          Register di sini
        </button>
      </p>
    </div>
  </div>
</motion.div>


);
}

function HomePage({ onNavigate }) {
const [activeCategory, setActiveCategory] = useState('semua');
const [searchQuery, setSearchQuery] = useState('');
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const filteredContent = contentData.filter(item => {
const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.description.toLowerCase().includes(searchQuery.toLowerCase());
const matchesCategory = activeCategory === 'semua' || item.category.toLowerCase() === activeCategory.replace('-', ' ');
return matchesSearch && matchesCategory;
});

return (
<motion.div
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
className="min-h-screen flex flex-col"
>
  {/* Navbar */}
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">My Skill</span>
      </div>


      <nav className="hidden md:flex items-center gap-6">
        <button className="text-sm font-semibold text-emerald-600">Home</button>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Categories</button>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">About</button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <User size={16} />
          </div>
          Bagus
        </div>
        <button onClick={() => onNavigate('login')} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
          <LogOut size={18} />
        </button>
      </div>

      <button className="md:hidden p-2 text-slate-700" onClick={() => setIsMobileMenuOpen(true)}>
        <Menu size={24} />
      </button>
    </div>
  </header>

  {/* Mobile Menu Overlay */}
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
        className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">My Skill</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg">
          <button className="text-left font-semibold text-emerald-600 py-2 border-b border-slate-100">Home</button>
          <button className="text-left font-medium text-slate-700 py-2 border-b border-slate-100">Categories</button>
          <button className="text-left font-medium text-slate-700 py-2 border-b border-slate-100">About</button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200">
              <User size={20} />
            </div>
            <div className="font-medium text-slate-900">Bagus Pratama</div>
          </div>
          <Button variant="outline" onClick={() => onNavigate('login')} className="w-full flex items-center justify-center gap-2 text-red-500 border-red-200 hover:bg-red-50">
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  <main className="flex-1">
    {/* Hero Section */}
    <section className="bg-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-white"><Wrench size={100} /></div>
        <div className="absolute bottom-10 right-20 text-white"><Zap size={120} /></div>
        <div className="absolute top-20 right-1/4 text-white"><Car size={80} /></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Pelajari Skill Praktik Teknik dari Siswa SMK
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto md:mx-0">
            Temukan panduan membuat barang, memperbaiki kendaraan, dan melakukan perbaikan rumah melalui artikel dan video praktik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500 border-0 h-12 px-8">
              Mulai Jelajahi Konten
            </Button>
          </div>
        </div>
        
        <div className="hidden lg:block w-[450px] aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop" 
            alt="Practical Skills" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* Search & Content Area */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-10 max-w-3xl mx-auto md:mx-0">
        <Input 
          icon={Search} 
          placeholder="Cari konten praktik, misalnya: ganti oli, instalasi listrik, rak kayu..." 
          className="bg-slate-50 border-transparent h-12 text-base focus-visible:ring-emerald-500 focus-visible:bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="mb-10 overflow-x-auto pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border",
                  isActive 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                )}
              >
                {Icon && <Icon size={16} className={cn(isActive ? "text-emerald-400" : "text-slate-400")} />}
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredContent.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 text-slate-900 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-5">
                  <div className="flex items-center gap-1">
                    <BarChart size={14} className="text-emerald-600" />
                    {item.difficulty}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-emerald-600" />
                    {item.duration}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300"
                  onClick={() => onNavigate('detail', item.id)}
                >
                  Lihat Detail
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredContent.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">Tidak ada konten yang ditemukan untuk "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-white border-t border-slate-200 py-8 text-center text-sm text-slate-500">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
          <Wrench className="w-3 h-3 text-white" />
        </div>
        <span className="font-bold text-base text-slate-900">My Skill</span>
      </div>
      <p>My Skill © 2026 — Practical Learning Platform for Vocational Students</p>
    </div>
  </footer>
</motion.div>


);
}

function DetailPage({ content, onNavigate }) {
return (
<motion.div
initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
className="min-h-screen bg-slate-50 flex flex-col"
>
  <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={18} />
        Kembali ke Home
      </button>
    </div>
  </header>


  <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 pb-20">
    {/* Header Section */}
    <div className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
        {content.title}
      </h1>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
          {content.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-slate-200 text-slate-700">
          {content.difficulty}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-slate-200 text-slate-700">
          {content.duration}
        </span>
      </div>
    </div>

    {/* Video / Image Placeholder */}
    <div className="relative aspect-video bg-slate-200 rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-md group cursor-pointer">
      <img src={content.image} alt={content.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600/90 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
          <PlayCircle size={40} className="ml-1" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="md:col-span-2 space-y-10">
        
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
            <FileText className="text-emerald-600" size={24} />
            Deskripsi
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">
            {content.fullDescription}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
            <CheckCircle2 className="text-emerald-600" size={24} />
            Langkah-langkah Praktik
          </h2>
          <div className="space-y-4">
            {content.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-200 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 font-bold rounded-lg flex items-center justify-center">
                  {idx + 1}
                </div>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-700">
              <AlertTriangle size={24} />
              Tips Keselamatan Kerja
            </h2>
            <ul className="space-y-3">
              {content.safety.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-amber-900">
                  <div className="mt-1 flex-shrink-0 text-amber-500">•</div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Informasi Singkat</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Kategori</span>
              <span className="font-semibold text-slate-900">{content.category}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Kesulitan</span>
              <span className="font-semibold text-slate-900">{content.difficulty}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Waktu</span>
              <span className="font-semibold text-slate-900">{content.duration}</span>
            </div>
            <div className="flex flex-col border-b border-slate-100 pb-2 gap-1">
              <span className="text-slate-500">Bidang</span>
              <span className="font-semibold text-slate-900">{content.field}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-500">Format</span>
              <span className="font-semibold text-slate-900">{content.format}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Alat & Bahan</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-700 mb-2">Alat yang Dibutuhkan:</h4>
            <ul className="space-y-1.5">
              {content.tools.map((tool, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> {tool}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-2">Bahan yang Dibutuhkan:</h4>
            <ul className="space-y-1.5">
              {content.materials.map((mat, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {mat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  </main>
</motion.div>


);
}
