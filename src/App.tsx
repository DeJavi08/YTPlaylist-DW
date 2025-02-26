import React, { useState, useEffect } from 'react';
import { Zap, Music4, Video, Loader2, Settings, Download, ExternalLink } from 'lucide-react';
import io from 'socket.io-client';
import { API_URL } from './config';

const socket = io(API_URL);

interface ConversionProgress {
  status: string;
  progress: number;
  currentFile: string;
}

interface DownloadInfo {
  filename: string;
  title: string;
  downloadUrl: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [isLoading, setIsLoading] = useState(false);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [quality, setQuality] = useState(format === 'mp3' ? '192' : '720');
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<DownloadInfo[]>([]);

  useEffect(() => {
    socket.on('conversionProgress', (data: ConversionProgress) => {
      setProgress(data);
      if (data.status === 'completed') {
        setIsLoading(false);
        setProgress(null);
      }
    });

    socket.on('conversionError', (errorMessage: string) => {
      setError(errorMessage);
      setIsLoading(false);
    });

    socket.on('downloadReady', (downloadInfo: DownloadInfo) => {
      setDownloads(prev => [...prev, downloadInfo]);
    });

    // Clear downloads when component unmounts or page refreshes
    const handleBeforeUnload = () => {
      setDownloads([]);
      socket.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.off('conversionProgress');
      socket.off('conversionError');
      socket.off('downloadReady');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showQualityOptions) {
      setShowQualityOptions(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(null);
    setDownloads([]);

    try {
      const response = await fetch(`${API_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Socket-ID': socket.id
        },
        body: JSON.stringify({
          url,
          format,
          quality,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Conversion failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const getQualityOptions = () => {
    if (format === 'mp3') {
      return [
        { value: '128', label: '128 kbps' },
        { value: '192', label: '192 kbps' },
        { value: '256', label: '256 kbps' },
        { value: '320', label: '320 kbps' },
      ];
    } else {
      return [
        { value: '360', label: '360p' },
        { value: '480', label: '480p' },
        { value: '720', label: '720p' },
        { value: '1080', label: '1080p' },
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <Zap className="w-12 h-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Flash Convert</h1>
          </div>
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              YouTube Playlist Converter
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* URL Input */}
              <div className="mb-6">
                <label htmlFor="url" className="block text-sm font-medium text-gray-600 mb-2">
                  Playlist URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="https://youtube.com/playlist?list=..."
                  required
                />
              </div>

              {/* Format Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Select Format
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('mp3');
                      setQuality('192');
                      setShowQualityOptions(false);
                    }}
                    className={`flex items-center justify-center p-4 rounded-lg border transition ${
                      format === 'mp3'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300'
                    }`}
                  >
                    <Music4 className="w-5 h-5 mr-2" />
                    MP3 (Audio)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('mp4');
                      setQuality('720');
                      setShowQualityOptions(false);
                    }}
                    className={`flex items-center justify-center p-4 rounded-lg border transition ${
                      format === 'mp4'
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300'
                    }`}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    MP4 (Video)
                  </button>
                </div>
              </div>

              {/* Quality Options */}
              {showQualityOptions && (
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-600 mb-3">
                    Select Quality
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {getQualityOptions().map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setQuality(option.value)}
                        className={`flex items-center justify-center p-4 rounded-lg border transition ${
                          quality === option.value
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'border-gray-200 text-gray-600 hover:border-orange-300'
                        }`}
                      >
                        <Settings className="w-5 h-5 mr-2" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {progress && (
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {progress.status}: {progress.currentFile}
                  </p>
                </div>
              )}

              {/* Downloads Section */}
              {downloads.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Ready for Download</h3>
                  <div className="space-y-2">
                    {downloads.map((download, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm text-gray-700 truncate flex-1 mr-3">{download.title}</span>
                        <a
                          href={`${API_URL}${download.downloadUrl}`}
                          className="flex items-center px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : showQualityOptions ? (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start Converting
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5 mr-2" />
                    Select Quality
                  </>
                )}
              </button>
            </form>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <h3 className="font-semibold text-gray-700">Fast Conversion</h3>
                <p className="text-sm text-gray-500">Lightning-quick processing</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-700">Batch Download</h3>
                <p className="text-sm text-gray-500">Convert entire playlists</p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-700">High Quality</h3>
                <p className="text-sm text-gray-500">Best quality output</p>
              </div>
            </div>
          </div>

          {/* Development Team */}
<div className="mt-12">
  <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Meet the Developers</h2>
  
  <div className="overflow-x-auto flex space-x-6 p-4 hide-scrollbar">
    {[
      {
        name: "DeJavi08",
        image: "https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/master/src/dejavi.jpg",
        link: "https://github.com/DeJavi08/",
      },
      {
        name: "D38R15",
        image: "https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/master/src/wokabi.jpg",
        link: "https://github.com/Hamzah82",
      },
      {
        name: "DevilGun",
        image: "https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/master/src/electrogaming.png",
        link: "https://github.com/WeebCoderr",
      },
    ].map((member) => (
      <div key={member.name} className="flex-none w-48 bg-white shadow-md rounded-lg p-4 text-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full object-cover"
        />
        <a
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-lg font-semibold text-orange-500 hover:underline"
        >
          {member.name}
        </a>
      </div>
    ))}
  </div>
</div>

{/* Donation Link */}
<div className="mt-8 text-center">
  <p className="text-gray-600">Support the development of this project with a donation!</p>
  <a
    href="https://saweria.co/DeJavi08"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
  >
    Donate Now
  </a>
</div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
