# Flash Converter - YouTube Playlist Downloader

| ![Logo](https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/program/thunder.png) | Flash Converter is a powerful YouTube playlist downloader that allows you to download videos and audio in high quality using **yt-dlp** and **ffmpeg**. You can use it online or offline! |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 🔥 Two Ways to Use Flash Converter
- **✅ Online Version**: [yt2down.netlify.app](https://yt2down.netlify.app) (No installation required!)
- **✅ Offline Version**: Install it on your **Windows (CMD)**, **Kali Linux**, or **Android (Termux)** for full control and customization.  
   **Source Code**: [https://github.com/DeJavi08/YTPlaylist-DW/tree/program](https://github.com/DeJavi08/YTPlaylist-DW/tree/program)

---

## Features
- ✅ **Download entire YouTube playlists or individual videos**
- ✅ **Choose format:** MP3 (audio) or MP4 (video)
- ✅ **Select quality options:**
  - **MP3**: 128kbps, 192kbps, 320kbps
  - **MP4**: 720p, 1080p
- ✅ **Show download progress with a progress bar**
- ✅ **Fully customizable output folder**

---

## Installation & Setup (Offline Version)

### Windows (CMD)

1. **Install Dependencies**
   ```sh
   curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o C:\yt-dlp\yt-dlp.exe
   ```
   - Install **ffmpeg** from [FFmpeg Official Website](https://ffmpeg.org/)
   - Extract and place `ffmpeg.exe` inside `C:\ffmpeg\bin\`

2. **Clone This Repository & Install Node.js Packages**
   ```sh
   git clone -b program --single-branch https://github.com/DeJavi08/YTPlaylist-DW.git
   cd YTPlaylist-DW
   npm install
   ```

3. **Configure `config.json`**
   ```json
   {
       "ytDlpPath": "C:\\yt-dlp\\yt-dlp.exe",
       "ffmpegPath": "C:\\ffmpeg\\bin\\ffmpeg.exe"
   }
   ```

4. **Run the Program**
   ```sh
   npm start
   ```

---

### Kali Linux

1. **Install Dependencies**
   ```sh
   sudo apt update && sudo apt upgrade -y
   sudo apt install nodejs npm python3 python3-pip ffmpeg -y
   ```

2. **Install yt-dlp** (Recommended method from [yt-dlp Wiki](https://github.com/yt-dlp/yt-dlp/wiki/Installation))
   ```sh
   sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
   sudo chmod a+rx /usr/local/bin/yt-dlp
   ```

3. **Clone This Repository**
   ```sh
   git clone -b program --single-branch https://github.com/DeJavi08/YTPlaylist-DW.git
   cd YTPlaylist-DW
   npm install
   ```

4. **Configure `config.json`**
   ```sh
   nano config.json
   ```
   Ubah isinya menjadi:
   ```json
   {
       "ytDlpPath": "/usr/local/bin/yt-dlp",
       "ffmpegPath": "/usr/bin/ffmpeg"
   }
   ```
   Simpan dengan **CTRL + X**, tekan **Y**, lalu Enter.

5. **Run the Program**
   ```sh
   npm start
   ```

---

### Android (Termux)

1. **Install Dependencies**
   ```sh
   pkg update && pkg upgrade
   pkg install nodejs python ffmpeg
   pip install yt-dlp
   ```

2. **Clone This Repository**
   ```sh
   git clone -b program --single-branch https://github.com/DeJavi08/YTPlaylist-DW.git
   cd YTPlaylist-DW
   npm install
   ```

3. **Configure `config.json`**
   ```sh
   nano config.json
   ```
   Ubah isinya menjadi:
   ```json
   {
       "ytDlpPath": "/data/data/com.termux/files/usr/bin/yt-dlp",
       "ffmpegPath": "/data/data/com.termux/files/usr/bin/ffmpeg"
   }
   ```
   Simpan dengan **CTRL + X**, tekan **Y**, lalu Enter.

4. **Run the Program**
   ```sh
   npm start
   ```

---

## Usage

Here are the steps to use Flash Converter:

1. **Select "Start Converting Youtube Playlist"**  
   Run the program and choose this option from the menu.

2. **Enter Output Folder Path**  
   Specify the folder where the downloaded files will be saved. Example:  
   - Windows: `C:\Downloads\`  
   - Android: `/sdcard/Download/`

3. **Enter YouTube Playlist URL**  
   Paste the URL of the YouTube playlist you want to download. Example:  
   `https://youtube.com/playlist?list=...`

4. **Choose Format**  
   Select the desired format:  
   - **MP3** for audio  
   - **MP4** for video

5. **Select Quality**  
   Choose the available quality:  
   - **MP3**: 128kbps, 192kbps, 320kbps  
   - **MP4**: 720p, 1080p

6. **Download Starts**  
   The download will begin, and you will see a progress bar showing the download status.  

---

## About Developer
👨‍💻 **DeJavi08**  
🔗 **GitHub**: [https://github.com/DeJavi08](https://github.com/DeJavi08)  
📜 **Source Code**: [https://github.com/DeJavi08/YTPlaylist-DW](https://github.com/DeJavi08/YTPlaylist-DW)  

## Support & Donate ❤️
💰 **Saweria**: [https://saweria.co/DeJavi08](https://saweria.co/DeJavi08)

---

## 🔍 SEO Keywords
**YouTube playlist downloader**, **MP3 downloader**, **MP4 downloader**, **yt-dlp alternative**, **best YouTube video downloader**, **download YouTube playlist GitHub**, **convert YouTube to MP3**, **download YouTube videos without ads**, **open-source YouTube downloader**, **best YouTube to MP3 converter 2024**

🚀 **Enjoy Flash Converter!** If you have any issues, feel free to contact me! 😊

