import { Client, Account, Databases } from "appwrite";

/**
 * Appwrite Client Configuration
 * Diperbarui oleh Admin Master Ahdi Aghni
 * Project: project-apkmarketing
 * Database ID: 6976f04b00347474aea2
 */

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6976ec19000745e88d06");

const account = new Account(client);
const databases = new Databases(client);

// Konfigurasi ID Database & Collection
export const APPWRITE_IDS = {
  DATABASE_ID: '6976f04b00347474aea2',     // ID Database Asli dari Admin Master
  COLLECTION_SISWA_ID: 'calon_siswa',     // Pastikan ini dibuat di Console
};

export { client, account, databases };
