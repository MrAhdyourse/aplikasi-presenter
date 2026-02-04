import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase Configuration
 * Diperbarui oleh Admin Master Ahdi Aghni
 */
const firebaseConfig = {
  apiKey: "AIzaSyB8Sm_Hr-mqUHmTGUxjI42vjUj7H7GFa6Q",
  authDomain: "aplikasi-presenterlp3i.firebaseapp.com",
  projectId: "aplikasi-presenterlp3i",
  storageBucket: "aplikasi-presenterlp3i.firebasestorage.app",
  messagingSenderId: "913685489991",
  appId: "1:913685489991:web:824cec6eeb8cb134db0462",
  measurementId: "G-4F2BHT3T1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services untuk digunakan di seluruh aplikasi
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;