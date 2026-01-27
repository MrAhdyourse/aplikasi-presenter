import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import idLocale from '@fullcalendar/core/locales/id'; // Bahasa Indonesia
import { 
  IonModal, 
  IonItem, 
  IonInput, 
  IonIcon,
  IonToast,
  IonLoading,
  IonButton,
  useIonViewDidEnter
} from '@ionic/react';
import { 
  schoolOutline, 
  saveOutline, 
  refreshOutline,
  closeOutline,
  flagOutline,
  warningOutline
} from 'ionicons/icons';
import { databases, APPWRITE_IDS } from '../shared/config/appwrite-config';
import { ID, Query } from 'appwrite';

interface SosialisasiEvent {
  $id?: string;
  title: string; 
  start: string; 
  rooms: number; 
}

// DATA HARI LIBUR & PENTING INDONESIA 2026
const HOLIDAYS_2026 = [
  { title: 'Tahun Baru 2026', start: '2026-01-01', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Isra Mi\'raj', start: '2026-02-14', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Hari Suci Nyepi', start: '2026-03-19', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Idul Fitri 1447 H', start: '2026-03-20', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Idul Fitri 1447 H', start: '2026-03-21', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Wafat Yesus Kristus', start: '2026-04-03', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Hari Buruh', start: '2026-05-01', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Hari Raya Waisak', start: '2026-05-31', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Hari Lahir Pancasila', start: '2026-06-01', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Idul Adha 1447 H', start: '2026-05-27', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Tahun Baru Islam', start: '2026-06-16', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'HUT RI ke-81', start: '2026-08-17', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Maulid Nabi Muhammad', start: '2026-08-25', display: 'background', backgroundColor: '#fee2e2' },
  { title: 'Hari Raya Natal', start: '2026-12-25', display: 'background', backgroundColor: '#fee2e2' },
];

export const SchedulePage: React.FC = () => {
  // NOTE: IonPage & IonContent removed to avoid nesting issues with MainLayout
  
  const calendarRef = useRef<FullCalendar>(null); // REF untuk kontrol Kalender manual
  const [events, setEvents] = useState<SosialisasiEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SosialisasiEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', color: 'success' });
  
  // Error State for UI Feedback
  const [errorState, setErrorState] = useState<{isError: boolean, message: string}>({ isError: false, message: '' });

  const [formData, setFormData] = useState({ schoolName: '', date: '', rooms: 1 });

  const fetchData = async () => {
    // Jangan set loading true jika data sudah ada (biar ga kedip2 parah saat navigasi)
    if (events.length === 0) setLoading(true);
    
    setErrorState({ isError: false, message: '' });
    try {
      console.log('Fetching schedule data...');
      
      const response = await databases.listDocuments(
        APPWRITE_IDS.DATABASE_ID,
        APPWRITE_IDS.COLLECTION_SCHEDULE_ID,
        [Query.orderAsc('start')]
      );
      
      console.log('Fetch success:', response.documents.length, 'items');
      
      setEvents(response.documents.map((doc: any) => ({
        $id: doc.$id, title: doc.title, start: doc.start, rooms: doc.rooms
      })));

      // FIX BUG VISUAL: Paksa kalender render ulang setelah data masuk
      setTimeout(() => {
        if (calendarRef.current) {
          calendarRef.current.getApi().updateSize();
        }
      }, 100);

    } catch (error: any) {
      console.error("[FETCH ERROR DETAILS]", error);
      
      let debugMsg = error.message;
      if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
         debugMsg = 'Koneksi ke Appwrite Gagal. Pastikan Platform ID terdaftar di Console & Internet Aktif.';
      }
      
      setErrorState({ isError: true, message: debugMsg });
      setShowToast({ show: true, message: 'Gagal sinkronisasi data.', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  // FIX LIFECYCLE: Gunakan useIonViewDidEnter alih-alih useEffect
  // Ini memastikan data diload & kalender dirender ulang SETIAP KALI user masuk ke halaman ini
  useIonViewDidEnter(() => {
    fetchData();
    
    // SAFETY: Paksa resize lagi saat view masuk animasi selesai
    setTimeout(() => {
        calendarRef.current?.getApi().updateSize();
    }, 300);
  });

  const saveEvent = async () => {
    if (!formData.schoolName || !formData.date) {
      setShowToast({ show: true, message: 'Data belum lengkap, Bos!', color: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const dateObj = new Date(formData.date);
      if (isNaN(dateObj.getTime())) {
         throw new Error('Format tanggal tidak valid (Invalid Date)');
      }
      const isoDate = dateObj.toISOString();
      
      const data = { 
        title: formData.schoolName.trim(), 
        start: isoDate, 
        rooms: Number(formData.rooms) 
      };

      if (isEditing && selectedEvent?.$id) {
        await databases.updateDocument(
          APPWRITE_IDS.DATABASE_ID, 
          APPWRITE_IDS.COLLECTION_SCHEDULE_ID, 
          selectedEvent.$id, 
          data
        );
        setShowToast({ show: true, message: 'Jadwal diupdate dengan sukses!', color: 'success' });
      } else {
        await databases.createDocument(
          APPWRITE_IDS.DATABASE_ID, 
          APPWRITE_IDS.COLLECTION_SCHEDULE_ID, 
          ID.unique(), 
          data
        );
        setShowToast({ show: true, message: 'Jadwal baru berhasil dipasang!', color: 'success' });
      }
      setShowModal(false);
      fetchData();
    } catch (error: any) {
      console.error("[SAVE ERROR DETAILS]", error);
      let friendlyMessage = error.message || 'Cek atribut database';
      if (friendlyMessage.includes('Failed to fetch') || friendlyMessage.includes('Network Error')) {
        friendlyMessage = '⚠️ KONEKSI BLOKIR: Daftarkan Platform Android/Web di Appwrite Console.';
      }
      setShowToast({ show: true, message: friendlyMessage, color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setLoading(true);
    try {
      await databases.deleteDocument(APPWRITE_IDS.DATABASE_ID, APPWRITE_IDS.COLLECTION_SCHEDULE_ID, id);
      setShowModal(false);
      setShowToast({ show: true, message: 'Jadwal dihapus!', color: 'success' });
      fetchData();
    } catch (error) {
      setShowToast({ show: true, message: 'Gagal menghapus', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 w-full h-full">
      <IonLoading isOpen={loading} message="Sinkronisasi Data..." spinner="circles" />
      
      <div className="pb-24 space-y-10">
          
          {/* HEADER SECTION */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-2xl group border border-white/10">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className={`w-1.5 h-1.5 rounded-full ${errorState.isError ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`}></span>
                      {errorState.isError ? 'Connection Error' : 'Live Sync Active'}
                   </div>
                   <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                      Agenda <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Sosialisasi</span>
                   </h1>
                   <p className="text-slate-400 font-medium max-w-md text-sm md:text-base">Manajemen kunjungan sekolah dengan integrasi awan Appwrite.</p>
                </div>
                <div className="flex items-center gap-3">
                   <button onClick={fetchData} className="group w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90 shadow-2xl">
                      <IonIcon icon={refreshOutline} className="text-2xl group-hover:rotate-180 transition-transform duration-700" />
                   </button>
                </div>
             </div>
          </div>
          
          {/* ERROR ALERT UI */}
          {errorState.isError && (
             <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-4">
                <IonIcon icon={warningOutline} className="text-red-500 text-2xl mt-0.5" />
                <div className="space-y-1">
                   <h3 className="font-bold text-red-700">Gagal Mengambil Data</h3>
                   <p className="text-xs text-red-600 font-mono">{errorState.message}</p>
                   <p className="text-xs text-red-500 italic mt-2">Solusi: Cek koneksi internet atau minta Admin daftarkan Package ID Aplikasi di Appwrite Console.</p>
                   <IonButton size="small" color="danger" fill="outline" onClick={fetchData} className="mt-2 text-xs h-8">Coba Lagi</IonButton>
                </div>
             </div>
          )}

          {/* LAYOUT GRID */}
          <div className="flex flex-col gap-10">
             
             {/* TOP: CALENDAR SECTION */}
             <div className="space-y-6">
                <div className="bg-white p-4 md:p-10 rounded-3xl md:rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden transition-all hover:shadow-blue-100/40">
                   <div className="calendar-modern-wrapper">
                      <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        locale={idLocale}
                        firstDay={1}
                        headerToolbar={{
                          left: 'prev,next',
                          center: 'title',
                          right: 'today' 
                        }}
                        events={[
                          ...HOLIDAYS_2026,
                          ...events.map(e => ({
                             id: e.$id, 
                             title: e.title, 
                             start: e.start, 
                             backgroundColor: '#3b82f6', 
                             borderColor: 'transparent',
                             classNames: ['luxury-event-chip']
                          }))
                        ]}
                        dateClick={(arg) => { 
                           setFormData({ schoolName: '', date: arg.dateStr, rooms: 1 }); 
                           setSelectedEvent(null); 
                           setIsEditing(false); 
                           setShowModal(true); 
                        }}
                        eventClick={(info) => {
                           if (info.event.display === 'background') return;
                           const ev = events.find(e => e.$id === info.event.id);
                           if (ev) { 
                              setFormData({ schoolName: ev.title, date: ev.start, rooms: ev.rooms }); 
                              setSelectedEvent(ev); 
                              setIsEditing(true); 
                              setShowModal(true); 
                           }
                        }}
                        height="auto"
                        aspectRatio={1.5}
                      />
                   </div>
                </div>
             </div>

             {/* BOTTOM: DATA TABLE */}
             <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-3xl rounded-3xl md:rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px] md:min-w-[800px]">
                         <thead>
                            <tr className="bg-slate-50/80 text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                               <th className="px-6 py-5 md:px-10 md:py-7 text-center w-16 md:w-24">No</th>
                               <th className="px-4 py-5 md:px-8 md:py-7">Instansi Sekolah</th>
                               <th className="px-4 py-5 md:px-8 md:py-7 text-center">Tanggal</th>
                               <th className="px-4 py-5 md:px-8 md:py-7 text-center">Ruang</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {events.length > 0 ? events.sort((a,b) => b.start.localeCompare(a.start)).map((event, index) => (
                               <tr key={event.$id} 
                                   onClick={() => {
                                      setSelectedEvent(event);
                                      setFormData({ schoolName: event.title, date: event.start, rooms: event.rooms });
                                      setIsEditing(true);
                                      setShowModal(true);
                                   }}
                                   className="group hover:bg-blue-50/40 transition-all cursor-pointer"
                               >
                                  <td className="px-6 py-4 md:px-10 md:py-6 text-center">
                                     <span className="text-xs md:text-sm font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                     </span>
                                  </td>
                                  <td className="px-4 py-4 md:px-8 md:py-6">
                                     <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                           <IonIcon icon={schoolOutline} className="text-sm md:text-lg" />
                                        </div>
                                        <div className="font-extrabold text-slate-700 text-sm md:text-base tracking-tight uppercase group-hover:text-blue-700 transition-colors">
                                           {event.title}
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-4 py-4 md:px-8 md:py-6 text-center">
                                     <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-slate-600 text-[10px] md:text-xs font-bold border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
                                        {new Date(event.start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                     </div>
                                  </td>
                                  <td className="px-4 py-4 md:px-10 md:py-6 text-center">
                                     <span className="font-bold text-slate-600 text-xs">{event.rooms}</span>
                                  </td>
                               </tr>
                            )) : (
                               <tr>
                                  <td colSpan={4} className="px-6 py-20 text-center">
                                     {!errorState.isError && (
                                       <div className="flex flex-col items-center gap-4 opacity-40 group">
                                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-4xl text-slate-400">
                                             <IonIcon icon={flagOutline} />
                                          </div>
                                          <p className="text-sm font-bold text-slate-500">Belum ada data jadwal.</p>
                                       </div>
                                     )}
                                     {errorState.isError && (
                                       <div className="text-red-400 text-sm font-bold">Data tidak dapat ditampilkan karena error.</div>
                                     )}
                                  </td>
                               </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
      </div>

      {/* INPUT MODAL */}
      <IonModal 
        isOpen={showModal} 
        onDidDismiss={() => setShowModal(false)} 
        className="luxury-modal"
        initialBreakpoint={0.8}
        breakpoints={[0, 0.8, 1]}
      >
        <IonItem lines="none" className="ion-margin-top px-4">
             <div className="w-full flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800 uppercase">{isEditing ? 'Edit Jadwal' : 'Tambah Jadwal'}</h2>
                <IonButton fill="clear" onClick={() => setShowModal(false)} color="medium">
                    <IonIcon icon={closeOutline} />
                </IonButton>
             </div>
        </IonItem>
        
        <div className="p-6 space-y-4">
             {/* School Name */}
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nama Sekolah</label>
                <div className="bg-slate-50 rounded-2xl px-4 py-1 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 ring-blue-100 transition-all">
                   <IonInput 
                      placeholder="Contoh: SMA N 1 Indramayu" 
                      value={formData.schoolName}
                      onIonInput={(e) => setFormData({...formData, schoolName: e.detail.value!})}
                      className="font-bold text-slate-700"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tanggal</label>
                   <div className="bg-slate-50 rounded-2xl px-4 py-1 border border-slate-200">
                      <IonInput 
                         type="date"
                         value={formData.date}
                         onIonInput={(e) => setFormData({...formData, date: e.detail.value!})}
                         className="font-bold text-slate-700"
                      />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 uppercase ml-1">Jml Ruang</label>
                   <div className="bg-slate-50 rounded-2xl px-4 py-1 border border-slate-200">
                      <IonInput 
                         type="number"
                         value={formData.rooms}
                         onIonInput={(e) => setFormData({...formData, rooms: parseInt(e.detail.value!) || 1})}
                         className="font-bold text-slate-700 text-center"
                      />
                   </div>
                </div>
             </div>

             <div className="pt-6 space-y-3">
                <button onClick={saveEvent} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
                   <IonIcon icon={saveOutline} />
                   {isEditing ? 'SIMPAN PERUBAHAN' : 'SIMPAN JADWAL'}
                </button>
                {isEditing && (
                   <button onClick={() => deleteEvent(selectedEvent!.$id!)} className="w-full py-3 bg-red-50 text-red-500 rounded-2xl font-bold text-sm border border-red-100 active:bg-red-100 transition-colors">
                      HAPUS DATA
                   </button>
                )}
             </div>
        </div>
      </IonModal>

      <IonToast isOpen={showToast.show} onDidDismiss={() => setShowToast({ ...showToast, show: false })} message={showToast.message} duration={3000} position="top" color={showToast.color} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        
        .fc { font-family: 'Plus Jakarta Sans', sans-serif; --fc-border-color: #f1f5f9; --fc-button-bg-color: #3b82f6; --fc-button-border-color: #3b82f6; --fc-button-hover-bg-color: #2563eb; --fc-today-bg-color: #eff6ff; }
        .fc .fc-toolbar-title { font-size: 1rem; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -0.025em; }
        .fc .fc-button { border-radius: 10px; font-weight: 800; text-transform: capitalize; padding: 6px 12px !important; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2); font-size: 0.8rem; }
        .fc .fc-col-header-cell-cushion { font-weight: 800; color: #94a3b8; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 0.1em; padding: 10px 0 !important; }
        .fc .fc-daygrid-day-number { font-weight: 800; color: #64748b; font-size: 0.75rem; padding: 4px !important; }
        
        .luxury-event-chip { border: none !important; border-radius: 6px !important; padding: 2px 6px !important; font-size: 0.6rem !important; font-weight: 800 !important; }
        
        /* Modal Styling */
        .luxury-modal { --border-radius: 30px 30px 0 0; --background: #fff; }
        .fc-theme-standard .fc-scrollgrid { border: none !important; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #f1f5f9 !important; }
      `}</style>
    </div>
  );
};
