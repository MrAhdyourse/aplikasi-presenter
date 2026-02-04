import React, { useState, useEffect } from 'react';
import {
    Cpu, 
    HardDrive, 
    Monitor, 
    Zap, 
    CheckCircle, 
    ArrowRight,  Laptop,
  Maximize2,
  Trophy,
  X,
  Star,
  ShieldCheck
} from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---

interface LaptopSpec {
  id: number;
  brand: string;
  model: string;
  folderName: string; // Folder foto: assets/laptops/{folderName}
  tagline: string;
  badge: "King of Budget" | "Compact & Light" | "Stylish Design";
  colors: {
    primary: string;
    accent: string;
    glow: string;
  };
  specs: {
    processor: string;
    ram: string;
    storage: string;
    screen: string;
  };
  pros: string[];
  cons: string[];
  verdict: string;
  score: {
    performance: number;
    design: number;
    portability: number;
  };
}

// --- DATA SOURCE ---

const laptops: LaptopSpec[] = [
  {
    id: 1,
    brand: "Advan",
    model: "Soulmate 14",
    folderName: "advan-soulmate",
    tagline: "Si Pekerja Keras yang Bisa Di-Upgrade",
    badge: "King of Budget",
    colors: {
      primary: "bg-blue-600",
      accent: "text-blue-400",
      glow: "shadow-blue-500/50"
    },
    specs: {
      processor: "Intel Celeron N4020",
      ram: "4GB (Upgradeable)",
      storage: "SSD 128GB / 256GB",
      screen: "14\" HD/FHD"
    },
    pros: ["RAM Bisa di-upgrade", "Layar Luas 14\"", "Sparepart Mudah"],
    cons: ["Desain Standar", "Body Plastik"],
    verdict: "Pilihan cerdas untuk jangka panjang. RAM-nya bisa ditambah, jadi kalau nanti butuh performa lebih, tinggal upgrade.", 
    score: { performance: 90, design: 60, portability: 70 }
  },
  {
    id: 2,
    brand: "Axioo",
    model: "MyBook 11G",
    folderName: "axioo-mybook",
    tagline: "Kecil, Ringan, Siap Masuk Tas",
    badge: "Compact & Light",
    colors: {
      primary: "bg-emerald-600",
      accent: "text-emerald-400",
      glow: "shadow-emerald-500/50"
    },
    specs: {
      processor: "Intel Celeron N4020",
      ram: "4GB (Onboard)",
      storage: "SSD 256GB",
      screen: "11-13\" Compact"
    },
    pros: ["Sangat Ringan", "SSD Lega 256GB", "Enak dibawa-bawa"],
    cons: ["Keyboard Kecil", "Build Plastik"],
    verdict: "Cocok buat kamu yang sering pindah-pindah tempat nongkrong atau nugas. Gak bikin punggung pegal.",
    score: { performance: 70, design: 65, portability: 95 }
  },
  {
    id: 3,
    brand: "Zyrex",
    model: "Sky 232",
    folderName: "zyrex-sky",
    tagline: "Gaya Sultan, Harga Teman",
    badge: "Stylish Design",
    colors: {
      primary: "bg-purple-600",
      accent: "text-purple-400",
      glow: "shadow-purple-500/50"
    },
    specs: {
      processor: "Intel N4020",
      ram: "4GB DDR4",
      storage: "SSD 256GB + Slot",
      screen: "14\" Full Glass"
    },
    pros: ["Desain Premium (Slim)", "Layar Full Glass", "Ada Slot SSD Tambahan"],
    cons: ["Webcam Standar", "Engsel Hati-hati"],
    verdict: "Pemenang soal tampang. Kalau dibuka di cafe, orang bakal ngira ini laptop mahal. Desainnya sleek banget.",
    score: { performance: 75, design: 95, portability: 80 }
  }
];

// --- COMPONENTS ---

const SpecBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
  <div className="mb-2">
    <div className="flex justify-between text-[10px] mb-1 text-slate-400 font-mono uppercase tracking-wider">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

