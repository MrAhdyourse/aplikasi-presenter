import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  // Langsung cek currentUser untuk respon instan
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    // Failsafe: Jika dalam 2 detik status auth masih loading, anggap tidak login agar tidak stuck
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 2000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      clearTimeout(timer);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [loading]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="--background: #0f172a;">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative">
               <IonSpinner name="crescent" color="primary" />
               <div className="absolute inset-0 animate-ping opacity-20 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase animate-pulse">Security Check...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
