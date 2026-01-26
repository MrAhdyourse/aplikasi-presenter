import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonIcon, 
  IonSpinner,
  useIonToast,
  useIonRouter
} from '@ionic/react';
import { logInOutline, personOutline, lockClosedOutline, eyeOutline, eyeOffOutline, checkmarkCircle } from 'ionicons/icons';
import { getPlatformFace } from '../shared/platforms/platform-manager';

// Firebase Integrasi
import { auth } from '../shared/config/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import Gambar
import slide1 from '../assets/images/bg-login/slide1.jpg';
import slide2 from '../assets/images/bg-login/slide2.jpg';
import slide3 from '../assets/images/bg-login/slide3.jpg';
import slide4 from '../assets/images/bg-login/slide4.jpg';
import slide5 from '../assets/images/bg-login/slide5.jpg';
import slide6 from '../assets/images/bg-login/slide6.jpg';
import slide7 from '../assets/images/bg-login/slide7.jpg';

const BACKGROUND_IMAGES = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessUI, setShowSuccessUI] = useState(false); // State baru untuk Feedback Mewah
  const [currentSlide, setCurrentSlide] = useState(0);

  const [presentToast] = useIonToast();
  const router = useIonRouter();
  const platform = getPlatformFace();

  // LOGIKA TRANSISI: Diperlambat jadi 3 detik (duration-3000) dan interval 8 detik
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 8000); 

    return () => clearInterval(slideInterval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      presentToast({ message: 'Mohon isi Email & Password', duration: 2000, color: 'warning', position: 'top' });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setShowSuccessUI(true); // Aktifkan Feedback Mewah
      
      // Delay sejenak agar user bisa melihat feedback sukses yang premium
      setTimeout(() => {
        router.push('/dashboard', 'forward', 'replace');
      }, 2000);

    } catch (error: any) {
      console.error("DEBUG_LOGIN_ERROR:", error);
      let errorMessage = 'Akses Ditolak: Cek Email/Password Anda.';
      
      // Memberikan informasi lebih detail jika ada masalah koneksi atau konfigurasi
      if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Koneksi Gagal: Periksa internet atau server Firebase.';
      } else if (error.code === 'auth/internal-error') {
        errorMessage = 'Firebase Internal Error. Cek konfigurasi API.';
      }

      presentToast({ 
        message: `${errorMessage} (${error.code})`, 
        duration: 5000, 
        color: 'danger', 
        position: 'top' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="relative overflow-hidden bg-black">
        
        {/* --- BACKGROUND LAYER (SMOOTH CROSS-FADE) --- */}
        <div className="absolute inset-0 z-0">
          {BACKGROUND_IMAGES.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out will-change-opacity ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Image Scale Animation */}
              <img 
                src={img} 
                className="w-full h-full object-cover animate-ken-burns"
                alt="Background"
                style={{ filter: 'brightness(0.6)' }} // Gelapkan gambar asli agar teks pop-up
              />
            </div>
          ))}
          {/* Overlay Gradient Permanen (Menjaga konsistensi kontras) */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none"></div>
        </div>

        {/* --- CONTENT LAYER --- */}
        <div className={`relative z-30 flex h-full w-full items-center justify-center p-6 lg:p-12 ${platform === 'desktop' ? 'gap-16' : ''}`}>
          
          {/* --- LEFT SIDE: BRANDING (DESKTOP) --- */}
          {platform === 'desktop' && (
            <div className="hidden md:flex flex-col items-start w-1/2 animate-fade-in-left">
              <div className="mb-6 inline-block bg-yellow-400/20 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-400/30">
                <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase">Official Internal App</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                LP3I <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  COLLEGE
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 font-light max-w-lg leading-relaxed">
                Ekosistem Digital Pemasaran: Solusi Cerdas untuk Kebutuhan Presentasi, Manajemen, dan Produktivitas Marketing Presenter.
              </p>
              
              {/* Slide Indicators */}
              <div className="flex gap-3 mt-12">
                {BACKGROUND_IMAGES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentSlide ? 'w-12 bg-yellow-400' : 'w-2 bg-gray-600'}`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* --- RIGHT SIDE: LOGIN FORM (ADAPTIVE CARD) --- */}
          <div className={`w-full ${platform === 'desktop' ? 'max-w-md' : 'max-w-lg'} animate-fade-in-up`}>
            
            {/* Card Container: Adaptive Glass */}
            <div className="
              relative overflow-hidden
              bg-black/30 backdrop-blur-2xl 
              border border-white/10 
              shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              rounded-[30px] 
              p-8 md:p-10
            ">
              
              {/* Header Mobile */}
              {platform !== 'desktop' && (
                <div className="text-center mb-8">
                  <div className="inline-block w-16 h-1 bg-yellow-500 rounded-full mb-4"></div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Login Akses</h2>
                  <p className="text-gray-400 text-sm mt-1">Silakan masuk dengan akun presenter.</p>
                </div>
              )}

              {platform === 'desktop' && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white">Selamat Datang</h3>
                  <p className="text-gray-400 text-sm">Silakan login untuk melanjutkan.</p>
                </div>
              )}

              {/* Form Input */}
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                
                {/* Email Input: Smart Focus */}
                <div className="group relative">
                  <div className="
                    flex items-center 
                    bg-white/5 
                    border border-white/10 
                    rounded-2xl px-4 py-4
                    transition-all duration-300
                    group-focus-within:bg-black/60 
                    group-focus-within:border-yellow-400/60
                    group-focus-within:shadow-[0_0_20px_rgba(250,204,21,0.1)]
                  ">
                    <IonIcon 
                      icon={personOutline} 
                      className="text-gray-400 text-xl mr-4 transition-colors group-focus-within:text-yellow-400" 
                    />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 group-focus-within:text-yellow-500 transition-colors">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        id="email"
                        autoComplete="username"
                        required
                        className="w-full bg-transparent text-white font-medium outline-none placeholder-gray-600 text-base"
                        placeholder="contoh@lp3i.ac.id"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input: Smart Focus */}
                <div className="group relative">
                  <div className="
                    flex items-center 
                    bg-white/5 
                    border border-white/10 
                    rounded-2xl px-4 py-4
                    transition-all duration-300
                    group-focus-within:bg-black/60 
                    group-focus-within:border-yellow-400/60
                    group-focus-within:shadow-[0_0_20px_rgba(250,204,21,0.1)]
                  ">
                    <IonIcon 
                      icon={lockClosedOutline} 
                      className="text-gray-400 text-xl mr-4 transition-colors group-focus-within:text-yellow-400" 
                    />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-gray-500 mb-0.5 group-focus-within:text-yellow-500 transition-colors">
                        Password
                      </label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required 
                        className="w-full bg-transparent text-white font-medium outline-none placeholder-gray-600 text-base"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-white transition-colors"
                    >
                      <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="
                    mt-4 w-full 
                    bg-gradient-to-r from-yellow-400 to-yellow-600 
                    text-black font-extrabold text-lg
                    py-4 rounded-2xl 
                    shadow-lg shadow-yellow-500/20
                    transform transition-all duration-300
                    hover:scale-[1.02] active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex justify-center items-center
                  "
                >
                  {loading ? (
                    <IonSpinner name="dots" color="dark" />
                  ) : (
                    <>
                      MASUK SEKARANG <IonIcon icon={logInOutline} className="ml-2" />
                    </>
                  )}
                </button>

              </form>
              
              {/* Footer */}
              <div className="mt-8 text-center border-t border-white/5 pt-6">
                <p className="text-gray-500 text-xs">
                  Protected by LP3I Security System &copy; 2026
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* --- LUXURY SUCCESS FEEDBACK OVERLAY --- */}
        {showSuccessUI && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
            {/* Dark Blurred Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl"></div>
            
            {/* Success Card */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-[40px] shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full text-center scale-up-center animate-in zoom-in-95 duration-300">
               
               {/* Glowing Icon Container */}
               <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <IonIcon 
                    icon={checkmarkCircle} 
                    className="text-8xl text-green-400 relative z-10 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" 
                  />
               </div>

               <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tight">Login Sukses</h2>
                  <p className="text-gray-300 text-sm font-medium opacity-80 leading-relaxed px-4">
                    Selamat datang kembali!<br/>Mempersiapkan Dashboard Anda...
                  </p>
               </div>

               {/* Micro Loader */}
               <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden max-w-[120px]">
                  <div className="bg-green-400 h-full w-full origin-left animate-[shimmer_1.5s_infinite]"></div>
               </div>
            </div>
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
