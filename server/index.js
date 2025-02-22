import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins in development
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling']
  }
});

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*' // Allow all origins in development
}));
app.use(express.json());

// Railway specific: Use /tmp directory for temporary files
const outputDir = '/tmp/output';
const tempDir = '/tmp/temp';

async function ensureDirectories() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(tempDir, { recursive: true });
}

ensureDirectories();

async function cleanupTemp(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error cleaning up temp file:', error);
  }
}

// Health check endpoint for Railway
app.get('/', (req, res) => {
  res.json({ status: 'healthy' });
});

app.post('/convert', async (req, res) => {
  const { url, format, quality } = req.body;
  const socketId = req.headers['socket-id'];

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    res.json({ message: 'Conversion started' });

    const playlistInfo = await getPlaylistInfo(url);
    const videos = playlistInfo.entries;

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const progress = ((i / videos.length) * 100).toFixed(2);

      io.emit('conversionProgress', {
        status: 'downloading',
        progress: parseFloat(progress),
        currentFile: video.title
      });

      await processVideo(video.url, format, quality, socketId);
    }

    io.emit('conversionProgress', {
      status: 'completed',
      progress: 100,
      currentFile: 'All files processed'
    });

  } catch (error) {
    console.error('Conversion error:', error);
    io.emit('conversionError', error.message);
  }
});

async function getPlaylistInfo(url) {
  return new Promise((resolve, reject) => {
    const ytdl = spawn('yt-dlp', [
      '--dump-json',
      '--flat-playlist',
      url
    ]);

    let data = '';

    ytdl.stdout.on('data', (chunk) => {
      data += chunk;
    });

    ytdl.stderr.on('data', (data) => {
      console.error(`yt-dlp error: ${data}`);
    });

    ytdl.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Failed to get playlist info'));
        return;
      }

      try {
        const entries = data.trim().split('\n').map(JSON.parse);
        resolve({ entries });
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function processVideo(videoUrl, format, quality, socketId) {
  const tempFile = path.join(tempDir, `temp_${Date.now()}.${format}`);
  const outputFile = path.join(outputDir, `output_${Date.now()}.${format}`);

  try {
    await downloadVideo(videoUrl, tempFile, format, quality);

    if (format === 'mp3') {
      await convertToMp3(tempFile, outputFile, quality);
    } else {
      await fs.rename(tempFile, outputFile);
    }

    await cleanupTemp(tempFile);

  } catch (error) {
    await cleanupTemp(tempFile);
    throw error;
  }
}

function downloadVideo(url, output, format, quality) {
  return new Promise((resolve, reject) => {
    const args = [
      '-f', format === 'mp3' ? 'bestaudio' : `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
      '-o', output,
      url
    ];

    const ytdl = spawn('yt-dlp', args);

    ytdl.stderr.on('data', (data) => {
      console.error(`yt-dlp error: ${data}`);
    });

    ytdl.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('Failed to download video'));
      }
    });
  });
}

function convertToMp3(input, output, quality) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .toFormat('mp3')
      .audioBitrate(quality)
      .on('end', resolve)
      .on('error', reject)
      .save(output);
  });
}

// Cleanup old files periodically
setInterval(async () => {
  try {
    const files = await fs.readdir(outputDir);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(outputDir, file);
      const stats = await fs.stat(filePath);
      
      // Remove files older than 1 hour
      if (now - stats.mtime.getTime() > 3600000) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}, 3600000); // Run every hour

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
