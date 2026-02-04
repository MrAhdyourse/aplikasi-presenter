import { Client, Account, Databases, Storage } from "appwrite";

/**
 * Appwrite Client Configuration (SGP Region)
 * -------------------------------------------
 * Status: PRODUCTION / HYBRID READY
 * Updated: 27 Jan 2026
 * Region: Singapore (sgp)
 * 
 * NOTE FOR ANDROID/IOS:
 * Ensure 'localhost' is added as a WEB PLATFORM in Appwrite Console.
 * Capacitor serves the app from https://localhost (Android) or capacitor://localhost (iOS).
 */

// 1. Core Configuration
const APPWRITE_CONFIG = {
    ENDPOINT: "https://sgp.cloud.appwrite.io/v1",
    PROJECT_ID: "6976ec19000745e88d06",
    DATABASE_ID: "6976f04b00347474aea2",
    COLLECTION_SCHEDULE_ID: "jadwalsosialisasi",
    // Collection lain bisa ditambahkan di sini
    COLLECTION_SISWA_ID: "calon_siswa", 
    // Gallery System
    BUCKET_ID: "6982c6110039dae90f60", 
    COLLECTION_FOLDERS_ID: "gallery_folders",
    // Applicants System
    COLLECTION_APPLICANTS_ID: "wdwd", // Collection ID dari Pak Ahdi
};

// 2. Initialize Client
const client = new Client()
    .setEndpoint(APPWRITE_CONFIG.ENDPOINT)
    .setProject(APPWRITE_CONFIG.PROJECT_ID);

// 3. Service Initialization
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// 4. Export Configuration & Services
export const APPWRITE_IDS = {
  DATABASE_ID: APPWRITE_CONFIG.DATABASE_ID,
  COLLECTION_SCHEDULE_ID: APPWRITE_CONFIG.COLLECTION_SCHEDULE_ID,
  COLLECTION_SISWA_ID: APPWRITE_CONFIG.COLLECTION_SISWA_ID,
  BUCKET_ID: APPWRITE_CONFIG.BUCKET_ID,
  COLLECTION_FOLDERS_ID: APPWRITE_CONFIG.COLLECTION_FOLDERS_ID,
  COLLECTION_APPLICANTS_ID: APPWRITE_CONFIG.COLLECTION_APPLICANTS_ID,
};

export { client, account, databases, storage };