import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { bookOutline, libraryOutline, star } from 'ionicons/icons';

export const CatalogPage: React.FC = () => {
  const [knowledgePoints, setKnowledgePoints] = useState(0);
  const [floatingBooks, setFloatingBooks] = useState<{id: number, left: number, speed: number, color: string}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
        if (floatingBooks.length < 8) {
            const newBook = {
                id: Date.now(),
                left: Math.random() * 80 + 10, // 10% to 90% width
                speed: Math.random() * 5 + 5,
                color: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
            };
            setFloatingBooks(prev => [...prev, newBook]);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, [floatingBooks]);

  const collectBook = (id: number) => {
    setKnowledgePoints(prev => prev + 10);
    setFloatingBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-amber-50">
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-serif bg-[#fdfbf7]">
            
            {/* Background Shelf Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 120px' }}>
            </div>

            {/* Header */}
            <div className="z-10 text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-100 max-w-md mx-4">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <IonIcon icon={libraryOutline} className="text-4xl text-amber-600" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2 font-serif">The Digital Library</h1>
                <p className="text-slate-500 italic mb-6">"Katalog Sekolah sedang disusun oleh para pustakawan digital kami..."</p>
                
                <div className="flex items-center justify-center gap-2 bg-slate-800 text-amber-400 px-6 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform">
                    <IonIcon icon={star} />
                    <span>Knowledge Collected: {knowledgePoints} XP</span>
                </div>
                
                <p className="mt-4 text-xs text-slate-400 font-sans">Tap the falling books to collect knowledge!</p>
            </div>

            {/* Falling Books Game Layer */}
            {floatingBooks.map(book => (
                <div
                    key={book.id}
                    onClick={() => collectBook(book.id)}
                    className={`absolute cursor-pointer w-12 h-16 rounded-r-md shadow-md border-l-4 border-white/20 hover:scale-110 active:scale-90 transition-transform ${book.color} flex items-center justify-center`}
                    style={{
                        left: `${book.left}%`,
                        top: '-10%',
                        animation: `fall ${book.speed}s linear forwards`
                    }}
                    onAnimationEnd={() => setFloatingBooks(prev => prev.filter(b => b.id !== book.id))}
                >
                    <IonIcon icon={bookOutline} className="text-white/50 text-xl" />
                </div>
            ))}

            {/* CSS Animation for Falling */}
            <style>{`
                @keyframes fall {
                    0% { top: -10%; transform: rotate(0deg); }
                    100% { top: 110%; transform: rotate(360deg); }
                }
            `}</style>

        </div>
      </IonContent>
    </IonPage>
  );
};
