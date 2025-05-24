<style>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 20, 40, 0.9);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}
.popup-overlay.show {
    opacity: 1;
    visibility: visible;
}
.popup-card {
    background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #1e40af 100%);
    border: 2px solid #00d9ff;
    border-radius: 15px;
    box-shadow: 0 0 30px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 100, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    max-width: 500px;
    width: 90%;
    padding: 30px;
    position: relative;
    transform: scale(0.7) translateY(50px);
    transition: all 0.4s ease;
    font-family: 'Courier New', monospace;
}
.popup-overlay.show .popup-card {
    transform: scale(1) translateY(0);
}
.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 0, 80, 0.8);
    border: none;
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close-btn:hover {
    background: rgba(255, 0, 80, 1);
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 0, 80, 0.5);
}
.popup-title {
    color: #00d9ff;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
    letter-spacing: 1px;
}
.popup-description {
    color: #e0f2fe;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 25px;
    text-align: justify;
}
.highlight {
    color: #00ff88;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
}
.popup-footer {
    border-top: 1px solid rgba(0, 217, 255, 0.3);
    padding-top: 20px;
    margin-top: 20px;
}
.footer-text {
    color: #00d9ff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 0 0 8px rgba(0, 217, 255, 0.4);
}
.footer-small {
    color: #94a3b8;
    font-size: 14px;
    text-align: center;
    margin: 5px 0;
}
.copyright {
    color: #64748b;
    font-size: 12px;
    text-align: center;
    margin-top: 15px;
}
.cancel-btn {
    background: linear-gradient(45deg, #ff1744, #d50000);
    border: 1px solid #ff5722;
    color: white;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
    width: 100%;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.cancel-btn:hover {
    background: linear-gradient(45deg, #d50000, #b71c1c);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 23, 68, 0.4);
}
@keyframes glitch {
    0% { text-shadow: 0 0 10px rgba(0, 217, 255, 0.5); }
    25% { text-shadow: -2px 0 rgba(255, 0, 80, 0.5), 2px 0 rgba(0, 255, 136, 0.5); }
    50% { text-shadow: 0 0 10px rgba(0, 217, 255, 0.8); }
    75% { text-shadow: 2px 0 rgba(255, 0, 80, 0.5), -2px 0 rgba(0, 255, 136, 0.5); }
    100% { text-shadow: 0 0 10px rgba(0, 217, 255, 0.5); }
}
.popup-title {
    animation: glitch 3s infinite;
}
@keyframes borderGlow {
    0% { border-color: #00d9ff; box-shadow: 0 0 30px rgba(0, 217, 255, 0.3); }
    50% { border-color: #00ff88; box-shadow: 0 0 30px rgba(0, 255, 136, 0.3); }
    100% { border-color: #00d9ff; box-shadow: 0 0 30px rgba(0, 217, 255, 0.3); }
}
.popup-card {
    animation: borderGlow 4s infinite;
}
</style>

<div id="popupOverlay" class="popup-overlay">
    <div class="popup-card">
        <button class="close-btn" onclick="closeCybertassPopup()">&times;</button>
        
        <div class="popup-title">Hi Cybertass Mania!</div>
        
        <div class="popup-description">
            Kami disini menyediakan kunci jawaban dengan maksud sebagai <span class="highlight">educational purpose only</span>, tidak bermaksud untuk dijadikan contekan saat ujian, melainkan dapat digunakan sebagai media belajar untuk mempersiapkan diri menghadapi <span class="highlight">Ujian SAT 2025</span> yang akan dilaksanakan <span class="highlight">26 Mei 2025 hingga 10 Juni 2025</span>! Gunakan website ini sebaik mungkin.
        </div>
        
        <div class="popup-footer">
            <div class="footer-text">Selamat Belajar!</div>
            <div class="footer-small">Educational purpose only</div>
            <div class="copyright">@Cybertass 2025</div>
        </div>
        
        <button class="cancel-btn" onclick="closeCybertassPopup()">Tutup</button>
    </div>
</div>

<script>
let cybertassPopupShown = false;

function showCybertassPopup() {
    const overlay = document.getElementById('popupOverlay');
    if (overlay) {
        overlay.classList.add('show');
    }
}

function closeCybertassPopup() {
    const overlay = document.getElementById('popupOverlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Event listeners
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'popupOverlay') {
        closeCybertassPopup();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCybertassPopup();
    }
});

// Auto show popup
if (!cybertassPopupShown) {
    setTimeout(showCybertassPopup, 500);
    cybertassPopupShown = true;
}
</script>
