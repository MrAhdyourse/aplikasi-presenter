import React from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonIcon
} from '@ionic/react';
import { home } from 'ionicons/icons';

import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string; // Judul halaman opsional
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  
  // Format Breadcrumb sederhana (misal: /catalog -> Catalog)
  const pageName = location.pathname.split('/')[1] || 'Dashboard';
  const formattedTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <>


      {/* 2. Main Page Content Wrapper */}
      <IonPage>
        {/* FIX: Tambahkan padding lebih dalam lagi (+40px) agar benar-benar 'Pass' di Android APK */}
        <IonHeader 
          className="ion-no-border bg-white border-b border-gray-100 shadow-sm"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 40px) + 40px)' }}
        >
          <IonToolbar className="--background: white; --min-height: 70px;">
            <IonButtons slot="start" className="ml-2">
              <IonMenuButton color="primary" /> {/* Tombol Hamburger */}
            </IonButtons>
            
            <div className="flex flex-col justify-center ml-2">
               <h2 className="text-lg font-bold text-gray-800 m-0 leading-tight">
                 {title || formattedTitle}
               </h2>
               <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <IonIcon icon={home} className="text-[10px]" /> 
                  <span>/</span>
                  <span>{formattedTitle}</span>
               </div>
            </div>

            {/* Area Kanan Header (Notifikasi/Action) - Bisa diisi nanti */}
            <IonButtons slot="end" className="mr-2">
               {/* Placeholder untuk lonceng notifikasi dll */}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="bg-gray-50">
           {/* 
             Slot untuk konten halaman. 
             Kita beri padding dan background abu-abu muda ala dashboard modern 
           */}
           <div className="min-h-full bg-gray-50 p-4 md:p-6 lg:p-8">
             {children}
           </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default MainLayout;