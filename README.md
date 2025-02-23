# Flash Converter - YouTube Playlist Downloader

| ![Logo](https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/program/thunder.png) | Flash Converter is a powerful YouTube playlist downloader that allows you to download videos and audio in high quality using **yt-dlp** and **ffmpeg**. You can use it online or offline! |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

<img src="https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/program/thunder.png" alt="Logo" width="150" style="max-width: 100%; height: auto;">

## 🔥 Two Ways to Use Flash Converter

- **✅ Online Version**: [yt2down.netlify.app](https://yt2down.netlify.app) (No installation required!)
- **✅ Offline Version**: Install it on your **Windows (CMD)** or **Android (Termux)** for full control and customization.

---

## Features

- ✅ Download entire YouTube playlists or individual videos
- ✅ Choose format: **MP3 (audio)** or **MP4 (video)**
- ✅ Select quality options:
  - **MP3**: 128kbps, 192kbps, 320kbps
  - **MP4**: 720p, 1080p
- ✅ Show download progress with a progress bar
- ✅ Fully customizable output folder

---

## Installation & Setup (Offline Version)

### Windows (CMD)

1. **Install Dependencies**
   - Download **Node.js**: [Node.js Official Website](https://nodejs.org/)
   - Install **yt-dlp**:
     ```bash
     curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o C:\yt-dlp\yt-dlp.exe
     ```
   - Install **ffmpeg**:
     - Download from [FFmpeg Official Website](https://ffmpeg.org/)
     - Extract and place `ffmpeg.exe` inside `C:\ffmpeg\bin\`

2. **Clone This Repository & Install Node.js Packages**
   ```bash
   git clone -b program --single-branch https://github.com/DeJavi08/YTPlaylist-DW.git
   cd YTPlaylist-DW
   npm install
   ```
   
### 3. Configure `config.json`

Untuk menggunakan Flash Converter, Anda perlu mengatur file `config.json` dengan path yang benar untuk `yt-dlp` dan `ffmpeg`. Berikut panduannya:

#### Windows (CMD)
1. Buka file `config.json` di editor teks favorit Anda (misalnya, Notepad atau Visual Studio Code).
2. Atur path untuk `yt-dlp` dan `ffmpeg` sesuai dengan lokasi instalasi Anda. Contoh:
   ```json
   {
       "ytDlpPath": "C:\\yt-dlp\\yt-dlp.exe",
       "ffmpegPath": "C:\\ffmpeg\\bin\\ffmpeg.exe"
   }
   ```
3. Simpan file setelah melakukan perubahan.

#### Android (Termux)
1. Anda dapat menggunakan editor teks seperti **Nano** atau **Midnight Commander (MC)** untuk mengedit `config.json`.
   - **Menggunakan Nano**:
     ```bash
     apt install nano
     nano config.json
     ```
     Setelah selesai mengedit, tekan `CTRL + X`, lalu `Y`, dan `Enter` untuk menyimpan.
   - **Menggunakan Midnight Commander (MC)**:
     ```bash
     apt install mc
     mc
     ```
     Gunakan tombol panah untuk menavigasi, pilih `config.json`, dan tekan `F4` untuk mengedit. Setelah selesai, tekan `F2` untuk menyimpan dan `F10` untuk keluar.
2. Atur path untuk `yt-dlp` dan `ffmpeg` seperti berikut:
   ```json
   {
       "ytDlpPath": "/data/data/com.termux/files/usr/bin/yt-dlp",
       "ffmpegPath": "/data/data/com.termux/files/usr/bin/ffmpeg"
   }
   ```
3. Simpan file setelah melakukan perubahan.

---

### 4. Run the Program

Setelah mengatur `config.json`, Anda bisa menjalankan program dengan perintah berikut:

#### Windows (CMD)
```bash
npm start
```

#### Android (Termux)
```bash
npm start
```

---

## Usage

Berikut adalah langkah-langkah untuk menggunakan Flash Converter:

1. **Pilih "Start Converting Youtube Playlist"**  
   Jalankan program dan pilih opsi ini dari menu.

2. **Masukkan Path Folder Output**  
   Tentukan folder tempat file yang diunduh akan disimpan. Contoh:  
   - Windows: `C:\Downloads\`  
   - Android: `/sdcard/Download/`

3. **Masukkan URL Playlist YouTube**  
   Salin URL playlist YouTube yang ingin Anda unduh. Contoh:  
   `https://youtube.com/playlist?list=...`

4. **Pilih Format**  
   Pilih format yang diinginkan:  
   - **MP3** untuk audio  
   - **MP4** untuk video

5. **Pilih Kualitas**  
   Pilih kualitas yang tersedia:  
   - **MP3**: 128kbps, 192kbps, 320kbps  
   - **MP4**: 720p, 1080p

6. **Proses Unduhan Dimulai**  
   Unduhan akan dimulai, dan Anda akan melihat progress bar yang menunjukkan status unduhan.  

---

## About Developer

👨‍💻 **DeJavi08**  
🔗 **GitHub**: [https://github.com/DeJavi08](https://github.com/DeJavi08)  
📜 **Source Code**: [https://github.com/DeJavi08/YTPlaylist-DW](https://github.com/DeJavi08/YTPlaylist-DW)

---

## Support & Donate ❤️

Jika Anda merasa terbantu dengan proyek ini, Anda bisa mendukung saya melalui:  
💰 **Saweria**: [https://saweria.co/DeJavi08](https://saweria.co/DeJavi08)

---

🚀 **Selamat Menggunakan Flash Converter!** Jika Anda memiliki pertanyaan atau masalah, jangan ragu untuk menghubungi saya! 😊

---
