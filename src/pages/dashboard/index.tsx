import React, { lazy, Suspense } from 'react';
import { isPlatform } from '@ionic/react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';

// Lazy Load Views agar performa maksimal (Code Splitting)
const DashboardDesktop = lazy(() => import('./DashboardDesktop'));
const DashboardAndroid = lazy(() => import('./DashboardAndroid'));
const DashboardIOS = lazy(() => import('./DashboardIOS'));

const DashboardController: React.FC = () => {
  // 1. Deteksi Platform (Senjata 3: Platform Detection)
  const isIOS = isPlatform('ios');
  const isAndroid = isPlatform('android');
  
  // 2. Tentukan View yang akan dipakai
  // Prioritas: Mobile Native -> Desktop Fallback
  let ViewComponent = DashboardDesktop; // Default Desktop

  if (isIOS) {
    ViewComponent = DashboardIOS;
  } else if (isAndroid) {
    ViewComponent = DashboardAndroid;
  }

  // 3. Render View dengan Suspense (Loading State)
  return (
    <Suspense fallback={
      <IonPage>
        <IonContent className="--background: #0f172a;">
           <div className="flex items-center justify-center h-full flex-col gap-4">
              <IonSpinner name="crescent" color="primary" />
              <p className="text-slate-500 text-xs font-mono">Mendeteksi Perangkat...</p>
           </div>
        </IonContent>
      </IonPage>
    }>
      <ViewComponent />
    </Suspense>
  );
};

export default DashboardController;
