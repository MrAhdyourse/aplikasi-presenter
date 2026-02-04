import React, { useState } from 'react';
import { ExternalLink, Loader2, Globe } from 'lucide-react';

export const InfoKSKPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const TARGET_URL = "https://ksklp3icollegeidm.web.app/";

  const openExternal = () => {
    // Membuka link di browser sistem (Chrome/Safari), bukan di dalam Webview aplikasi
    window.open(TARGET_URL, '_system');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-10 px-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* 1. HEADER SECTION - Intro */}
      <div className="text-center max-w-2xl mx-auto mb-8 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Globe size={12} />
          Official Web Portal
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
          Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dimulai Disini</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed px-4">
          Jelajahi ekosistem digital LP3I College Indramayu. <br className="hidden md:block"/>
          Kuliah & Kerja? Kenapa gak keduanya?
        </p>
      </div>

      {/* 2. LAPTOP FRAME VISUALIZATION */}
      <div className="relative w-full max-w-4xl perspective-1000 z-10 group">
        
        {/* Laptop Body */}
        <div className="relative bg-slate-800 rounded-t-xl md:rounded-t-2xl border-[4px] md:border-[8px] border-slate-700 shadow-2xl mx-auto w-[90%] md:w-full aspect-video transition-transform duration-500 hover:scale-[1.02]">
          
          {/* Camera Dot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-700 rounded-b-md flex justify-center items-center z-20">
             <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 z-10">
                <Loader2 size={32} className="animate-spin mb-2 text-blue-500" />
                <span className="text-xs font-medium">Memuat Pratinjau...</span>
              </div>
            )}

            {/* Live Preview Iframe */}
            <iframe 
              src={TARGET_URL} 
              className="w-full h-full border-0 scrollbar-hide"
              title="KSK Website Preview"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}
            />

            {/* Interactive Overlay (Click Guard) */}
            {/* Layer transparan ini menangkap klik agar user tidak 'terjebak' scroll di dalam iframe kecil */}
            <div 
              onClick={openExternal}
              className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center group/overlay"
            >
               <div className="opacity-0 group-hover/overlay:opacity-100 transform translate-y-4 group-hover/overlay:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2">
                 <ExternalLink size={18} />
                 Buka Layar Penuh
               </div>
            </div>

          </div>
        </div>

        {/* Laptop Bottom/Base */}
        <div className="relative bg-slate-600 h-3 md:h-5 w-full mx-auto rounded-b-lg md:rounded-b-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-500 rounded-b-sm"></div>
        </div>

      </div>

      {/* 3. FOOTER ACTION */}
      <div className="mt-10 md:mt-12 text-center z-10 w-full px-4">
        <button 
          onClick={openExternal}
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-lg shadow-blue-500/30 transform transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
        >
          <span>Kunjungi Website Resmi</span>
          <ExternalLink size={20} />
        </button>
        <p className="mt-4 text-xs text-slate-500">
          Mengarahkan ke browser eksternal untuk pengalaman terbaik.
        </p>
      </div>

    </div>
  );
};
