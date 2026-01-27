import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { 
  IonMenu, 
  IonContent, 
  IonIcon, 
  IonMenuToggle,
  IonAvatar,
  IonRippleEffect
} from '@ionic/react';
import { 
  gridOutline, 
  schoolOutline, 
  peopleOutline, 
  calendarOutline, 
  statsChartOutline, 
  logOutOutline,
  settingsOutline,
  informationCircleOutline,
  laptopOutline,
  cashOutline,
  megaphoneOutline
} from 'ionicons/icons';
import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const user = auth.currentUser;

  const appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: gridOutline },
    { title: 'Info KSK', url: '/info-ksk', icon: informationCircleOutline },
    { title: 'Laptop Gratis', url: '/laptop-gratis', icon: laptopOutline },
    { title: 'Info Biaya', url: '/info-biaya', icon: cashOutline },
    { title: 'Brosur Iklan', url: '/brosur-iklan', icon: megaphoneOutline },
    { title: 'Katalog Sekolah', url: '/catalog', icon: schoolOutline },
    { title: 'Jadwal Sosialisasi', url: '/schedule', icon: calendarOutline },
    { title: 'Data Aplikan', url: '/applicants', icon: peopleOutline },
    { title: 'Laporan OKR', url: '/okr', icon: statsChartOutline },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    history.replace('/login');
  };

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent className="--background: transparent;">
        {/* Glassmorphism Container */}
        <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          
          {/* 1. Profile Section (Atmospheric) */}
          <div className="relative px-6 pt-10 pb-8 bg-gradient-to-b from-blue-50/50 to-transparent">
            <div className="flex items-center gap-4">
               <div className="relative">
                 <IonAvatar className="w-14 h-14 border-4 border-white shadow-lg">
                   <img src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=0D8ABC&color=fff`} alt="Avatar" />
                 </IonAvatar>
                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
               </div>
               <div className="overflow-hidden">
                 <h2 className="text-lg font-bold text-slate-800 truncate leading-tight">{user?.displayName?.split(' ')[0] || 'Presenter'}</h2>
                 <p className="text-xs text-slate-500 truncate font-medium">Marketing Team</p>
               </div>
            </div>
          </div>

          {/* 2. Navigation Items (Pill Shape) */}
          <div className="px-4 flex-1 overflow-y-auto space-y-1">
            <div className="px-4 mb-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Menu Utama</div>
            
            {appPages.map((p, index) => {
              const isActive = location.pathname === p.url;
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <div 
                    onClick={() => history.push(p.url)}
                    className={`
                      relative overflow-hidden group flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 translate-x-1' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <IonIcon icon={p.icon} className={`text-xl ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className="text-sm font-semibold tracking-wide">{p.title}</span>
                    <IonRippleEffect />
                  </div>
                </IonMenuToggle>
              );
            })}

            <div className="px-4 mb-2 mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan</div>
            
            {/* Dummy Settings Item */}
             <div className="relative overflow-hidden group flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer text-slate-600 hover:bg-slate-100 transition-all">
                <IonIcon icon={settingsOutline} className="text-xl text-slate-400" />
                <span className="text-sm font-semibold">Pengaturan Akun</span>
                <IonRippleEffect />
             </div>
          </div>

          {/* 3. Footer Actions */}
          <div className="p-4 mb-4">
             <div 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 active:scale-95 transition-all cursor-pointer shadow-sm"
             >
                <IonIcon icon={logOutOutline} />
                <span>Keluar Aplikasi</span>
             </div>
             <p className="text-[10px] text-center text-slate-300 mt-4 font-mono">v2.0.1 • Alpha Build</p>
          </div>

        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;