# Skrip Download Aset Gambar CDN ke Lokal
Write-Host "Memulai Download Aset..." -ForegroundColor Cyan

# 1. Catalog Bisnis
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1454165833767-027eece15931?auto=format&fit=crop&q=80&w=400" -OutFile "src/assets/images/cdn/catalog-bisnis.jpg"

# 2. Catalog IT
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400" -OutFile "src/assets/images/cdn/catalog-it.jpg"

# 3. Catalog Akuntansi
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" -OutFile "src/assets/images/cdn/catalog-akuntansi.jpg"

# 4. Noise Pattern (Jaga-jaga jika belum ada)
Invoke-WebRequest -Uri "https://grainy-gradients.vercel.app/noise.svg" -OutFile "src/assets/images/cdn/noise.svg"

Write-Host "Download Selesai! Semua aset telah tersedia di src/assets/images/cdn/" -ForegroundColor Green