// --- MODAL "SMART PRODUCT VIEW" ---
const ProductDetailModal = ({ laptop, isOpen, onClose }: { laptop: LaptopSpec | null, isOpen: boolean, onClose: () => void }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(1);
  const images = [1, 2, 3];

  // Reset image saat laptop ganti
  useEffect(() => {
    if (isOpen) setActiveImgIndex(1);
  }, [isOpen, laptop]);

  if (!isOpen || !laptop) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
      
      {/* Backdrop Blur (Glass Effect) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-5xl bg-[#0f172a] rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* LEFT SIDE: Interactive Gallery */}
        <div className="w-full md:w-1/2 bg-slate-900 p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-slate-700">
           {/* Badge */}
           <div className={`absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg z-10 ${laptop.colors.primary}`}>
              {laptop.badge}
           </div>

           {/* Main Image Area */}
           <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
              <div className="relative w-full h-full flex items-center justify-center p-4 group">
                  <img 
                    src={`/assets/laptops/${laptop.folderName}/${activeImgIndex}.jpeg`} 
                    alt={laptop.model}
                    className="max-h-[300px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Glow Effect behind image */}
                  <div className={`absolute inset-0 opacity-20 blur-3xl rounded-full ${laptop.colors.primary.replace('bg-', 'bg-')}`} style={{ zIndex: -1 }}></div>
              </div>
           </div>

           {/* Thumbnail Selector */}
           <div className="flex justify-center gap-3 mt-4">
              {images.map((num) => (
                <button 
                  key={num}
                  onClick={() => setActiveImgIndex(num)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden transition-all ${activeImgIndex === num ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] scale-110' : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'}`}
                >
                  <img 
                    src={`/assets/laptops/${laptop.folderName}/${num}.jpeg`} 
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </button>
              ))}
           </div>
        </div>

        {/* RIGHT SIDE: Details & Specs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
           
           {/* Header */}
           <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">{laptop.brand}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-lg font-semibold ${laptop.colors.accent}`}>{laptop.model}</span>
                  <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
           </div>

           {/* The Verdict (Kata Ahdi) */}
           <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 mb-6">
              <div className="flex items-center gap-2 mb-2">
                 <ShieldCheck size={16} className="text-emerald-400" />
                 <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Expert Review</span>
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{laptop.verdict}"
              </p>
           </div>

           {/* Specs Grid */}
           <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                 <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1"><Cpu size={10} /> Processor</div>
                 <div className="text-sm text-white font-medium">{laptop.specs.processor}</div>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                 <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1"><Zap size={10} /> RAM</div>
                 <div className="text-sm text-white font-medium">{laptop.specs.ram}</div>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                 <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1"><HardDrive size={10} /> Storage</div>
                 <div className="text-sm text-white font-medium">{laptop.specs.storage}</div>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                 <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1"><Monitor size={10} /> Screen</div>
                 <div className="text-sm text-white font-medium">{laptop.specs.screen}</div>
              </div>
           </div>

           {/* Performance Bars */}
           <div className="space-y-4 mb-8">
              <SpecBar label="Performance" value={laptop.score.performance} colorClass="bg-blue-500" />
              <SpecBar label="Portability" value={laptop.score.portability} colorClass="bg-emerald-500" />
              <SpecBar label="Aesthetic" value={laptop.score.design} colorClass="bg-purple-500" />
           </div>

           {/* CTA Button */}
           <button className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${laptop.colors.primary} hover:brightness-110`}>
              Pilih Laptop Ini
              <ArrowRight size={18} />
           </button>

        </div>
      </div>
    </div>
  );
};

// --- MAIN CARD COMPONENT ---

const LaptopCard = ({ laptop, onDetail }: { laptop: LaptopSpec; onDetail: (l: LaptopSpec) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isHovered ? laptop.colors.glow + ' shadow-2xl border-opacity-50' : ''}`}  
      style={{ borderColor: isHovered ? 'rgba(255,255,255,0.2)' : '' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg z-10 ${laptop.colors.primary}`}>
        {laptop.badge}
      </div>

      {/* Product Image Preview */}
      <div className="h-48 bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
         <img 
            src={`/assets/laptops/${laptop.folderName}/1.jpeg`} 
            alt={laptop.model}
            className="h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 z-10"
         />
         {/* Subtle background glow */}
         <div className={`absolute inset-0 opacity-10 blur-2xl ${laptop.colors.primary}`}></div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-0.5">{laptop.brand}</h3>
            <p className={`text-sm font-medium ${laptop.colors.accent}`}>{laptop.model}</p>
        </div>

        {/* Pros Preview (Short) */}
        <div className="space-y-2 mb-6">
            {laptop.pros.slice(0, 2).map((pro, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle size={12} className="text-emerald-500" /> <span>{pro}</span>
            </div>
            ))}
        </div>

        {/* Action Button */}
        <button 
            onClick={() => onDetail(laptop)}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-all flex items-center justify-center gap-2 group-hover:border-white/30"
        >
            <Maximize2 size={14} />
            Lihat Detail
        </button>
      </div>
    </div>
  );
}
// --- PAGE COMPONENT ---

export const LaptopGratisPage: React.FC = () => {
  const [selectedLaptop, setSelectedLaptop] = useState<LaptopSpec | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (laptop: LaptopSpec) => {
    setSelectedLaptop(laptop);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLaptop(null), 300);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-purple-500 selection:text-white">

      {/* SMART PRODUCT VIEW MODAL */}
      <ProductDetailModal 
        laptop={selectedLaptop} 
        isOpen={isModalOpen} 
        onClose={handleCloseDetail} 
      />
      
      {/* --- HERO SECTION --- */}
      <header className="relative pt-24 pb-20 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Trophy size={14} className="text-yellow-500" />
                Program Beasiswa Unggulan
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Kuliah Gratis, <br/>
                Pulang Bawa <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Laptop Impian</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-10 leading-relaxed">
                Bukan laptop "kentang". Kami memilihkan 3 kandidat terbaik di kelasnya untuk menunjang karir coding, desain, dan bisnis kamu. Pilih senjatamu!
            </p>
        </div>
      </header>

      {/* --- LAPTOP SHOWCASE --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

        {/* Intro Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Laptop className="text-blue-400" />
                    Kenapa 3 Laptop Ini?
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-xl">
                    Kami tidak asal pilih. Ketiganya adalah <i>Top Tier</i> di rentang harganya. Ada yang jago <b>Multitasking</b>, ada yang <b>Ringan</b>, dan ada yang <b>Ganteng</b>. Sesuaikan dengan gaya belajarmu.
                </p>
            </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laptops.map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} onDetail={handleOpenDetail} />
            ))}
        </div>

      </main>

      {/* --- CTA SECTION --- */}
      <footer className="border-t border-slate-800 bg-slate-900/50 pt-16 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Sudah Tahu Mau Pilih Yang Mana?</h2>
              <p className="text-slate-400 mb-8">
                  Slot program laptop gratis ini terbatas setiap gelombangnya. <br/>
                  Amankan kuotamu sekarang sebelum diambil orang lain.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-purple-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
                  Daftar & Klaim Laptop
                  <ArrowRight size={20} />
              </button>
              <p className="mt-6 text-xs text-slate-600">
                  *Spesifikasi dapat berubah sewaktu-waktu tergantung ketersediaan stok distributor, namun tetap setara atau lebih tinggi.
              </p>
          </div>
      </footer>

    </div>
  );
};