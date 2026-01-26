import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import Sidebar from './shared/components/Sidebar'; // Import Sidebar Global
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
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
        
        {/* 1. PUBLIC ROUTE: LOGIN */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        {/* 2. DASHBOARD (Stand Alone Header - Tanpa MainLayout Wrapper) */}
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>

        {/* 3. SUB PAGES (Dengan MainLayout Wrapper) */}
        <Route exact path="/about">
          <MainLayout title="Tentang Aplikasi">
             <AboutPage />
          </MainLayout>
        </Route>

        <Route exact path="/schedule">
           <MainLayout title="Jadwal Sosialisasi">
             <SchedulePage />
           </MainLayout>
        </Route>

        <Route exact path="/applicants">
           <MainLayout title="Data Aplikan">
             <ApplicantsPage />
           </MainLayout>
        </Route>

        <Route exact path="/okr">
           <MainLayout title="Laporan OKR">
             <OKRPage />
           </MainLayout>
        </Route>

        <Route exact path="/catalog">
           <MainLayout title="Katalog Sekolah">
             <CatalogPage />
           </MainLayout>
        </Route>

        {/* 4. DEFAULT REDIRECT */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
