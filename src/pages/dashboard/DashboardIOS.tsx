import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonIcon,
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

const DashboardIOS: React.FC = () => {
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
    <IonPage id="dashboard-ios">
      {/* HEADER iOS: Ultra Glass Floating Island with Smooth Slide */}
      <IonHeader className="ion-no-border shadow-none px-5 pt-14 pb-2 animate-slide-down">
        <IonToolbar className="--background: transparent;">
          <div className="flex items-center justify-between bg-[#14141e]/40 backdrop-blur-[15px] p-1.5 rounded-full border border-white/10 shadow-lg">
            
            <IonButtons slot="start">
              <div 
                onClick={() => document.querySelector('ion-menu')?.open()}
                className="group relative cursor-pointer active:opacity-70 transition-all duration-300"
              >
                 {/* iOS Soft Glow */}
                 <div className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full"></div>
                 
                 <div className="relative flex items-center gap-2 pl-1 pr-3 py-1">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/30 shadow-sm">
                       <img 
                         src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random&color=fff`} 
                         alt="Profile" 
                       />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">Apps</span>
                       <IonIcon icon={gridOutline} className="text-white text-sm" />
                    </div>
                 </div>
              </div>
            </IonButtons>
            
            <IonButtons slot="end" className="gap-3 mr-1">
               <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl text-white flex items-center justify-center border border-white/10 shadow-sm active:scale-90 transition-transform">
                  <IonIcon icon={search} className="text-lg" />
                </button>
                <button className="relative w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl text-white flex items-center justify-center border border-white/10 shadow-sm active:scale-90 transition-transform">
                  <IonIcon icon={notifications} className="text-lg" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-950 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                </button>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="--background: #000000;">
        <div className="fixed inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-black"></div>
           <div className="absolute -top-20 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent"></div>
           <div className="absolute top-20 right-[-100px] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[90px]"></div>
        </div>

        <div className="relative z-10 px-5 pb-24 animate-fade-in-up">
          <div className="mt-2 mb-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-3">
               <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
               <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest">{currentDate}</span>
             </div>
             
             <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
               {greeting}, <br/>
               <span className="text-blue-400">
                 {user?.displayName?.split(' ')[0] || 'Presenter'}
               </span>
             </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-white/5 backdrop-blur-xl p-5 rounded-[20px] border border-white/10 active:scale-98 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-1.5 bg-blue-500 rounded-lg text-white"><IonIcon icon={peopleOutline} className="text-xs" /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Aplikan</span>
                </div>
                <div className="text-3xl font-bold text-white">128</div>
             </div>

             <div className="bg-white/5 backdrop-blur-xl p-5 rounded-[20px] border border-white/10 active:scale-98 transition-transform">
                <div className="flex items-center gap-2 mb-3">
                   <div className="p-1.5 bg-orange-500 rounded-lg text-white"><IonIcon icon={trophyOutline} className="text-xs" /></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Target</span>
                </div>
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3">
                   <div className="bg-orange-500 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]"></div>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="text-xl font-bold text-white tracking-tight">Menu Utama</h3>
          </div>
          
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[24px] bg-blue-600 text-white shadow-xl h-60 active:scale-98 transition-transform">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700"></div>
               <div className="absolute -right-10 -top-10 text-white/10">
                  <IonIcon icon={book} style={{ fontSize: '200px' }} />
               </div>
               <div className="relative z-10 p-7 flex flex-col justify-between h-full">
                  <div className="bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-full w-fit text-[10px] font-bold uppercase tracking-wide">
                     Prioritas
                  </div>
                  <div>
                     <h3 className="text-3xl font-bold leading-none mb-2">Katalog<br/>Sekolah</h3>
                     <p className="text-blue-100 text-sm font-medium mt-2 flex items-center gap-1">
                        Buka Modul <IonIcon icon={chevronForward} />
                     </p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-48">
               <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-5 border border-white/5 flex flex-col justify-between active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl shadow-lg shadow-green-500/30">
                     <IonIcon icon={personAdd} />
                  </div>
                  <h4 className="font-bold text-white text-lg leading-tight">Input<br/>Data</h4>
               </div>

               <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-5 border border-white/5 flex flex-col justify-between active:scale-95 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
                     <IonIcon icon={videocam} />
                  </div>
                  <h4 className="font-bold text-white text-lg leading-tight">Video<br/>Materi</h4>
               </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/5 flex items-center gap-5 active:scale-98 transition-transform">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-white flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
                   <IonIcon icon={statsChart} />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-lg">Laporan OKR</h4>
                   <p className="text-xs text-slate-400">Statistik performa</p>
                </div>
                <div className="bg-white/10 rounded-full p-2">
                    <IonIcon icon={chevronForward} className="text-white text-sm" />
                </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardIOS;