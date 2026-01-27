import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

export const BrosurIklanPage: React.FC = () => {
  return (
    <div className="p-4">
      <IonCard className="m-0 shadow-lg border border-orange-100 rounded-2xl overflow-hidden">
        <IonCardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <IonCardTitle className="text-white">Brosur & Materi Iklan</IonCardTitle>
          <IonCardSubtitle className="text-orange-100">Media Promosi Presenter</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">
            Kumpulan brosur digital dan aset promosi yang dapat dibagikan kepada calon mahasiswa.
          </p>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
