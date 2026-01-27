import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonIcon,
  IonRippleEffect,
  IonButtons,
  IonHeader,
  IonToolbar
} from '@ionic/react';
import { 
  book, 
  videocam, 
  personAdd, 
  notifications,
  search,
  trophyOutline,
  peopleOutline,
  chevronForward,
  gridOutline
} from 'ionicons/icons';
import { auth } from '../../shared/config/firebase-config';

// VIEW KHUSUS DESKTOP (Widescreen, Mouse Interaction)
const DashboardDesktop: React.FC = () => {
  const user = auth.currentUser;
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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
    <IonPage id="dashboard-desktop">
      {/* HEADER DESKTOP: Animasi Slide Down + Glass Effect Premium */}
      <IonHeader className="ion-no-border shadow-none px-8 pt-6 animate-slide-down">
        <IonToolbar className="--background: transparent;">
          
          <div className="flex items-center justify-between bg-[#14141e]/40 backdrop-blur-[15px] px-2 py-2 rounded-full border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500 group/header">
            
            {/* LEFT: Menu Trigger */}
            <IonButtons slot="start" className="ml-1">
              <div 
                onClick={() => document.querySelector('ion-menu')?.open()}
                className="group relative cursor-pointer"
              >
                 <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                 <div className="relative flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl pl-2 pr-5 py-2 rounded-full border border-white/10 shadow-lg hover:border-blue-500/50 transition-all">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                       <img 
                         src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random&color=fff`} 
                         alt="Profile" 
                       />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">Dashboard</span>
                       <span className="text-sm font-bold text-white leading-none">Main Menu</span>
                    </div>
                    <IonIcon icon={gridOutline} className="text-white/40 text-lg ml-2 group-hover:text-white transition-colors" />
                 </div>
              </div>
            </IonButtons>
            
            <div className="flex-1"></div>

            {/* RIGHT: Action Buttons */}
            <IonButtons slot="end" className="gap-4 mr-1">
               <button className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all border border-white/10 shadow-lg hover:scale-110 hover:shadow-white/20 active:scale-95">
                  <IonIcon icon={search} className="text-xl" />
                </button>
                <button className="relative w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all border border-white/10 shadow-lg hover:scale-110 hover:shadow-white/20 active:scale-95">
                  <IonIcon icon={notifications} className="text-xl" />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                </button>
            </IonButtons>

          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="--background: #0f172a;">
        {/* === BACKGROUND: MODERN TECH MESH GRADIENT WITH NOISE === */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
           {/* Layer 1: Base Dark Color (Deep Slate) */}
           <div className="absolute inset-0 bg-slate-950"></div>
           
           {/* Layer 2: Grid Pattern (Technical/Precision Look) */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

           {/* Layer 3: Animated Gradient Blobs (Glowing & Dynamic) */}
           {/* Blob 1: Blue */}
           <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
           {/* Blob 2: Cyan (Delayed) */}
           <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
           {/* Blob 3: Indigo (Bottom Center - Delayed) */}
           <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>

           {/* Layer 4: Noise Texture (Matte Finish - Anti Plastik) */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        <div className="relative z-10 px-10 pb-24 max-w-7xl mx-auto">
          
          <div className="mt-8 mb-10 animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
               <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
               </span>
               <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Online • {currentDate}</span>
             </div>
             
             <h2 className="text-5xl font-black text-white leading-tight drop-shadow-2xl">
               {greeting}, <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                 {user?.displayName || 'Admin Master'}
               </span>
             </h2>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-10">
             <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-lg shadow-black/20 hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400"><IonIcon icon={peopleOutline} /></div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Aplikan</span>
                </div>
                <div className="text-4xl font-black text-white">128</div>
                <div className="text-xs text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-full w-fit mt-3 border border-green-500/20">+12% Peningkatan</div>
             </div>

             <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-lg shadow-black/20 hover:scale-105 transition-transform cursor-default">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2.5 bg-orange-500/20 rounded-xl text-orange-400"><IonIcon icon={trophyOutline} /></div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Bulanan</span>
                </div>
                <div className="text-4xl font-black text-white">85%</div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden border border-white/5">
                   <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full w-[85%] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                </div>
             </div>

             <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/5 border-dashed flex flex-col items-center justify-center text-slate-600">
                <span className="text-sm font-medium">Slot Widget Kosong</span>
             </div>
             <div className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/5 border-dashed flex flex-col items-center justify-center text-slate-600">
                <span className="text-sm font-medium">Slot Widget Kosong</span>
             </div>
          </div>

          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold text-slate-200">Aplikasi & Fitur</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-2xl hover:shadow-blue-600/30 transition-all duration-500 cursor-pointer h-80 ion-activatable border border-white/10">
               <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
               <div className="absolute -right-16 -top-16 text-white/5 group-hover:scale-110 transition-transform duration-700 rotate-12 group-hover:text-white/10">
                  <IonIcon icon={book} style={{ fontSize: '300px' }} />
               </div>
               <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit text-xs font-bold uppercase tracking-wider border border-white/20">
                     Prioritas Utama
                  </div>
                  <div>
                     <h3 className="text-5xl font-black leading-none mb-3 tracking-tight drop-shadow-md">Katalog<br/>Sekolah</h3>
                     <p className="text-blue-100/80 text-lg font-medium mt-4 flex items-center gap-2">
                        <span>Buka Modul</span> 
                        <IonIcon icon={chevronForward} />
                     </p>
                  </div>
               </div>
               <IonRippleEffect />
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-8 h-80">
               <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-lg hover:bg-slate-800/80 transition-all flex flex-col justify-between cursor-pointer group">
                  <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-400 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-green-500/20">
                     <IonIcon icon={personAdd} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-2xl mb-1">Input Data Siswa</h4>
                     <p className="text-sm text-slate-400">Formulir pendaftaran prospek baru</p>
                  </div>
               </div>

               <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-lg hover:bg-slate-800/80 transition-all flex flex-col justify-between cursor-pointer group">
                  <div className="w-16 h-16 rounded-3xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-purple-500/20">
                     <IonIcon icon={videocam} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-2xl mb-1">Video Materi</h4>
                     <p className="text-sm text-slate-400">Pustaka video presentasi</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardDesktop;