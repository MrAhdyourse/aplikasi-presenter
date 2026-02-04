import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { settingsOutline, constructOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const SettingsPage: React.FC = () => {
  const [rotationSpeed, setRotationSpeed] = useState(10);
  const [isReverse, setIsReverse] = useState(false);

  const toggleDirection = () => {
    setIsReverse(!isReverse);
  };

  const speedUp = () => {
    setRotationSpeed(prev => Math.max(2, prev - 2));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-slate-50">
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white relative overflow-hidden">
          
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-500 blur-3xl animate-pulse"></div>
             <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-500 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="z-10 flex flex-col items-center text-center p-6">
            <div className="relative mb-12 cursor-pointer group" onClick={toggleDirection}>
              {/* Main Gear */}
              <div 
                className={`w-32 h-32 border-8 border-slate-700 rounded-full flex items-center justify-center relative shadow-2xl transition-all duration-500 group-hover:border-blue-500`}
                style={{ 
                    animation: `spin ${rotationSpeed}s linear infinite`,
                    animationDirection: isReverse ? 'reverse' : 'normal'
                }}
              >
                 <div className="absolute w-full h-4 bg-slate-700 top-1/2 left-0 -translate-y-1/2 group-hover:bg-blue-500 transition-colors"></div>
                 <div className="absolute w-4 h-full bg-slate-700 top-0 left-1/2 -translate-x-1/2 group-hover:bg-blue-500 transition-colors"></div>
                 <div className="absolute w-full h-4 bg-slate-700 top-1/2 left-0 -translate-y-1/2 rotate-45 group-hover:bg-blue-500 transition-colors"></div>
                 <div className="absolute w-4 h-full bg-slate-700 top-0 left-1/2 -translate-x-1/2 rotate-45 group-hover:bg-blue-500 transition-colors"></div>
                 <div className="w-16 h-16 bg-slate-900 rounded-full z-10 flex items-center justify-center border-4 border-slate-800">
                    <IonIcon icon={settingsOutline} className="text-3xl text-slate-500" />
                 </div>
              </div>

              {/* Small Gear 1 */}
              <div 
                className="absolute -top-8 -right-8 w-16 h-16 border-4 border-slate-600 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                    animation: `spin ${rotationSpeed / 2}s linear infinite`,
                    animationDirection: isReverse ? 'normal' : 'reverse'
                }}
              >
                 <div className="absolute w-full h-2 bg-slate-600 top-1/2 left-0 -translate-y-1/2"></div>
                 <div className="absolute w-2 h-full bg-slate-600 top-0 left-1/2 -translate-x-1/2"></div>
                 <div className="absolute w-full h-2 bg-slate-600 top-1/2 left-0 -translate-y-1/2 rotate-45"></div>
                 <div className="absolute w-2 h-full bg-slate-600 top-0 left-1/2 -translate-x-1/2 rotate-45"></div>
                 <div className="w-8 h-8 bg-slate-900 rounded-full z-10"></div>
              </div>
            </div>

            <h1 className="text-3xl font-black mb-2 tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SYSTEM CONFIG
            </h1>
            <p className="text-slate-400 max-w-xs mx-auto mb-8 font-mono text-sm">
              Modul pengaturan sedang dirakit oleh tim engineering kami.
            </p>

            <div className="flex gap-4">
                <button 
                    onClick={speedUp}
                    className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm font-bold text-slate-300 hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-2"
                >
                    <IonIcon icon={constructOutline} />
                    Turbo Boost
                </button>
            </div>
            
            <div className="mt-12 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></div>
                    <span className="text-xs font-mono text-yellow-500">WORK IN PROGRESS</span>
                </div>
                <p className="text-[10px] text-left text-slate-400 leading-relaxed font-mono">
                    {'>'} Initializing preferences...<br/>
                    {'>'} Loading user config...<br/>
                    {'>'} Optimizing UI components...<br/>
                    <span className="animate-pulse">{'>'} Waiting for developer input_</span>
                </p>
            </div>

          </div>
        </div>

        <style>{`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
