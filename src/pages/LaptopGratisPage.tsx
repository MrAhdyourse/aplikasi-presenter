import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

export const LaptopGratisPage: React.FC = () => {
  return (
    <div className="p-4">
      <IonCard className="m-0 shadow-lg border border-purple-100 rounded-2xl overflow-hidden">
        <IonCardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <IonCardTitle className="text-white">Program Laptop Gratis</IonCardTitle>
          <IonCardSubtitle className="text-purple-100">Fasilitas Penunjang Belajar</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">
            Informasi mengenai syarat dan ketentuan mendapatkan fasilitas laptop gratis untuk mahasiswa baru.
          </p>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
