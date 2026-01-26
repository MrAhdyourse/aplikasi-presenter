import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonIcon,
  IonRippleEffect,
  IonButtons,
  IonHeader,
  IonToolbar,
  isPlatform
} from '@ionic/react';
import { 
  book, 
  videocam, 
  personAdd, 
  statsChart, 
  notifications,
  search,
  trophyOutline,
  peopleOutline,
  chevronForward,
  gridOutline
} from 'ionicons/icons';
import { auth } from '../shared/config/firebase-config';

const DashboardPage: React.FC = () => {
  const user = auth.currentUser;
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const isMobile = isPlatform('mobile'); // Detect Mobile State

  // --- 1. ENGINE WAKTU NYATA ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour < 11) setGreeting('Selamat Pagi');
      else if (hour < 15) setGreeting('Selamat Siang');
      else if (hour < 18) setGreeting('Selamat Sore');
      else setGreeting('Selamat Malam');

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
      setCurrentDate(now.toLocaleDateString('id-ID', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <IonPage id="main-content">
      {/* 
         HEADER KHUSUS DASHBOARD (FLOATING GLASS CAPSULE)
         Responsive: Auto-adjust padding untuk 'Poni' HP (Safe Area)
      */}
      <IonHeader className={`ion-no-border shadow-none px-4 ${isMobile ? 'pt-12' : 'pt-4'}`}>
        <IonToolbar className="--background: transparent;">
          
          {/* LEFT: AVATAR MENU TRIGGER (Inovatif & High Visibility) */}
          <IonButtons slot="start">
            <div 
              onClick={() => document.querySelector('ion-menu')?.open()}
              className="group relative cursor-pointer"
            >
               {/* Glowing Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
               
               {/* The Button Content */}
               <div className="relative flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl pl-1 pr-4 py-1 rounded-full border border-white/15 shadow-2xl transition-transform active:scale-95">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/50 transition-colors">
                     <img 
                       src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random&color=fff`} 
                       alt="Profile" 
                       className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Menu</span>
                     <span className="text-xs font-bold text-white leading-none">Apps</span>
                  </div>
                  {/* Custom 'Grid' Icon replacing Hamburger */}
                  <IonIcon icon={gridOutline} className="text-white/60 text-lg ml-1" />
               </div>
            </div>
          </IonButtons>
          
          {/* RIGHT: ACTION BUTTONS (Glass Circles) */}
          <IonButtons slot="end" className="gap-3">
             <button className="w-11 h-11 rounded-full bg-slate-800/50 backdrop-blur-md text-white hover:bg-white/10 flex items-center justify-center transition-all border border-white/10 shadow-lg active:scale-90">
                <IonIcon icon={search} className="text-xl" />
              </button>
              <button className="relative w-11 h-11 rounded-full bg-slate-800/50 backdrop-blur-md text-white hover:bg-white/10 flex items-center justify-center transition-all border border-white/10 shadow-lg active:scale-90">
                <IonIcon icon={notifications} className="text-xl" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </button>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="--background: #0f172a;">
        {/* --- DARK MESH GRADIENT BACKGROUND (The Luxury Tech Vibe) --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
           {/* Base Dark Color */}
           <div className="absolute inset-0 bg-slate-950"></div>
           {/* Mesh Gradients */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-transparent"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        {/* --- MAIN CONTENT (Card System) --- */}
        <div className="relative z-10 px-6 pb-24">
          
          {/* Hero Text */}
          <div className="mt-4 mb-8 animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Online • {currentDate}</span>
             </div>
             
             <h2 className="text-3xl font-black text-white leading-tight drop-shadow-lg">
               {greeting}, <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                 {user?.displayName?.split(' ')[0] || 'Presenter'}
               </span>
             </h2>
          </div>

          {/* Quick Stats (Responsive Grid - Senjata 1: Grid & Flexbox) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-lg shadow-black/20 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><IonIcon icon={peopleOutline} /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aplikan</span>
                </div>
                <div className="text-3xl font-black text-white">128</div>
                <div className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2.5 py-1 rounded-full w-fit mt-2 border border-green-500/20 flex items-center gap-1">
                   <span>+12%</span>
                   <span className="opacity-60 font-normal">bln ini</span>
                </div>
             </div>

             <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 shadow-lg shadow-black/20 hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400"><IonIcon icon={trophyOutline} /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target</span>
                </div>
                <div className="text-3xl font-black text-white">85%</div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden border border-white/5">
                   <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full w-[85%] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                </div>
             </div>
          </div>

          {/* BENTO GRID MENU */}
          <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="text-lg font-bold text-slate-200">Menu Utama</h3>
             <div className="text-xs font-medium text-blue-400">Lihat Semua</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* KATALOG (Highlight Card) */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-600/20 transition-all duration-300 cursor-pointer h-64 ion-activatable border border-white/10">
               {/* Noise Texture Overlay for Premium Feel */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
               
               <div className="absolute -right-12 -top-12 text-white/5 group-hover:scale-110 transition-transform duration-700 rotate-12 group-hover:text-white/10">
                  <IonIcon icon={book} style={{ fontSize: '220px' }} />
               </div>
               <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-lg">
                     Prioritas Utama
                  </div>
                  <div>
                     <h3 className="text-4xl font-black leading-none mb-2 tracking-tight drop-shadow-md">Katalog<br/>Sekolah</h3>
                     <p className="text-blue-100/80 text-sm font-medium mt-3 flex items-center gap-2">
                        <span>Akses Data Jurusan</span> 
                        <span className="bg-white/20 p-1 rounded-full flex items-center justify-center"><IonIcon icon={chevronForward} /></span>
                     </p>
                  </div>
               </div>
               <IonRippleEffect />
            </div>

            {/* Sub Menus - Dark Glass */}
            <div className="grid grid-cols-2 gap-5 h-64">
               <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 shadow-lg shadow-black/20 flex flex-col justify-between ion-activatable relative overflow-hidden group hover:bg-slate-800/60 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-green-500/20">
                     <IonIcon icon={personAdd} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-lg leading-tight mb-1">Input<br/>Data</h4>
                     <p className="text-[10px] text-slate-400 font-medium">Calon Siswa</p>
                  </div>
                  <IonRippleEffect />
               </div>

               <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 shadow-lg shadow-black/20 flex flex-col justify-between ion-activatable relative overflow-hidden group hover:bg-slate-800/60 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-purple-500/20">
                     <IonIcon icon={videocam} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-lg leading-tight mb-1">Video<br/>Materi</h4>
                     <p className="text-[10px] text-slate-400 font-medium">Presentasi</p>
                  </div>
                  <IonRippleEffect />
               </div>
            </div>

            {/* Statistik Wide - Dark Glass */}
            <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-lg shadow-black/20 flex items-center gap-6 ion-activatable relative overflow-hidden group hover:bg-slate-800/60 transition-colors">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-3xl border border-orange-500/20">
                   <IonIcon icon={statsChart} />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-xl">Laporan OKR</h4>
                   <p className="text-sm text-slate-400 mt-1">Cek performa tim & statistik lengkap</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 border border-white/5">
                   <IonIcon icon={chevronForward} />
                </div>
                <IonRippleEffect />
            </div>

          </div>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default DashboardPage;
