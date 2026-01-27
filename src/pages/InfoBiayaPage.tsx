import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

export const InfoBiayaPage: React.FC = () => {
  return (
    <div className="p-4">
      <IonCard className="m-0 shadow-lg border border-emerald-100 rounded-2xl overflow-hidden">
        <IonCardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <IonCardTitle className="text-white">Informasi Biaya</IonCardTitle>
          <IonCardSubtitle className="text-emerald-100">Investasi Pendidikan Masa Depan</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">
            Rincian biaya pendidikan, skema cicilan, dan beasiswa yang tersedia di LP3I Indramayu.
          </p>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
