@echo off
color 0A
title LP3I PRESENTER - AUTO UPDATE SYSTEM
cls
echo ========================================================
echo  SYSTEM UPDATE MANAGER (ADMIN MASTER AHDI)
echo  Target Repo: https://github.com/MrAhdyourse/aplikasi-presenter
echo ========================================================
echo.
echo [STATUS PERUBAHAN FILE]
git status --short
echo.
echo ========================================================
echo.
set /p comment="[INPUT] Tuliskan info update singkat (contoh: update login): "

if "%comment%"=="" goto error

echo.
echo [1/3] Menambahkan file ke antrian (Staging)...
git add .

echo.
echo [2/3] Menyimpan checkpoint (Commit)...
git commit -m "%comment%"

echo.
echo [3/3] Mengirim ke GitHub (Pushing)...
git push origin main

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Gagal mengirim ke GitHub! Cek koneksi internet anda.
    pause
    exit /b
)

color 0B
echo.
echo ========================================================
echo  JOSS! UPDATE BERHASIL TERKIRIM KE GITHUB.
echo ========================================================
pause
exit

:error
color 0C
echo.
echo [ERROR] Pesan update tidak boleh kosong!
pause
goto start
