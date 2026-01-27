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
  statsChart, 
  notifications,
  search,
  trophyOutline,
  peopleOutline,
  chevronForward,
  gridOutline
} from 'ionicons/icons';
import { auth } from '../../shared/config/firebase-config';
import noiseBg from '../../assets/images/cdn/noise.svg';

const DashboardAndroid: React.FC = () => {
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
    <IonPage id="dashboard-android">
      {/* HEADER ANDROID: Floating Material Capsule with Slide Down */}
      {/* FIX: Gunakan Dynamic Safe Area Padding agar tidak ketabrak Poni/Status Bar */}
      <IonHeader className="ion-no-border shadow-none px-4 animate-slide-down" style={{ paddingTop: 'calc(var(--ion-safe-area-top) + 16px)' }}>
        <IonToolbar className="--background: transparent;">
          <div className="flex items-center justify-between bg-[#14141e]/40 backdrop-blur-[15px] p-1.5 rounded-full border border-white/10 shadow-xl group">
            
            <IonButtons slot="start">
              <div 
                onClick={() => document.querySelector('ion-menu')?.open()}
                className="relative cursor-pointer overflow-hidden rounded-full p-0.5 active:scale-95 transition-transform"
              >
                 {/* Premium Glow Effect for Mobile */}
                 <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"></div>
                 
                 <div className="relative flex items-center gap-2 pl-1 pr-3 py-1">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/30 shadow-sm">
                       <img 
                         src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random&color=fff`} 
                         alt="Profile" 
                       />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Menu</span>
                       <IonIcon icon={gridOutline} className="text-white/80 text-sm" />
                    </div>
                 </div>
                 <IonRippleEffect />
              </div>
            </IonButtons>
            
            <IonButtons slot="end" className="gap-2 mr-1">
               <button className="relative overflow-hidden w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center border border-white/10 shadow-sm active:bg-white/10 ion-activatable">
                  <IonIcon icon={search} className="text-lg" />
                  <IonRippleEffect />
                </button>
                <button className="relative overflow-hidden w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center border border-white/10 shadow-sm active:bg-white/10 ion-activatable">
                  <IonIcon icon={notifications} className="text-lg" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                  <IonRippleEffect />
                </button>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="--background: #0f172a;">
        {/* === BACKGROUND: MODERN TECH MESH (MOBILE VERSION) === */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
           {/* Layer 1: Base */}
           <div className="absolute inset-0 bg-slate-950"></div>
           
           {/* Layer 2: Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

           {/* Layer 3: Animated Blobs (Smaller for Mobile) */}
           <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
           <div className="absolute top-20 -right-10 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
           <div className="absolute -bottom-20 left-10 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>

           {/* Layer 4: Noise */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${noiseBg})` }}></div>
        </div>

        <div className="relative z-10 px-5 pb-20 animate-fade-in-up">
          <div className="mt-4 mb-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{currentDate}</span>
             </div>
             
             <h2 className="text-3xl font-black text-white leading-tight">
               {greeting}, <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                 {user?.displayName?.split(' ')[0] || 'Presenter'}
               </span>
             </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="relative overflow-hidden bg-slate-900/80 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/10 shadow-sm ion-activatable">
                <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400"><IonIcon icon={peopleOutline} /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Aplikan</span>
                </div>
                <div className="text-2xl font-black text-white">128</div>
                <div className="text-[10px] text-green-400 font-bold mt-1">+12% Naik</div>
                <IonRippleEffect />
             </div>

             <div className="relative overflow-hidden bg-slate-900/80 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/10 shadow-sm ion-activatable">
                <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-orange-500/20 rounded-lg text-orange-400"><IonIcon icon={trophyOutline} /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Target</span>
                </div>
                <div className="text-2xl font-black text-white">85%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                   <div className="bg-orange-500 h-full w-[85%] rounded-full"></div>
                </div>
                <IonRippleEffect />
             </div>
          </div>

          <div className="flex items-center justify-between mb-3 px-1">
             <h3 className="text-lg font-bold text-slate-200">Menu Utama</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 to-indigo-900 text-white shadow-lg h-56 ion-activatable border border-white/10">
               <div className="absolute -right-8 -top-8 text-white/10">
                  <IonIcon icon={book} style={{ fontSize: '180px' }} />
               </div>
               <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit text-[10px] font-bold uppercase border border-white/20">
                     Prioritas
                  </div>
                  <div>
                     <h3 className="text-3xl font-black leading-none mb-1">Katalog<br/>Sekolah</h3>
                     <p className="text-blue-100/80 text-xs font-medium mt-2 flex items-center gap-1">
                        Akses Data Jurusan <IonIcon icon={chevronForward} />
                     </p>
                  </div>
               </div>
               <IonRippleEffect />
            </div>

            <div className="grid grid-cols-2 gap-4 h-48">
               <div className="bg-slate-900/80 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/10 shadow-sm flex flex-col justify-between ion-activatable relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl border border-green-500/20">
                     <IonIcon icon={personAdd} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-md leading-tight">Input<br/>Data</h4>
                  </div>
                  <IonRippleEffect />
               </div>

               <div className="bg-slate-900/80 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/10 shadow-sm flex flex-col justify-between ion-activatable relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl border border-purple-500/20">
                     <IonIcon icon={videocam} />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-md leading-tight">Video<br/>Materi</h4>
                  </div>
                  <IonRippleEffect />
               </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md rounded-[1.5rem] p-5 border border-white/10 shadow-sm flex items-center gap-4 ion-activatable relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-2xl border border-orange-500/20">
                   <IonIcon icon={statsChart} />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-md">Laporan OKR</h4>
                   <p className="text-xs text-slate-400">Statistik performa</p>
                </div>
                <IonIcon icon={chevronForward} className="text-slate-500" />
                <IonRippleEffect />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardAndroid;