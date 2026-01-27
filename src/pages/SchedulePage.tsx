import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import idLocale from '@fullcalendar/core/locales/id'; // Bahasa Indonesia
import { 
  IonPage, 
  IonModal, 
  IonContent, 
  IonItem, 
  IonInput, 
  IonIcon,
  IonToast,
  IonLoading,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { 
  schoolOutline, 
  saveOutline, 
  refreshOutline,
  calendarOutline,
  layersOutline,
  trashOutline,
  sparklesOutline,
  closeOutline,
  chevronForwardOutline,
  flagOutline
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

export const SchedulePage: React.FC = () => { // Added IonPage
  const [events, setEvents] = useState<SosialisasiEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SosialisasiEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', color: 'success' });

  const [formData, setFormData] = useState({ schoolName: '', date: '', rooms: 1 });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        APPWRITE_IDS.DATABASE_ID,
        APPWRITE_IDS.COLLECTION_SCHEDULE_ID,
        [Query.orderAsc('start')]
      );
      setEvents(response.documents.map((doc: any) => ({
        $id: doc.$id, title: doc.title, start: doc.start, rooms: doc.rooms
      })));
    } catch (error: any) {
      console.error("[FETCH ERROR DETAILS]", {
        message: error.message,
        code: error.code,
        response: error.response
      });
      setShowToast({ show: true, message: 'Gagal sinkronisasi awan. Cek koneksi SGP.', color: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const saveEvent = async () => {
    if (!formData.schoolName || !formData.date) {
      setShowToast({ show: true, message: 'Data belum lengkap, Bos!', color: 'warning' });
      return;
    }

    setLoading(true);
    try {
      // FORMAT DATA: Konversi ke ISOString untuk atribut Datetime Appwrite
      const isoDate = new Date(formData.date).toISOString();
      
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
      console.error("[SAVE ERROR DETAILS]", {
        message: error.message,
        code: error.code,
        type: error.type,
        response: error.response
      });
      
      let friendlyMessage = error.message || 'Cek atribut database';
      
      if (friendlyMessage.includes('Failed to fetch') || friendlyMessage.includes('Network Error')) {
        friendlyMessage = '⚠️ KONEKSI DIBLOKIR: Buka Appwrite Console > Settings > Platforms > Tambahkan "localhost" & IP Anda sebagai Web App.';
      }

      setShowToast({ 
        show: true, 
        message: friendlyMessage, 
        color: 'danger' 
      });
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
    <IonPage>
      <IonLoading isOpen={loading} message="Memproses Data..." spinner="circles" />
      
      <IonContent className="bg-[#f8fafc]" style={{ '--background': '#f8fafc' }}>
        <IonRefresher slot="fixed" onIonRefresh={(e) => { fetchData(); e.detail.complete(); }}>
          <IonRefresherContent refreshingSpinner="dots" />
        </IonRefresher>

        <div className="min-h-screen pb-24 p-4 md:p-8 space-y-10">
          
          {/* HEADER SECTION - LUXURY DESIGN */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155] p-10 rounded-[3rem] shadow-2xl group border border-white/10">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></span>
                      Realtime Database
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                      Agenda <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Sosialisasi</span>
                   </h1>
                   <p className="text-slate-400 font-medium max-w-md">Manajemen kunjungan sekolah dengan integrasi awan Appwrite dan Kalender Indonesia 2026.</p>
                </div>
                <div className="flex items-center gap-3">
                   <button onClick={fetchData} className="group w-16 h-16 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90 shadow-2xl">
                      <IonIcon icon={refreshOutline} className="text-3xl group-hover:rotate-180 transition-transform duration-700" />
                   </button>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             
             {/* LEFT: CALENDAR (8 COLS) */}
             <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
                      <IonIcon icon={calendarOutline} className="text-blue-600" />
                      KALENDER KEGIATAN
                   </h3>
                   <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> EVENT</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-400 rounded-full"></span> LIBUR</div>
                   </div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-2xl p-6 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden transition-all hover:shadow-blue-100/50">
                   <div className="calendar-modern-wrapper">
                      <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        locale={idLocale} // Force Indonesia
                        firstDay={1} // Start Monday
                        headerToolbar={{
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,listWeek' 
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
                           if (info.event.display === 'background') return; // Ignore holidays
                           const ev = events.find(e => e.$id === info.event.id);
                           if (ev) { 
                              setFormData({ schoolName: ev.title, date: ev.start, rooms: ev.rooms }); 
                              setSelectedEvent(ev); 
                              setIsEditing(true); 
                              setShowModal(true); 
                           }
                        }}
                        height="auto"
                        aspectRatio={1.2}
                      />
                   </div>
                </div>
             </div>

             {/* RIGHT: TABLE (4 COLS) - RESPONSIVE DATA TABLE */}
             <div className="lg:col-span-4 space-y-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight px-2">
                   <IonIcon icon={layersOutline} className="text-indigo-600" />
                   TABEL DATA KUNJUNGAN
                </h3>
                
                <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-white overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                               <th className="px-6 py-5 text-center">No</th>
                               <th className="px-4 py-5">Instansi Sekolah</th>
                               <th className="px-4 py-5">Info</th>
                               <th className="px-6 py-5 text-center">R</th>
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
                                   className="group hover:bg-blue-50/50 transition-colors cursor-pointer"
                               >
                                  <td className="px-6 py-5 text-center">
                                     <span className="text-xs font-black text-slate-300 group-hover:text-blue-400 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                                  </td>
                                  <td className="px-4 py-5">
                                     <div className="font-bold text-slate-700 text-sm line-clamp-1 group-hover:text-blue-700 transition-colors uppercase">{event.title}</div>
                                     <div className="text-[10px] font-medium text-slate-400 mt-0.5 tracking-tight flex items-center gap-1">
                                        <IonIcon icon={calendarOutline} className="text-[10px]" />
                                        {new Date(event.start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                     </div>
                                  </td>
                                  <td className="px-4 py-5">
                                     <div className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-600 rounded-md text-[9px] font-black uppercase tracking-tighter">
                                        Confirmed
                                     </div>
                                  </td>
                                  <td className="px-6 py-5 text-center">
                                     <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        {event.rooms}
                                     </div>
                                  </td>
                               </tr>
                            )) : (
                               <tr>
                                  <td colSpan={4} className="px-6 py-20 text-center">
                                     <div className="flex flex-col items-center gap-2 opacity-20 scale-90">
                                        <IonIcon icon={flagOutline} className="text-6xl" />
                                        <p className="text-xs font-black italic uppercase">Kosong melompong</p>
                                     </div>
                                  </td>
                               </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* SUMMARY CARD */}
                <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
                   <div className="flex items-center justify-between mb-4">
                      <IonIcon icon={sparklesOutline} className="text-2xl text-blue-200" />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-70">Total Agenda</span>
                   </div>
                   <div className="text-5xl font-black mb-2 tracking-tighter">{events.length}</div>
                   <div className="text-xs font-bold text-blue-100 flex items-center gap-2">
                      <IonIcon icon={chevronForwardOutline} />
                      Sudah terjadwal di Appwrite
                   </div>
                </div>
             </div>

          </div>
        </div>
      </IonContent>

      {/* 3. INPUT MODAL - THE LUXURY WHITE FORM */}
      <IonModal 
        isOpen={showModal} 
        onDidDismiss={() => setShowModal(false)} 
        className="luxury-modal"
        initialBreakpoint={0.8}
        breakpoints={[0, 0.8, 1]}
        handle={true}
      >
        <IonContent 
          className="ion-padding relative overflow-hidden"
          style={{ '--background': '#ffffff', '--color': '#1e293b' }}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 max-w-md mx-auto pt-2 pb-8 px-2">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 ${isEditing ? 'bg-gradient-to-br from-orange-400 to-pink-500' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
                    <IonIcon icon={isEditing ? saveOutline : sparklesOutline} className="text-3xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 tracking-tighter uppercase leading-none">
                      {isEditing ? 'Update' : 'Baru'}
                    </h2>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mt-1 opacity-80">
                      Agenda Sosialisasi
                    </p>
                  </div>
               </div>
               <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-90">
                 <IonIcon icon={closeOutline} className="text-xl" />
               </button>
            </div>

            {/* FORM INPUTS */}
            <div className="space-y-6">
               {/* School Name */}
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Instansi Sekolah</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10">
                      <IonIcon icon={schoolOutline} className="text-xl" />
                    </div>
                    <IonItem lines="none" className="luxury-input-container" style={{ '--background': '#f8fafc', '--color': '#334155' }}>
                      <IonInput 
                        value={formData.schoolName} 
                        onIonInput={(e) => setFormData({...formData, schoolName: e.detail.value || ''})} 
                        placeholder="Ketik nama sekolah..." 
                        className="font-bold text-slate-700 custom-input-padding"
                        style={{ '--color': '#334155', '--placeholder-color': '#94a3b8' }}
                      />
                    </IonItem>
                  </div>
               </div>

               <div className="grid grid-cols-5 gap-4">
                  {/* Date Picker */}
                  <div className="col-span-3 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Tanggal</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10">
                        <IonIcon icon={calendarOutline} className="text-xl" />
                      </div>
                      <IonItem lines="none" className="luxury-input-container" style={{ '--background': '#f8fafc', '--color': '#334155' }}>
                         <IonInput 
                           type="date" 
                           value={formData.date} 
                           onIonInput={(e) => setFormData({...formData, date: e.detail.value || ''})} 
                           className="font-bold text-slate-700 custom-input-padding" 
                           style={{ '--color': '#334155' }}
                         />
                      </IonItem>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Ruang</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10">
                         <IonIcon icon={layersOutline} className="text-xl" />
                      </div>
                      <IonItem lines="none" className="luxury-input-container" style={{ '--background': '#f8fafc', '--color': '#334155' }}>
                         <IonInput 
                           type="number" 
                           value={formData.rooms} 
                           onIonInput={(e) => setFormData({...formData, rooms: parseInt(e.detail.value || '1') || 1})} 
                           className="font-bold text-slate-700 text-center custom-input-padding" 
                           style={{ '--color': '#334155' }}
                         />
                      </IonItem>
                    </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="pt-8 space-y-3">
                  <button 
                    onClick={saveEvent} 
                    className={`w-full h-14 rounded-2xl font-black text-lg text-white shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${isEditing ? 'bg-gradient-to-r from-slate-800 to-slate-700 shadow-slate-300' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-300'}`}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>
                    <IonIcon icon={saveOutline} className="relative z-10" /> 
                    <span className="relative z-10">{isEditing ? 'SIMPAN PERUBAHAN' : 'PASANG JADWAL'}</span>
                  </button>
                  
                  {isEditing && (
                    <button onClick={() => deleteEvent(selectedEvent!.$id!)} className="w-full h-12 rounded-2xl bg-red-50 text-red-500 border border-red-100 font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                      <IonIcon icon={trashOutline} /> HAPUS AGENDA
                    </button>
                  )}
               </div>
            </div>
          </div>
        </IonContent>
      </IonModal>

      <IonToast isOpen={showToast.show} onDidDismiss={() => setShowToast({ ...showToast, show: false })} message={showToast.message} duration={2500} position="top" color={showToast.color} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        
        .fc { font-family: 'Plus Jakarta Sans', sans-serif; --fc-border-color: #f1f5f9; --fc-button-bg-color: #3b82f6; --fc-button-border-color: #3b82f6; --fc-button-hover-bg-color: #2563eb; --fc-today-bg-color: #eff6ff; }
        .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: -0.025em; }
        .fc .fc-button { border-radius: 14px; font-weight: 800; text-transform: capitalize; padding: 10px 18px !important; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2); }
        .fc .fc-col-header-cell-cushion { font-weight: 800; color: #94a3b8; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; padding: 15px 0 !important; }
        .fc .fc-daygrid-day-number { font-weight: 800; color: #64748b; font-size: 0.85rem; padding: 8px !important; }
        .fc .fc-day-sun .fc-col-header-cell-cushion, .fc .fc-day-sun .fc-daygrid-day-number { color: #ef4444; }
        
        .luxury-event-chip { border: none !important; border-radius: 8px !important; padding: 4px 8px !important; font-size: 0.7rem !important; font-weight: 800 !important; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3) !important; text-transform: uppercase; }
        
        /* Modal Styling */
        .luxury-modal { --border-radius: 40px 40px 0 0; --background: #fff; }
        .luxury-input-container { --background: #f8fafc; --padding-start: 0; --padding-end: 0; --inner-padding-end: 0; --border-radius: 16px; border: 1px solid #e2e8f0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .luxury-input-container.item-has-focus { border-color: #3b82f6; --background: #fff; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); transform: translateY(-1px); }
        .custom-input-padding { --padding-start: 45px !important; --padding-top: 15px; --padding-bottom: 15px; }

        /* Hide Calendar Borders for clean look */
        .fc-theme-standard .fc-scrollgrid { border: none !important; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid #f1f5f9 !important; }
      `}</style>
    </IonPage>
  );
};