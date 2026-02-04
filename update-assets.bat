@echo off
echo ==========================================
echo      MENGUPDATE ASET GAMBAR (OFFLINE)
echo ==========================================
echo.

REM Folder Tujuan
set DEST_DIR=src\assets\images\cdn

REM Pastikan folder ada
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

echo [1/4] Mendownload Catalog Bisnis...
curl -L "https://images.unsplash.com/photo-1454165833767-027eece15931?auto=format&fit=crop&q=80&w=400" -o "%DEST_DIR%\catalog-bisnis.jpg"

echo [2/4] Mendownload Catalog IT...
curl -L "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400" -o "%DEST_DIR%\catalog-it.jpg"

echo [3/4] Mendownload Catalog Akuntansi...
curl -L "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" -o "%DEST_DIR%\catalog-akuntansi.jpg"

echo [4/4] Mendownload Noise Pattern...
curl -L "https://grainy-gradients.vercel.app/noise.svg" -o "%DEST_DIR%\noise.svg"

echo.
echo ==========================================
echo      UPDATE ASET SELESAI!
echo ==========================================
pause
