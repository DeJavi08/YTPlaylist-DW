import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Set page title
document.title = "Flash Convert";

// Set favicon dynamically
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "https://raw.githubusercontent.com/DeJavi08/YTPlaylist-DW/refs/heads/master/src/favicon-bolt.png";
document.head.appendChild(favicon);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
