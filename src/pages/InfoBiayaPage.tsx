import React, { useState } from 'react';
import { 
  Calculator, 
  Calendar, 
  CheckCircle2, 
  CreditCard, 
  Download, 
  Laptop, 
  ShieldCheck, 
  Wallet,
  AlertCircle,
  School
} from 'lucide-react';

// --- TYPES & DATA SOURCES (SESUAI PDF) ---

type WaveType = 'GEL_1' | 'GEL_2' | 'GEL_3' | 'GEL_AKHIR';

interface CostDetail {
  pendaftaran: number;
  registrasi: number;
  ukt: number;
  totalYear1: number;
  totalYear2: number;
  laptop: boolean;
  period: string;
}

// Data biaya fix sesuai PDF per Gelombang
const PRICING_DATA: Record<WaveType, CostDetail> = {
  GEL_1: {
    pendaftaran: 350000,
    registrasi: 3500000,
    ukt: 9000000, // 4.5jt x 2 Semester
    totalYear1: 12850000,
    totalYear2: 10000000, // Sisa Regist 1jt + UKT 9jt
    laptop: true,
    period: "Januari - Maret 2026"
  },
  GEL_2: {
    pendaftaran: 350000,
    registrasi: 3500000,
    ukt: 10000000, // 5jt x 2 Semester
    totalYear1: 13850000,
    totalYear2: 11000000,
    laptop: true,
    period: "April - Juni 2026"
  },
  GEL_3: {
    pendaftaran: 350000,
    registrasi: 3500000,
    ukt: 11000000, // 5.5jt x 2 Semester
    totalYear1: 14850000,
    totalYear2: 12000000,
    laptop: true,
    period: "Juli - September 2026"
  },
  GEL_AKHIR: {
    pendaftaran: 350000,
    registrasi: 4000000,
    ukt: 11000000, // 5.5jt x 2 Semester
    totalYear1: 15350000,
    totalYear2: 12000000,
    laptop: false, // Tidak dapat laptop sesuai catatan PDF
    period: "Oktober 2026"
  }
};

// Data simulasi angsuran Registrasi (Sesuai tabel Jan-Sep di PDF)
// Angsuran ini hanya untuk komponen "Registrasi Awal"
const INSTALLMENT_PLAN = [
  { month: "Januari", regInstallment: 388889, uktInstallment: 500000 },
  { month: "Februari", regInstallment: 437500, uktInstallment: 529412 },
  { month: "Maret", regInstallment: 500000, uktInstallment: 562500 },
  { month: "April", regInstallment: 583333, uktInstallment: 666667 },
  { month: "Mei", regInstallment: 700000, uktInstallment: 714286 },
  { month: "Juni", regInstallment: 875000, uktInstallment: 769231 },
  { month: "Juli", regInstallment: 1166667, uktInstallment: 916667 },
  { month: "Agustus", regInstallment: 1750000, uktInstallment: 1000000 },
  { month: "September", regInstallment: 3500000, uktInstallment: 1100000 },
];

