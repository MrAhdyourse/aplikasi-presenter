# PANDUAN PERBAIKAN: KONTEN TIDAK MUNCUL DI APLIKASI ANDROID

Jika data (Jadwal, Katalog, dll) muncul di Browser Laptop/HP tapi **TIDAK MUNCUL** di Aplikasi Android (.apk), ikuti langkah ini. Masalah utamanya adalah **Keamanan Appwrite** memblokir aplikasi Anda.

## LANGKAH 1: Daftarkan Platform Android (WAJIB)

Appwrite menolak koneksi dari aplikasi Android jika Package Name belum didaftarkan.

1.  Buka **Appwrite Console** (https://cloud.appwrite.io).
2.  Pilih Project **LP3I Presenter**.
3.  Di halaman **Overview**, scroll ke bawah ke bagian **Platforms**.
4.  Klik tombol **+ Add Platform** -> Pilih **Android App**.
5.  Isi form:
    *   **Name:** `LP3I Presenter Android`
    *   **Package Name:** `com.lp3i.presenter`  *(Harus persis ini!)*
6.  Klik **Next** / **Create**.

## LANGKAH 2: Daftarkan Localhost Web (PENTING UNTUK CAPACITOR)

Capacitor seringkali dianggap sebagai Web yang berjalan di `localhost`.

1.  Di bagian **Platforms** yang sama.
2.  Klik **+ Add Platform** -> Pilih **Web App**.
3.  Isi form:
    *   **Name:** `Localhost Capacitor`
    *   **Hostname:** `localhost`  *(Tanpa http/https)*
4.  Klik **Next** / **Create**.

## LANGKAH 3: Build Ulang Aplikasi

Setelah mengubah konfigurasi di atas dan kode di laptop, Anda harus membuild ulang aplikasi Android.

1.  Buka Terminal/CMD di folder proyek.
2.  Jalankan perintah berikut secara berurutan:

```cmd
npm run build
npx cap sync android
```

3.  Buka Android Studio (`npx cap open android`) dan jalankan ulang aplikasi ke HP/Emulator.

---

## DIAGNOSA TAMBAHAN

Jika masih gagal, lihat indikator di halaman **Jadwal Sosialisasi**:

*   **Lampu Hijau (Live Sync Active):** Koneksi berhasil.
*   **Lampu Merah (Connection Error):** Koneksi gagal. Baca pesan error di kotak merah yang muncul.
    *   Jika error `Network Error`: Masalah internet atau SSL.
    *   Jika error `AppwriteException: User (role: guests) missing scope`: Masalah permission database (Permissions > Any/Guest harus Read).

---
*Dibuat otomatis oleh Gemini CLI Assistant - 28 Jan 2026*