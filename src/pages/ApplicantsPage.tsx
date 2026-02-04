import { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Target, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Search, 
  Loader2, 
  School,
  Calendar,
  MoreHorizontal,
  Phone,
  Filter,
  BarChart2,
  Edit2, // Tombol Edit Target
  X
} from 'lucide-react';
import { databases, account, APPWRITE_IDS } from '../shared/config/appwrite-config';
import { ID, Query, Permission, Role } from 'appwrite';
import { 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// --- TYPES ---
interface Applicant {
  $id: string;
  student_name: string;
  school_origin: string;
  address: string;
  is_registered: boolean;
  is_visited: boolean;
  owner_id: string;
  visit_plan_date?: string; 
  probability_status?: 'Hot' | 'Warm' | 'Cold'; 
}

export const ApplicantsPage = () => {
  // State Data
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  // State UI
  const [targetCount, setTargetCount] = useState<number>(() => {
    return Number(localStorage.getItem('my_target_count')) || 30; 
  });
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false); // Modal Target
  const [newApplicantName, setNewApplicantName] = useState('');

  // --- FETCH DATA ---
  const loadData = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
      
      const res = await databases.listDocuments(
        APPWRITE_IDS.DATABASE_ID,
        APPWRITE_IDS.COLLECTION_APPLICANTS_ID,
        [Query.equal('owner_id', user.$id), Query.limit(1000)]
      );
      setApplicants(res.documents as unknown as Applicant[]);
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- ACTIONS ---
  
  const handleAddQuick = async () => {
    if (!newApplicantName) return;
    const name = newApplicantName;
    setNewApplicantName(''); 
    setIsAddModalOpen(false);

    try {
      await databases.createDocument(
        APPWRITE_IDS.DATABASE_ID,
        APPWRITE_IDS.COLLECTION_APPLICANTS_ID,
        ID.unique(),
        {
          student_name: name,
          school_origin: '-',
          address: '-',
          is_registered: false,
          is_visited: false,
          owner_id: userId,
          probability_status: 'Warm' 
        },
        [Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
      );
      loadData(); 
    } catch (error) {
      alert("Gagal tambah data.");
    }
  };

  const handleToggle = async (id: string, field: keyof Applicant, val: boolean) => {
    setApplicants(prev => prev.map(a => a.$id === id ? { ...a, [field]: !val } : a));
    try {
      await databases.updateDocument(
        APPWRITE_IDS.DATABASE_ID,
        APPWRITE_IDS.COLLECTION_APPLICANTS_ID,
        id,
        { [field]: !val }
      );
    } catch (error) { console.error(error); }
  };

  const handleSetTarget = (newVal: string) => {
    const num = parseInt(newVal);
    if (!isNaN(num) && num > 0) {
        setTargetCount(num);
        localStorage.setItem('my_target_count', num.toString());
        setIsTargetModalOpen(false);
    }
  };

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    const registered = applicants.filter(a => a.is_registered).length;
    const progress = Math.min(Math.round((registered / targetCount) * 100), 100);
    
    const hot = applicants.filter(a => a.probability_status === 'Hot').length;
    const warm = applicants.filter(a => !a.probability_status || a.probability_status === 'Warm').length; 
    const cold = applicants.filter(a => a.probability_status === 'Cold').length;

    return { registered, progress, hot, warm, cold };
  }, [applicants, targetCount]);

  const filteredList = applicants.filter(a => 
    a.student_name.toLowerCase().includes(search.toLowerCase()) ||
    a.school_origin.toLowerCase().includes(search.toLowerCase())
  );

  const visitList = filteredList.filter(a => !a.is_registered); 

  // Chart Data
  const pieData = [
    { name: 'Hot', value: stats.hot, color: '#ef4444' }, // Red
    { name: 'Warm', value: stats.warm, color: '#f59e0b' }, // Amber
    { name: 'Cold', value: stats.cold, color: '#3b82f6' }, // Blue
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* --- 1. HEADER & TARGET TRACKER --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Users className="text-blue-600" /> Dashboard Marketing
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Pantau performa harian & data calon mahasiswa.</p>
                </div>

                {/* Target Progress Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-4 min-w-[300px]">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                            <span className="text-slate-700">Target Registrasi</span>
                            {/* TOMBOL EDIT TARGET */}
                            <button 
                                onClick={() => setIsTargetModalOpen(true)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-100 px-2 py-0.5 rounded transition-colors"
                            >
                                <Edit2 size={10} /> Ubah
                            </button>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                             <span className="text-xl font-extrabold text-slate-800">{stats.registered}</span>
                             <span className="text-xs text-slate-500 font-medium">/ {targetCount} Siswa</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${stats.progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                        <span className="text-xs font-bold text-slate-700">{stats.progress}%</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 2. TABEL DATA APLIKAN (UTAMA - KIRI) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Toolbar */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Cari nama, sekolah, atau alamat..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                    <Plus size={20} /> <span className="hidden md:inline">Input Manual</span>
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <School size={18} className="text-slate-400" /> Database Siswa ({filteredList.length})
                    </h3>
                    <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                        <Filter size={12} /> Filter
                    </button>
                </div>
                
                {/* List Items */}
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {isLoading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
                    ) : filteredList.length === 0 ? (
                        <div className="p-10 text-center text-slate-400 text-sm">Data tidak ditemukan.</div>
                    ) : (
                        filteredList.map((item) => (
                            <div key={item.$id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-slate-800 text-sm truncate">{item.student_name}</h4>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            item.probability_status === 'Hot' ? 'bg-red-100 text-red-600' :
                                            item.probability_status === 'Cold' ? 'bg-blue-100 text-blue-600' :
                                            'bg-amber-100 text-amber-600'
                                        }`}>
                                            {item.probability_status || 'Warm'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                                        <School size={12} /> {item.school_origin}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                        <MapPin size={12} /> {item.address}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Status Regis</p>
                                    </div>
                                    <button 
                                        onClick={() => handleToggle(item.$id, 'is_registered', item.is_registered)}
                                        className="transition-transform active:scale-90"
                                    >
                                        {item.is_registered 
                                            ? <CheckCircle className="text-emerald-500 fill-emerald-100" size={28} />
                                            : <XCircle className="text-slate-300 hover:text-red-400" size={28} />
                                        }
                                    </button>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 rounded-full hover:bg-slate-200">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. GRAFIK ANALITIK (BAWAH) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <BarChart2 size={18} className="text-purple-500" /> Analisa Kualitas Data
                    </h3>
                </div>
                <div className="h-64 w-full flex items-center gap-8">
                    {/* Pie Chart */}
                    <div className="w-1/3 h-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Legend Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-slate-700">{applicants.length}</span>
                        </div>
                    </div>

                    {/* Legend Text */}
                    <div className="flex-1 grid grid-cols-1 gap-4">
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                            <p className="text-xs text-red-600 font-bold uppercase mb-1">Hot Prospect</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.hot}</p>
                            <p className="text-[10px] text-slate-500">Siap daftar segera</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                            <p className="text-xs text-amber-600 font-bold uppercase mb-1">Warm Prospect</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.warm}</p>
                            <p className="text-[10px] text-slate-500">Butuh follow up</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                            <p className="text-xs text-blue-600 font-bold uppercase mb-1">Cold Prospect</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.cold}</p>
                            <p className="text-[10px] text-slate-500">Baru kenal / ragu</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* --- 3. RENCANA HOME VISIT (SIDEBAR - KANAN) --- */}
        <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sticky top-24">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Target size={18} className="text-purple-500" /> Agenda Visit</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">{visitList.length} Pending</span>
                </h3>

                <div className="space-y-3">
                    {visitList.length === 0 ? (
                        <p className="text-sm text-slate-400 italic">Tidak ada jadwal kunjungan.</p>
                    ) : (
                        visitList.slice(0, 5).map(item => (
                            <div key={item.$id} className={`p-3 rounded-xl border transition-all ${item.is_visited ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-purple-300'}`}>
                                <div className="flex items-start gap-3">
                                    {/* Checkbox Custom */}
                                    <div 
                                        onClick={() => handleToggle(item.$id, 'is_visited', item.is_visited)}
                                        className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                                            item.is_visited ? 'bg-purple-500 border-purple-500' : 'border-slate-300'
                                        }`}
                                    >
                                        {item.is_visited && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-bold truncate ${item.is_visited ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.student_name}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 truncate">{item.school_origin}</p>
                                        
                                        {!item.is_visited && (
                                            <div className="mt-2 flex gap-2">
                                                <a href={`https://wa.me/?text=Halo ${item.student_name}`} target="_blank" className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100">
                                                    <Phone size={12} />
                                                </a>
                                                <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                                                    <MapPin size={12} />
                                                </button>
                                                <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                    <Calendar size={10} /> {item.visit_plan_date ? new Date(item.visit_plan_date).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : 'Belum Set'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                {visitList.length > 5 && (
                    <button className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-purple-600 py-2 border-t border-slate-100">
                        Lihat Semua ({visitList.length})
                    </button>
                )}
            </div>

        </div>

      </div>

      {/* --- MODAL EDIT TARGET --- */}
      {isTargetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-xs rounded-2xl p-6 shadow-2xl relative">
                <button onClick={() => setIsTargetModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>
                <h3 className="font-bold text-lg mb-2 text-slate-800 text-center">Ubah Target</h3>
                <p className="text-xs text-slate-500 text-center mb-6">Target siswa closing:</p>
                <input 
                    autoFocus
                    type="number" 
                    className="w-full border-2 border-slate-200 rounded-xl p-3 mb-6 focus:border-blue-600 outline-none font-bold text-center text-2xl text-slate-800"
                    defaultValue={targetCount}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSetTarget(e.currentTarget.value);
                    }}
                />
                <button 
                    onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                        handleSetTarget(input.value);
                    }} 
                    className="w-full py-2.5 text-white font-bold bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg text-sm"
                >
                    Simpan
                </button>
            </div>
        </div>
      )}

      {/* MODAL INPUT MANUAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
                <h3 className="font-bold text-lg mb-4 text-slate-800">Input Data Siswa</h3>
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Nama Lengkap Siswa"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 mb-4 focus:border-blue-500 outline-none font-bold text-slate-800"
                    value={newApplicantName}
                    onChange={(e) => setNewApplicantName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddQuick()}
                />
                <div className="flex gap-2">
                    <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 text-slate-500 font-bold bg-slate-100 rounded-xl hover:bg-slate-200">Batal</button>
                    <button onClick={handleAddQuick} className="flex-1 py-3 text-white font-bold bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30">Simpan</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};