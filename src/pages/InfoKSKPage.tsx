import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

export const InfoKSKPage: React.FC = () => {
  return (
    <div className="p-4">
      <IonCard className="m-0 shadow-lg border border-blue-100 rounded-2xl overflow-hidden">
        <IonCardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <IonCardTitle className="text-white">Informasi KSK</IonCardTitle>
          <IonCardSubtitle className="text-blue-100">Lembaga Penempatan Kerja & Karir</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">
            Halaman ini berisi informasi detail mengenai kerjasama perusahaan dan penempatan kerja mahasiswa LP3I.
          </p>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
