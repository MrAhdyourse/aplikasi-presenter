import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { rocketOutline, flame, analyticsOutline } from 'ionicons/icons';

export const OKRPage: React.FC = () => {
  const [fuel, setFuel] = useState(0);
  const [launched, setLaunched] = useState(false);

  const addFuel = () => {
    if (launched) return;
    setFuel(prev => Math.min(100, prev + 10));
  };

  useEffect(() => {
    if (fuel === 100 && !launched) {
      setTimeout(() => {
        setLaunched(true);
      }, 500);
    }
  }, [fuel, launched]);

  useEffect(() => {
    if (launched) {
      // Reset after animation
      const timer = setTimeout(() => {
        setLaunched(false);
        setFuel(0);
      }, 5000); // 5 seconds flight time
      return () => clearTimeout(timer);
    }
  }, [launched]);

  return (
    <IonPage>
      <IonContent fullscreen className="bg-slate-950">
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-end pb-20">
          
          {/* Star Field Background */}
          <div className="absolute inset-0 z-0">
             {[...Array(50)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute bg-white rounded-full opacity-70 animate-pulse"
                    style={{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        width: Math.random() * 3 + 'px',
                        height: Math.random() * 3 + 'px',
                        animationDelay: Math.random() * 2 + 's'
                    }}
                ></div>
             ))}
          </div>

          {/* Header UI */}
          <div className="absolute top-10 left-0 w-full text-center z-10 px-6">
             <div className="inline-flex items-center gap-2 border border-green-500/30 bg-green-900/20 px-4 py-1 rounded-full mb-4 backdrop-blur-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-xs font-mono text-green-400">SYSTEM STATUS: BUILDING REPORT</span>
             </div>
             <h1 className="text-4xl font-black italic tracking-tighter mb-1">OKR DASHBOARD</h1>
             <p className="text-slate-400 font-mono text-sm">Target & Performance Module</p>
          </div>

          {/* Rocket Container */}
          <div className={`relative z-10 transition-all duration-1000 ease-in ${launched ? '-translate-y-[150vh]' : 'translate-y-0'}`}>
             
             {/* The Rocket */}
             <div className={`relative transition-transform duration-100 ${launched ? 'animate-vibrate' : ''}`}>
                 <IonIcon icon={rocketOutline} className="text-9xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] rotate-[-45deg]" />
                 
                 {/* Flames */}
                 {(fuel > 0 || launched) && (
                     <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center">
                        <IonIcon 
                            icon={flame} 
                            className={`text-orange-500 transition-all duration-300 ${launched ? 'text-7xl animate-pulse' : 'text-4xl'}`} 
                            style={{ opacity: fuel / 100 }}
                        />
                     </div>
                 )}
             </div>

          </div>

          {/* Control Panel */}
          <div className="z-20 w-full max-w-xs mt-20 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
             
             {!launched ? (
                <>
                    <div className="mb-4 flex justify-between text-xs font-mono text-slate-400">
                        <span>FUEL TANK</span>
                        <span>{fuel}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden mb-6 border border-slate-700">
                        <div 
                            className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-300 ease-out"
                            style={{ width: `${fuel}%` }}
                        ></div>
                    </div>

                    <button 
                        onClick={addFuel}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-[0_5px_0_rgb(30,58,138)] active:shadow-none active:translate-y-[5px] transition-all flex items-center justify-center gap-2"
                    >
                        <IonIcon icon={analyticsOutline} />
                        {fuel < 100 ? "PUMP DATA FUEL" : "PREPARING LAUNCH..."}
                    </button>
                    <p className="text-[10px] text-center mt-4 text-slate-500 font-mono">
                        * Tap repeatedly to prepare the report engine
                    </p>
                </>
             ) : (
                <div className="text-center py-4">
                    <h3 className="text-2xl font-bold text-white mb-2">LAUNCHING!</h3>
                    <p className="text-slate-400 text-sm">Preparing your OKR data for orbit...</p>
                </div>
             )}

          </div>
          
          <style>{`
            @keyframes vibrate {
                0% { transform: translate(0, 0) rotate(-45deg); }
                20% { transform: translate(-2px, 2px) rotate(-45deg); }
                40% { transform: translate(-2px, -2px) rotate(-45deg); }
                60% { transform: translate(2px, 2px) rotate(-45deg); }
                80% { transform: translate(2px, -2px) rotate(-45deg); }
                100% { transform: translate(0, 0) rotate(-45deg); }
            }
            .animate-vibrate {
                animation: vibrate 0.1s infinite;
            }
          `}</style>
        </div>
      </IonContent>
    </IonPage>
  );
};