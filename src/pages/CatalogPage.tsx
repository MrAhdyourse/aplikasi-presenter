import React, { useState } from 'react';
import { 
  IonBadge, 
  IonIcon, 
  IonSearchbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel
} from '@ionic/react';
import { 
  briefcaseOutline, 
  timeOutline, 
  rocketOutline, 
  chevronForwardOutline, 
  star 
} from 'ionicons/icons';

// Import Gambar Lokal (Offline-Ready)
import imgBisnis from '../assets/images/cdn/catalog-bisnis.jpg';
import imgIT from '../assets/images/cdn/catalog-it.jpg';
import imgAkun from '../assets/images/cdn/catalog-akuntansi.jpg';

interface ProgramStudi {
  id: string;
  name: string;
  level: string; // D3 / S1
  description: string;
  prospect: string[];
  duration: string;
  category: 'bisnis' | 'teknologi' | 'akuntansi';
  image: string;
}

const programs: ProgramStudi[] = [
  {
    id: '1',
    name: 'Administrasi Bisnis',
    level: 'Diploma 3',
    description: 'Mempelajari pengelolaan operasional bisnis modern, manajemen perkantoran, dan kewirausahaan digital.',
    prospect: ['HRD', 'Admin Officer', 'Entrepreneur'],
    duration: '3 Tahun',
    category: 'bisnis',
    image: imgBisnis,
  },
  {
    id: '2',
    name: 'Manajemen Informatika',
    level: 'Diploma 3',
    description: 'Fokus pada pengembangan perangkat lunak, sistem informasi, dan pengelolaan database perusahaan.',
    prospect: ['Web Developer', 'Systems Analyst', 'IT Support'],
    duration: '3 Tahun',
    category: 'teknologi',
    image: imgIT,
  },
  {
    id: '3',
    name: 'Komputerisasi Akuntansi',
    level: 'Diploma 3',
    description: 'Integrasi antara ilmu akuntansi keuangan dengan sistem teknologi informasi modern.',
    prospect: ['Accounting Staff', 'Tax Consultant', 'Auditor'],
    duration: '3 Tahun',
    category: 'akuntansi',
    image: imgAkun,
  }
];

export const CatalogPage: React.FC = () => {  const [filter, setFilter] = useState<'all' | 'bisnis' | 'teknologi' | 'akuntansi'>('all');
  const [searchText, setSearchText] = useState('');

  const filteredPrograms = programs.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container-fluid p-0 animate-in fade-in duration-500">
      {/* Search & Filter Header */}
      <div className="bg-white/50 backdrop-blur-md sticky top-0 z-10 px-4 py-3 border-b border-slate-200 shadow-sm">
        <IonSearchbar 
          value={searchText} 
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Cari program studi..."
          className="custom-searchbar mb-2"
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as any)} mode="ios">
          <IonSegmentButton value="all">
            <IonLabel>Semua</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="bisnis">
            <IonLabel>Bisnis</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="teknologi">
            <IonLabel>Teknik</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      <div className="p-4">
        <div className="row g-4">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="col-12 col-md-6 col-lg-4">
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
                
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <IonBadge className="absolute top-4 right-4 bg-blue-600 px-3 py-1.5 rounded-lg font-bold shadow-lg">
                    {program.level}
                  </IonBadge>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                       <IonIcon icon={star} className="text-blue-500 text-xs" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Unggulan LP3I</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {program.name}
                  </h3>
                  
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {program.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <IonIcon icon={timeOutline} className="text-blue-500" />
                      <span>{program.duration} Masa Studi</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <IonIcon icon={briefcaseOutline} className="text-blue-500" />
                      <span className="truncate">Karir: {program.prospect.join(', ')}</span>
                    </div>
                  </div>

                  <button className="mt-auto w-full py-3.5 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 group-hover:shadow-lg group-hover:shadow-blue-200">
                    <span>Lihat Kurikulum</span>
                    <IonIcon icon={chevronForwardOutline} className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <div className="col-12 text-center py-20">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IonIcon icon={rocketOutline} className="text-3xl text-slate-400" />
               </div>
               <h4 className="text-lg font-bold text-slate-700">Tidak ada hasil</h4>
               <p className="text-slate-500">Coba gunakan kata kunci pencarian lain.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-10 bg-slate-50 mt-10 text-center">
         <p className="text-xs text-slate-400 font-medium italic">
           * Seluruh program studi telah terakreditasi dan berbasis kurikulum link & match industri.
         </p>
      </div>
    </div>
  );
};

export default CatalogPage;
