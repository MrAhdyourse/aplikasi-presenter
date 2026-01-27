import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lp3i.presenter',
  appName: 'LP3I Presenter',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  plugins: {
    LiveUpdates: {
      appId: 'db608ddf',
      channel: 'production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;