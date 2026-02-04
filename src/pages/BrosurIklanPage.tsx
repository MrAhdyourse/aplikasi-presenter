import { useState, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  Folder, 
  ChevronRight, 
  Home, 
  Loader2,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import { storage, APPWRITE_IDS } from '../shared/config/appwrite-config';
import { ID, Permission, Role } from 'appwrite';

// --- FOLDER STATIS (Tanpa Database) ---
const STATIC_FOLDERS = [
  { id: 'feed', name: 'Feed Instagram' },
  { id: 'story', name: 'Story WhatsApp' },
  { id: 'poster', name: 'Poster Cetak' },
  { id: 'dokumentasi', name: 'Dokumentasi Kegiatan' },
  { id: 'lainnya', name: 'Lainnya' }
];

interface FileItem {
  $id: string;
  name: string;
  url: string;
  downloadUrl: string;
}

export const BrosurIklanPage = () => {
  const [currentFolder, setCurrentFolder] = useState<{id: string, name: string} | null>(null); // Null = Root
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // --- LOAD FILES ---
  const loadFiles = async () => {
    if (!currentFolder) return; // Di Root ga perlu load file

    setIsLoading(true);
    try {
      // Ambil semua file dari Storage
      // (Appwrite belum support filter by name prefix di API listFiles, jadi kita filter di Client)
      const res = await storage.listFiles(APPWRITE_IDS.BUCKET_ID);
      
      const folderPrefix = `folder-${currentFolder.id}_`; // Prefix Penanda Folder

      const filteredFiles = res.files
        .filter(f => f.name.startsWith(folderPrefix)) // Ambil yang sesuai folder aktif
        .map(f => ({
          $id: f.$id,
          name: f.name.replace(folderPrefix, ''), // Hapus prefix biar nama asli muncul cantik
          url: storage.getFileView(APPWRITE_IDS.BUCKET_ID, f.$id),
          downloadUrl: storage.getFileDownload(APPWRITE_IDS.BUCKET_ID, f.$id)
        }));

      setFiles(filteredFiles);
    } catch (error) {
      console.error("Gagal load file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [currentFolder]);

  // --- ACTIONS ---

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !currentFolder) return;
    const file = e.target.files[0];

    setIsUploading(true);
    try {
      // Beri Prefix pada nama file agar tertanda masuk folder mana
      // Contoh: folder-feed_brosur1.jpg
      const newFileName = `folder-${currentFolder.id}_${file.name}`;
      
      // Kita butuh rename file object (karena properti name read-only)
      const renamedFile = new File([file], newFileName, { type: file.type });

      await storage.createFile(
        APPWRITE_IDS.BUCKET_ID,
        ID.unique(),
        renamedFile,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      );
      
      loadFiles(); // Refresh list
    } catch (error: any) {
      alert(`Upload Gagal: ${error.message} (Cek Permission Bucket!)`);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm("Hapus gambar ini?")) return;
    try {
      await storage.deleteFile(APPWRITE_IDS.BUCKET_ID, fileId);
      loadFiles();
    } catch (error: any) {
      alert("Gagal hapus: " + error.message);
    }
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-24">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-4 md:px-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <ImageIcon className="text-blue-500" />
                    Galeri Brosur
                </h1>
                <p className="text-xs text-slate-400 mt-1">Media Penyimpanan Terpusat</p>
            </div>

            {/* Tombol Upload (Hanya Muncul kalau sudah masuk Folder) */}
            {currentFolder && (
                <label className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95 shadow-md ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                    <span className="text-sm font-bold hidden md:inline">Upload ke {currentFolder.name}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
                </label>
            )}
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-slate-500">
            <button 
                onClick={() => setCurrentFolder(null)}
                className={`flex items-center gap-1 hover:text-blue-600 ${!currentFolder ? 'font-bold text-slate-800' : ''}`}
            >
                <Home size={14} /> Home
            </button>
            {currentFolder && (
                <>
                    <ChevronRight size={14} />
                    <span className="font-bold text-slate-800">{currentFolder.name}</span>
                </>
            )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* VIEW 1: DAFTAR FOLDER (ROOT) */}
        {!currentFolder && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {STATIC_FOLDERS.map(folder => (
                    <div 
                        key={folder.id}
                        onClick={() => setCurrentFolder(folder)}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all flex flex-col items-center text-center aspect-square justify-center"
                    >
                        <Folder size={56} className="text-blue-100 fill-blue-500 group-hover:scale-110 transition-transform duration-300" />
                        <p className="mt-4 font-bold text-slate-700">{folder.name}</p>
                        <p className="text-xs text-slate-400 mt-1">Klik untuk buka</p>
                    </div>
                ))}
            </div>
        )}

        {/* VIEW 2: ISI FOLDER (FILES) */}
        {currentFolder && (
            <>
                {isLoading && (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                    </div>
                )}

                {!isLoading && files.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                        <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Upload size={32} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada gambar di sini.</p>
                        <p className="text-xs text-slate-400 mt-1">Upload gambar pertama Anda!</p>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map(file => (
                        <div key={file.$id} className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                            <div className="aspect-[4/5] bg-slate-100 relative">
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-white/90 backdrop-blur-sm border-t border-slate-100 flex justify-between items-center">
                                <p className="text-[10px] font-medium truncate max-w-[60%]">{file.name}</p>
                                <div className="flex gap-1">
                                    <a href={file.downloadUrl} target="_blank" className="p-1.5 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded">
                                        <Download size={14} />
                                    </a>
                                    <button onClick={() => handleDelete(file.$id)} className="p-1.5 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}

      </div>
    </div>
  );
};