import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { 
  IonMenu, 
  IonContent, 
  IonList, 
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
  logOutOutline
} from 'ionicons/icons';
import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const user = auth.currentUser;

  const appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: gridOutline },
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
    <IonMenu contentId="main-content" type="overlay" className="my-custom-menu">
      <IonContent className="--background: #ffffff;">
        <div className="flex flex-col h-full bg-white">
          
          {/* 1. Header Area (Brand) */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                P
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">Presenter<span className="text-blue-600">App</span></h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide">INTERNAL SYSTEM</p>
              </div>
            </div>

            {/* User Profile Card (Mini) */}
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
               <IonAvatar className="w-10 h-10 border-2 border-white shadow-sm">
                 <img src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random`} alt="Avatar" />
               </IonAvatar>
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-gray-800 truncate">{user?.displayName || 'Presenter'}</p>
                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
               </div>
            </div>
          </div>

          {/* 2. Navigation Items (Google Style) */}
          <div className="px-3 flex-1 overflow-y-auto">
            <IonList lines="none" className="bg-transparent p-0">
              <div className="pl-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Main Menu</div>
              
              {appPages.map((p, index) => {
                const isActive = location.pathname === p.url;
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <div 
                      onClick={() => history.push(p.url)}
                      className={`
                        relative overflow-hidden group flex items-center gap-4 px-4 py-3 mb-1 rounded-r-full cursor-pointer transition-all duration-300
                        ${isActive 
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                        }
                      `}
                    >
                      <IonIcon icon={p.icon} className={`text-xl transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                      <span className="text-sm">{p.title}</span>
                      <IonRippleEffect />
                    </div>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </div>

          {/* 3. Footer Actions */}
          <div className="p-4 border-t border-gray-100">
             <div 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 cursor-pointer transition-colors relative overflow-hidden"
             >
                <IonIcon icon={logOutOutline} />
                <span className="text-sm font-medium">Keluar Sesi</span>
                <IonRippleEffect type="bounded" />
             </div>
             <p className="text-[10px] text-center text-gray-400 mt-4">v1.2.0 • LP3I Indramayu</p>
          </div>

        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Sidebar;