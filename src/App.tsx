import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { StatusBar, Style } from '@capacitor/status-bar';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Layout & Pages
import MainLayout from './shared/components/MainLayout';
import Sidebar from './shared/components/Sidebar'; 
import ProtectedRoute from './shared/components/ProtectedRoute'; // Import Satpam
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard'; 
import { AboutPage } from './pages/AboutPage';
import { SchedulePage } from './pages/SchedulePage';
import { ApplicantsPage } from './pages/ApplicantsPage';
import { OKRPage } from './pages/OKRPage';
import { CatalogPage } from './pages/CatalogPage';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const setupStatusBar = async () => {
      if (isPlatform('hybrid')) {
        try {
          // Set status bar to dark background (Android only)
          await StatusBar.setBackgroundColor({ color: '#0f172a' });
          // Set text to light (White text)
          await StatusBar.setStyle({ style: Style.Dark });
        } catch (e) {
          console.warn('Status Bar not available', e);
        }
      }
    };
    setupStatusBar();
  }, []);

  return (
  <IonApp>
    <IonReactRouter>
      
      {/* 
        SIDEBAR GLOBAL:
        Diletakkan di sini agar bisa diakses dari Dashboard maupun Halaman lain.
        IonMenu sudah menangani logic "kapan dia muncul" (hanya muncul jika ada MenuButton).
        Kecuali di halaman Login, MenuButton tidak ada, jadi aman.
      */}
      <Sidebar />

      <IonRouterOutlet>
        <Switch>
          {/* 1. PUBLIC ROUTE: LOGIN (Gerbang Utama) */}
          <Route exact path="/login">
            <LoginPage />
          </Route>

          {/* 2. PROTECTED ROUTES (Hanya untuk yang sudah login) */}
          <ProtectedRoute exact path="/dashboard">
            <DashboardPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/about">
            <MainLayout title="Tentang Aplikasi">
               <AboutPage />
            </MainLayout>
          </ProtectedRoute>

          <ProtectedRoute exact path="/schedule">
             <MainLayout title="Jadwal Sosialisasi">
               <SchedulePage />
             </MainLayout>
          </ProtectedRoute>

          <ProtectedRoute exact path="/applicants">
             <MainLayout title="Data Aplikan">
               <ApplicantsPage />
             </MainLayout>
          </ProtectedRoute>

          <ProtectedRoute exact path="/okr">
             <MainLayout title="Laporan OKR">
               <OKRPage />
             </MainLayout>
          </ProtectedRoute>

          <ProtectedRoute exact path="/catalog">
             <MainLayout title="Katalog Sekolah">
               <CatalogPage />
             </MainLayout>
          </ProtectedRoute>

          {/* 3. DEFAULT REDIRECT */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>

          {/* 4. FALLBACK (Jika rute tidak ditemukan, balik ke dashboard) */}
          <Route path="*">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
