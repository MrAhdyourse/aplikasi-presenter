import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { getPlatformClass } from './shared/platforms/platform-manager';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

/* Core CSS */
import './index.css';

setupIonicReact({
  mode: 'md',
});

const App: React.FC = () => {
  const platformClass = getPlatformClass();

  return (
    <IonApp className={platformClass}>
      <IonReactRouter>
        <IonRouterOutlet>
          
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