// --- HELPER FORMAT CURRENCY ---
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const InfoBiayaPage: React.FC = () => {
  const [activeWave, setActiveWave] = useState<WaveType>('GEL_1');
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(0); // Default Januari

  const currentData = PRICING_DATA[activeWave];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* HEADER SECTION */}
      <header className="bg-blue-900 text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Investasi Pendidikan</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                Transparansi biaya Program Profesi 2 Tahun LP3I College Indramayu. 
                Tahun Akademik 2026-2027.
            </p>
            
            {/* Banner Alert */}
            <div className="mt-8 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md animate-pulse">
                <AlertCircle size={16} />
                <span>Semakin awal mendaftar, biaya semakin ringan & fasilitas lebih banyak!</span>
            </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* WAVE SELECTOR (Tab System) */}
        <div className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100 mb-8 flex flex-col md:flex-row gap-2">
            {[
                { id: 'GEL_1', label: 'Gelombang 1', sub: 'Jan - Mar', highlight: true },
                { id: 'GEL_2', label: 'Gelombang 2', sub: 'Apr - Jun', highlight: false },
                { id: 'GEL_3', label: 'Gelombang 3', sub: 'Jul - Sep', highlight: false },
                { id: 'GEL_AKHIR', label: 'Gelombang Akhir', sub: 'Oktober', highlight: false },
            ].map((wave) => (
                <button
                    key={wave.id}
                    onClick={() => setActiveWave(wave.id as WaveType)}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center ${
                        activeWave === wave.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                >
                    <span className="font-bold text-sm md:text-base">{wave.label}</span>
                    <span className={`text-xs ${activeWave === wave.id ? 'text-blue-200' : 'text-slate-400'}`}>{wave.sub}</span>
                </button>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* MAIN PRICING CARD */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Rincian Biaya */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                        <div>
                            <h2 className="text-xl font-bold">Rincian Biaya Tahun Ke-1</h2>
                            <p className="text-slate-400 text-xs mt-1">Periode: {currentData.period}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400 mb-1">Total Investasi</p>
                            <p className="text-2xl font-bold text-yellow-400">{formatRupiah(currentData.totalYear1)}</p>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8">
                        {/* Table Like Layout */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard size={18}/></div>
                                    <div>
                                        <p className="font-bold text-slate-700">Pendaftaran</p>
                                        <p className="text-xs text-slate-400">Dibayar sekali di awal</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800">{formatRupiah(currentData.pendaftaran)}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><School size={18}/></div>
                                    <div>
                                        <p className="font-bold text-slate-700">Registrasi Awal (Gedung)</p>
                                        <p className="text-xs text-slate-400">Biaya pengembangan institusi</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800">{formatRupiah(currentData.registrasi)}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Wallet size={18}/></div>
                                    <div>
                                        <p className="font-bold text-slate-700">Biaya Semester (UKT)</p>
                                        <p className="text-xs text-slate-400">Include: SKS, Praktikum, Ujian</p>
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800">{formatRupiah(currentData.ukt)}</span>
                            </div>
                        </div>

                        {/* Laptop Highlight */}
                        {currentData.laptop ? (
                            <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white flex items-center justify-between shadow-lg shadow-blue-500/20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                        <Laptop size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Gratis 1 Unit Laptop</p>
                                        <p className="text-xs text-blue-100">Spesifikasi kerja & kuliah</p>
                                    </div>
                                </div>
                                <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                    FREE
                                </span>
                            </div>
                        ) : (
                            <div className="mt-6 bg-slate-100 rounded-xl p-4 flex items-center gap-3 text-slate-500">
                                <AlertCircle size={20} />
                                <p className="text-sm">Maaf, Gelombang Akhir <b>tidak mendapatkan</b> fasilitas Laptop.</p>
                            </div>
                        )}
                        
                        {/* Note Year 2 */}
                        <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-xs text-orange-800">
                            <strong>Catatan Tahun Ke-2:</strong> Biaya yang perlu disiapkan untuk tahun kedua adalah <b>{formatRupiah(currentData.totalYear2)}</b> (Dapat diangsur).
                        </div>
                    </div>
                </div>

                {/* 2. Simulasi Angsuran (Interactive) */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Calculator className="text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-800">Simulasi Angsuran</h2>
                    </div>

                    <p className="text-slate-500 text-sm mb-4">
                        Biaya Registrasi Awal & UKT dapat diangsur. Pilih bulan rencana kamu mendaftar untuk melihat estimasi cicilan.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Saya berencana mendaftar bulan:</label>
                        <select 
                            value={selectedMonthIdx}
                            onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
                            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                            {INSTALLMENT_PLAN.map((plan, idx) => (
                                <option key={idx} value={idx}>{plan.month} 2026</option>
                            ))}
                        </select>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                                <p className="text-xs text-slate-500 mb-1">Angsuran Registrasi</p>
                                <p className="text-lg font-bold text-blue-600">{formatRupiah(INSTALLMENT_PLAN[selectedMonthIdx].regInstallment)}</p>
                                <p className="text-[10px] text-slate-400">/bulan (sampai Sept 2026)</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                                <p className="text-xs text-slate-500 mb-1">Angsuran Pendidikan</p>
                                <p className="text-lg font-bold text-emerald-600">{formatRupiah(INSTALLMENT_PLAN[selectedMonthIdx].uktInstallment)}</p>
                                <p className="text-[10px] text-slate-400">/bulan (x18 bulan)</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* SIDEBAR: FACILITIES & CTA */}
            <div className="space-y-6">
                
                {/* Facility Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-blue-600" size={20}/>
                        Fasilitas (All in)
                    </h3>
                    <ul className="space-y-3">
                        {[
                            "Ruang Kelas Full AC",
                            "Lab Komputer Modern",
                            "Sertifikat Kompetensi BNSP",
                            "Bahan Seragam",
                            "Jaminan Penempatan Magang",
                            "Bantuan Penempatan Kerja",
                            "Free WiFi/Hotspot Area",
                            "Akses E-Book & E-Student",
                            "Training Soft Skill",
                            "Bimbingan Karir Intensif"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Important Dates */}
                <div className="bg-blue-900 rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
                        <Calendar size={20}/>
                        Tanggal Penting
                    </h3>
                    <div className="space-y-4 relative z-10 text-sm text-blue-100">
                        <div className="flex gap-3">
                            <div className="w-1 h-full bg-yellow-400 rounded-full"></div>
                            <div>
                                <p className="font-bold text-white">September 2026</p>
                                <p className="text-xs">Batas akhir pelunasan Registrasi Awal</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-1 h-full bg-green-400 rounded-full"></div>
                            <div>
                                <p className="font-bold text-white">Juni 2028</p>
                                <p className="text-xs">Batas akhir angsuran pendidikan (Semester)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download PDF Button */}
                <a 
                    href="/assets/documents/brosur-lp3i-2026.pdf" 
                    download="Brosur_LP3I_Indramayu_2026.pdf"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-slate-200 border-dashed"
                >
                    <Download size={20} />
                    Download Brosur Resmi PDF
                </a>

            </div>

        </div>

        {/* Footer info signatory */}
        <div className="mt-12 text-center text-slate-400 text-sm">
            <p className="font-semibold">LP3I COLLEGE INDRAMAYU</p>
            <p>Jl. Pahlawan No. 9, Lemahmekar, Indramayu</p>
            <p className="mt-4 text-xs italic">SK Biaya ini berlaku sah sesuai tanda tangan Ir. Suaha Bakhtiar, M.Si., MM. (Pimpinan)</p>
        </div>

      </main>
    </div>
  );
};