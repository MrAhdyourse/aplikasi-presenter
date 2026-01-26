# PROJECT BLUEPRINT & CONFIGURATION LOG
**Project Name:** LP3I Indramayu Presenter App
**Last Updated:** Monday, January 26, 2026
**Status:** In Development (Foundation Phase)

---

## 1. TECHNOLOGY STACK (HYBRID ARCHITECTURE)
*   **Core:** Vite + React 19 + TypeScript (Zero Error Standard)
*   **Mobile Framework:** Ionic Framework 8 (Capacitor ready)
*   **Styling:** Tailwind CSS v4 (Utility) + Bootstrap 5 (Grid/Structure)
*   **Routing:** React Router DOM v5 (Ionic Standard)

## 2. INTEGRATION KEYS (CREDENTIALS)

### A. FIREBASE (Authentication)
*   **Purpose:** User Login & Security (Pos Satpam)
*   **Config File:** `src/shared/config/firebase-config.ts`
*   **Project ID:** `aplikasi-presenterlp3i`
*   **Auth Domain:** `aplikasi-presenterlp3i.firebaseapp.com`
*   **API Key:** `AIzaSyB8Sm_Hr-mqUHmTGUxjI42vjUj7H7GFa6Q` (Public Client Key)

### B. APPWRITE (Database & Backend)
*   **Purpose:** Data Storage (Lemari Arsip: Calon Siswa, Katalog)
*   **Config File:** `src/shared/config/appwrite-config.ts`
*   **Server Endpoint:** `https://sgp.cloud.appwrite.io/v1` (Singapore Node)
*   **Project ID:** `6976ec19000745e88d06`
*   **Database ID:** `6976f04b00347474aea2`
*   **Collection IDs:**
    *   `calon_siswa` (Data Prospek)

### C. IONIC APPFLOW (Live Updates)
*   **App ID:** `db608ddf`
*   **Channel:** `Production`
*   **Plugin:** `@capacitor/live-updates` (configured via `capacitor.config.ts`)

## 3. ARCHITECTURE OVERVIEW (TRIPLE FACE)
Aplikasi mendeteksi platform secara otomatis via `src/shared/platforms/platform-manager.ts`:
1.  **Desktop:** Split View (Brand Left + Content Right).
2.  **Mobile (Android/iOS):** Full Screen Immersive + Touch Gestures.
3.  **Logic:** `getPlatformFace()` mengembalikan `'desktop' | 'android' | 'ios'`.

## 4. FOLDER STRUCTURE (FEATURE-SLICED SIMPLE)
*   `/src/app`: Konfigurasi global.
*   `/src/features`: Logika bisnis (Marketing, Presenter).
*   `/src/pages`: Halaman utama (Login, Dashboard).
*   `/src/shared`: Komponen umum (Config, UI, Utils).

---
**NOTE TO ADMIN MASTER:**
File ini akan terus diperbarui otomatis oleh AI setiap kali ada perubahan konfigurasi vital.
