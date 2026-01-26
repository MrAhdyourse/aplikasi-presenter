import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lp3i.presenter',
  appName: 'LP3I Presenter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LiveUpdates: {
      appId: 'db608ddf',
      channel: 'production', // FIX: Huruf kecil sesuai instruksi
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;