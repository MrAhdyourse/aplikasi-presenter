import { isPlatform } from '@ionic/react';

/**
 * Platform Manager: Logika untuk mengamankan "Triple Face" 
 * 1. Desktop 
 * 2. Android
 * 3. iOS
 */

export const getPlatformFace = () => {
  if (isPlatform('ios')) {
    return 'ios';
  }
  if (isPlatform('android')) {
    return 'android';
  }
  return 'desktop';
};

export const isDesktop = () => !isPlatform('capacitor') && !isPlatform('mobile');
export const isMobile = () => isPlatform('mobile');
export const isIos = () => isPlatform('ios');
export const isAndroid = () => isPlatform('android');

/**
 * Hook atau Helper untuk mendapatkan class wrapper berdasarkan platform
 */
export const getPlatformClass = () => {
  const face = getPlatformFace();
  return `platform-${face}`;
};
