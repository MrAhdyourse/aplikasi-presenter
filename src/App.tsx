import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { SchedulePage } from './pages/SchedulePage';
import { ApplicantsPage } from './pages/ApplicantsPage';
import { OKRPage } from './pages/OKRPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        
        {/* 1. PUBLIC ROUTE: LOGIN (Tanpa Sidebar) */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        {/* 2. PROTECTED ROUTES (Dengan Sidebar & MainLayout) */}
        
        <Route exact path="/dashboard">
          <MainLayout title="Overview Dashboard">
             <DashboardPage />
          </MainLayout>
        </Route>

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

        {/* Placeholder untuk Katalog (Segera dibuat) */}
        <Route exact path="/catalog">
           <MainLayout title="Katalog Sekolah">
             <div className="text-center p-10 text-gray-500">Modul Katalog Sedang Dimuat...</div>
           </MainLayout>
        </Route>

        {/* 3. DEFAULT REDIRECT */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;