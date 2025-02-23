# Flash Converter - YouTube Playlist Downloader

| ![Logo](https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/program/thunder.png) | Flash Converter is a powerful YouTube playlist downloader that allows you to download videos and audio in high quality using **yt-dlp** and **ffmpeg**. You can use it online or offline! |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 🔥 Two Ways to Use Flash Converter

- **✅ Online Version**: [yt2down.netlify.app](https://yt2down.netlify.app) (No installation required!)
- **✅ Offline Version**: Install it on your **Windows (CMD)** or **Android (Termux)** for full control and customization.  
   **Source Code**: [https://github.com/DeJavi08/YTPlaylist-DW/tree/program](https://github.com/DeJavi08/YTPlaylist-DW/tree/program)

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

3. **Configure `config.json`**

   To use Flash Converter, you need to configure the `config.json` file with the correct paths for `yt-dlp` and `ffmpeg`. Here's how:

   - Open the `config.json` file in your favorite text editor (e.g., Notepad or Visual Studio Code).
   - Set the paths for `yt-dlp` and `ffmpeg` according to your installation locations. Example:
     ```json
     {
         "ytDlpPath": "C:\\yt-dlp\\yt-dlp.exe",
         "ffmpegPath": "C:\\ffmpeg\\bin\\ffmpeg.exe"
     }
     ```
   - Save the file after making changes.

4. **Run the Program**
   ```bash
   npm start
   ```

---

### Android (Termux)

1. **Install Dependencies**
   ```bash
   pkg update && pkg upgrade
   pkg install nodejs python ffmpeg
   pip install yt-dlp
   ```

2. **Clone This Repository**
   ```bash
   git clone -b program --single-branch https://github.com/DeJavi08/YTPlaylist-DW.git
   cd YTPlaylist-DW
   npm install
   ```

3. **Configure `config.json` (for Termux)**
   - You can use text editors like **Nano** or **Midnight Commander (MC)** to edit `config.json`.
     - **Using Nano**:
       ```bash
       apt install nano
       nano config.json
       ```
       After editing, press `CTRL + X`, then `Y`, and `Enter` to save.
     - **Using Midnight Commander (MC)**:
       ```bash
       apt install mc
       mc
       ```
       Use the arrow keys to navigate, select `config.json`, and press `F4` to edit. After editing, press `F2` to save and `F10` to exit.
   - Set the paths for `yt-dlp` and `ffmpeg` as follows:
     ```json
     {
         "ytDlpPath": "/data/data/com.termux/files/usr/bin/yt-dlp",
         "ffmpegPath": "/data/data/com.termux/files/usr/bin/ffmpeg"
     }
     ```
   - Save the file after making changes.

4. **Run the Program**
   ```bash
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

---

## Support & Donate ❤️

If you find this project helpful, you can support me via:  
💰 **Saweria**: [https://saweria.co/DeJavi08](https://saweria.co/DeJavi08)

---

🚀 **Enjoy Flash Converter!** If you have any questions or issues, feel free to contact me! 😊

