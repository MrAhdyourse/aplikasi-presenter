import React, { useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  useIonRouter,
  useIonToast
} from '@ionic/react';
import { 
  logOutOutline, 
  bookOutline, 
  videocamOutline, 
  personAddOutline,
  statsChartOutline 
} from 'ionicons/icons';
import { auth } from '../shared/config/firebase-config';
import { signOut } from 'firebase/auth';
import { client } from '../shared/config/appwrite-config'; // Import Appwrite Client

const DashboardPage: React.FC = () => {
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const user = auth.currentUser;

  // --- AUTO PING APPWRITE ---
  useEffect(() => {
    const checkAppwriteConnection = async () => {
      try {
        await client.ping();
        console.log("Appwrite Connection: STABLE (Singapore Node)");
        // Opsional: Tampilkan toast jika ingin feedback visual
        /*
        presentToast({
          message: 'Terhubung ke Server Appwrite (SGP)',
          duration: 1500,
          color: 'success',
          position: 'bottom'
        });
        */
      } catch (error) {
        console.error("Appwrite Connection: FAILED", error);
        presentToast({
          message: 'Gagal terhubung ke Database Appwrite!',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
      }
    };

    checkAppwriteConnection();
  }, [presentToast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login', 'back', 'replace');
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  const menuItems = [
    { title: 'Katalog Produk', icon: bookOutline, color: 'bg-blue-500', route: '/catalog' },
    { title: 'Video Presentasi', icon: videocamOutline, color: 'bg-purple-500', route: '/videos' },
    { title: 'Data Calon Siswa', icon: personAddOutline, color: 'bg-green-500', route: '/students/add' },
    { title: 'Statistik', icon: statsChartOutline, color: 'bg-orange-500', route: '/stats' },
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="px-4 py-2">
          <IonTitle className="font-bold text-xl">LP3I Presenter</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-light">
        <div className="max-w-6xl mx-auto mt-4">
          
          {/* Welcome Header */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-1">Selamat Datang, Presenter!</h2>
            <p className="opacity-80 text-sm">{user?.email || 'Admin LP3I'}</p>
            <div className="mt-2 text-xs bg-black/20 inline-block px-2 py-1 rounded">
              System: Online • DB: Appwrite (SGP)
            </div>
          </div>

          {/* Menu Grid */}
          <IonGrid className="p-0">
            <IonRow>
              {menuItems.map((item, index) => (
                <IonCol size="6" sizeMd="3" key={index}>
                  <IonCard 
                    className="m-2 rounded-2xl border-0 shadow-md hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => console.log("Navigate to", item.route)}
                  >
                    <IonCardContent className="flex flex-col items-center py-8">
                      <div className={`p-4 rounded-2xl ${item.color} text-white mb-4 shadow-lg`}>
                        <IonIcon icon={item.icon} className="text-3xl" />
                      </div>
                      <h3 className="text-center font-bold text-gray-700 text-sm leading-tight">
                        {item.title}
                      </h3>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {/* Footer Info */}
          <div className="mt-8 text-center text-gray-400 text-xs">
            <p>Pondasi Dashboard v1.1 - Hybrid Connectivity</p>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;