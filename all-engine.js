<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALL Unified Smart Voice Engine | ResellWise Central</title>
    <style>
        :root {
            --bg: #0b0f19;
            --surface: #151c2c;
            --surface-card: #1e293b;
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --accent-green: #10b981;
            --accent-cyan: #06b6d4;
            --accent-purple: #8b5cf6;
            --accent-red: #ef4444;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border: #334155;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
            padding-bottom: 50px;
        }

        header {
            background: rgba(21, 28, 44, 0.95);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            padding: 18px 5%;
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-badge {
            background: linear-gradient(135deg, var(--primary), var(--accent-purple));
            color: white;
            font-weight: 900;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 20px;
            letter-spacing: 1.5px;
        }

        .brand-title {
            font-size: 22px;
            font-weight: 700;
        }

        .brand-title span {
            color: var(--primary);
        }

        .container {
            max-width: 1300px;
            margin: 30px auto;
            padding: 0 20px;
        }

        .hero-banner {
            background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 35px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
            position: relative;
            overflow: hidden;
        }

        .hero-banner h1 {
            font-size: 32px;
            margin-bottom: 12px;
            background: linear-gradient(90deg, #fff, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-banner p {
            color: var(--text-muted);
            max-width: 800px;
            font-size: 16px;
            line-height: 1.6;
        }

        /* CENTRAL SEARCH BAR */
        .master-search-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .search-row {
            display: flex;
            gap: 14px;
            margin-bottom: 20px;
            align-items: center;
        }

        .search-input-wrapper {
            flex: 1;
            position: relative;
        }

        .search-input-wrapper input {
            width: 100%;
            padding: 18px 24px;
            padding-right: 60px;
            background: #0f172a;
            border: 1px solid var(--border);
            border-radius: 12px;
            color: white;
            font-size: 18px;
            outline: none;
            transition: all 0.2s;
        }

        .search-input-wrapper input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25);
        }

        .btn-mic {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            font-size: 22px;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-mic:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .btn-mic.listening {
            background: rgba(239, 68, 68, 0.2);
            color: var(--accent-red);
            animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
            0% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.15); }
            100% { transform: translateY(-50%) scale(1); }
        }

        .btn-master {
            padding: 18px 30px;
            border: none;
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            cursor: pointer;
            background: linear-gradient(135deg, var(--primary), var(--accent-purple));
            color: white;
            transition: transform 0.1s, opacity 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
        }

        .btn-master:hover {
            opacity: 0.9;
        }

        .btn-master:active {
            transform: scale(0.98);
        }

        /* AI DIALOGUE BOX */
        .ai-dialogue-box {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid var(--primary);
            border-radius: 12px;
            padding: 15px 20px;
            margin-top: 15px;
            display: none;
            align-items: center;
            gap: 12px;
            font-size: 15px;
            color: #a5b4fc;
        }

        /* MODULE SELECTOR GRID */
        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .module-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            cursor: pointer;
            transition: all 0.25s ease;
            position: relative;
        }

        .module-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }

        .module-icon {
            font-size: 32px;
            margin-bottom: 15px;
            display: inline-block;
        }

        .module-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
            color: var(--text-main);
        }

        .module-desc {
            font-size: 13px;
            color: var(--text-muted);
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .module-btn {
            display: inline-block;
            width: 100%;
            padding: 10px;
            text-align: center;
            background: var(--surface-card);
            border: 1px solid var(--border);
            color: var(--text-main);
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            transition: background 0.2s;
        }

        .module-card:hover .module-btn {
            background: var(--primary);
            border-color: var(--primary);
            color: white;
        }

        /* LIVE AGGREGATOR DISPLAY */
        .results-section {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 30px;
        }

        .results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 20px;
        }

        .res-card {
            background: #0f172a;
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .res-badge {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 4px 8px;
            border-radius: 4px;
            width: fit-content;
            margin-bottom: 10px;
        }

        .badge-general { background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid #6366f1; }
        .badge-ev { background: rgba(6, 182, 212, 0.2); color: #22d3ee; border: 1px solid #06b6d4; }
        .badge-special { background: rgba(139, 92, 246, 0.2); color: #c084fc; border: 1px solid #8b5cf6; }

        .res-title {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 6px;
        }

        .res-link {
            display: block;
            text-align: center;
            padding: 10px;
            background: var(--surface-card);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 15px;
            transition: background 0.2s;
        }

        .res-link:hover {
            background: var(--accent-green);
            color: #042f2e;
        }
    </style>
</head>
<body>

    <header>
        <div class="brand">
            <span class="brand-badge">ALL HUB</span>
            <div class="brand-title">Resell<span>Wise</span> Smart Voice Hub</div>
        </div>
        <div>
            <span style="font-size: 14px; color: var(--text-muted);">Sustav sa Smart Intent Asistentom</span>
        </div>
    </header>

    <div class="container">
        <div class="hero-banner">
            <h1>🗣️ ALL Voice Assistant — Reci što tražiš</h1>
            <p>Izgovori npr.: <i>"ALL, pronađi pjesmu Believer"</i>, <i>"ALL, pronađi Tesla Model Y"</i> ili <i>"ALL, pronađi iPhone 16 Pro"</i>. Asistent prepoznaje namjeru i vodi razgovor s tobom.</p>
        </div>

        <!-- MASTER SEARCH -->
        <div class="master-search-card">
            <div class="search-row">
                <div class="search-input-wrapper">
                    <input type="text" id="masterInput" placeholder="Npr. ALL, pronađi pjesmu Believer..." value="ALL, pronađi Tesla Model Y" onkeypress="handleKeyPress(event)">
                    <button class="btn-mic" id="micBtn" onclick="toggleVoiceRecognition()" title="Glasovno pretraživanje">🎤</button>
                </div>
                <button class="btn-master" onclick="processVoiceOrTextCommand(document.getElementById('masterInput').value)">⚡ POKRENI ALL ASISTENTA</button>
            </div>
            <span style="font-size: 13px; color: var(--text-muted);" id="searchStatus">* Recite "ALL, pronađi..." ili kliknite mikrofon.</span>
            
            <!-- AI Response Box -->
            <div class="ai-dialogue-box" id="aiDialogueBox">
                <span style="font-size: 20px;">🗣️</span>
                <span id="aiResponseText">Slušam vaše naredbe...</span>
            </div>
        </div>

        <!-- MODULE SELECTORS -->
        <h2 style="font-size: 20px; margin-bottom: 20px;">Dostupni Sub-Moduli</h2>
        <div class="modules-grid">
            <div class="module-card" onclick="openSubModule('tunewise_all.html')">
                <span class="module-icon">🎵</span>
                <div class="module-title">TuneWiseAll Module</div>
                <div class="module-desc">Glazbena tražilica, pjesme, albumi, izvođači (Spotify, YouTube, Soundcloud...).</div>
                <a href="tunewise_all.html" target="_blank" class="module-btn">Otvoriti TuneWiseAll →</a>
            </div>

            <div class="module-card" onclick="openSubModule('evcharge_wise.html')">
                <span class="module-icon">⚡</span>
                <div class="module-title">EVChargeWise Module</div>
                <div class="module-desc">Električna vozila, punjači, baterije, oprema, Mobile.de EV, AutoScout24.</div>
                <a href="evcharge_wise.html" target="_blank" class="module-btn">Otvoriti EVChargeWise →</a>
            </div>

            <div class="module-card" onclick="openSubModule('resellwise_all_engine.html')">
                <span class="module-icon">🛒</span>
                <div class="module-title">ResellWise Engine</div>
                <div class="module-desc">Tehnika, odjeća, mobiteli, eBay, Amazon, Vinted, Depop, Etsy, AliExpress.</div>
                <a href="resellwise_all_engine.html" target="_blank" class="module-btn">Otvoriti ResellWise →</a>
            </div>
        </div>

        <!-- AGGREGATED LIVE RESULTS DISPLAY -->
        <div class="results-section">
            <div class="results-header">
                <h3 id="resHeading" style="font-size: 20px;">Prikaz Agregiranih Rezultata</h3>
                <span id="resCount" style="color: var(--text-muted); font-size: 14px;">Čekanje na pretragu...</span>
            </div>
            <div id="masterResultsGrid" class="results-grid"></div>
        </div>
    </div>

    <script>
        const masterRegistry = [
            { name: "eBay Global", type: "General", badgeClass: "badge-general", url: (q) => `https://www.ebay.com/sch/i.html?_nkw=${q}` },
            { name: "Amazon", type: "General", badgeClass: "badge-general", url: (q) => `https://www.amazon.com/s?k=${q}` },
            { name: "Vinted EU", type: "General", badgeClass: "badge-general", url: (q) => `https://www.vinted.com/catalog?search_text=${q}` },
            { name: "Mobile.de EV", type: "EV / Auto", badgeClass: "badge-ev", url: (q) => `https://www.mobile.de/srp/search?isSearchRequest=true&vc=Car&ft=ELECTRICITY&q=${q}` },
            { name: "AutoScout24 EV", type: "EV / Auto", badgeClass: "badge-ev", url: (q) => `https://www.autoscout24.com/lst?atype=C&ustate=N%2CU&fuel=E&sort=standard&desc=0&query=${q}` },
            { name: "YouTube Music", type: "Music", badgeClass: "badge-special", url: (q) => `https://music.youtube.com/search?q=${q}` },
            { name: "Spotify Search", type: "Music", badgeClass: "badge-special", url: (q) => `https://open.spotify.com/search/${q}` }
        ];

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                processVoiceOrTextCommand(document.getElementById('masterInput').value);
            }
        }

        function speakText(text, callback) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'hr-HR';
                utterance.rate = 1.0;
                
                if (callback) {
                    utterance.onend = callback;
                }
                
                window.speechSynthesis.speak(utterance);
            } else if (callback) {
                callback();
            }
        }

        function showAIDialogue(text) {
            const box = document.getElementById('aiDialogueBox');
            const txt = document.getElementById('aiResponseText');
            box.style.display = 'flex';
            txt.innerText = text;
        }

        /* -------------------------------------------------------------
           SMART INTENT CLASSIFIER & DIALOGUE ENGINE
        ------------------------------------------------------------- */
        function processVoiceOrTextCommand(rawRawText) {
            let rawText = rawRawText.trim();
            if (!rawText) {
                alert('Molimo unesite ili izgovorite naredbu.');
                return;
            }

            // Očisti prefikse poput "ALL", "ALL pronađi", "pronađi", "potraži"
            let cleanedQuery = rawText
                .replace(/^all,?\s*/i, '')
                .replace(/^(pronađi|traži|potraži|nađi|otvori)\s*/i, '')
                .trim();

            const lower = rawText.toLowerCase();

            // 1. INTENT: GLAZBA / PJESME -> TuneWiseAll Modul
            if (lower.includes('pjesm') || lower.includes('glazb') || lower.includes('pjesmu') || lower.includes('muzika') || lower.includes('pesma')) {
                let songName = cleanedQuery.replace(/^(pjesmu|pjesma|glazbu|muziku)\s*/i, '').trim();
                let responseText = `Pronašao sam pjesmu ${songName}. Otvaram TuneWiseAll.`;
                
                showAIDialogue(responseText);
                speakText(responseText, () => {
                    executeMasterSearch(songName);
                    // Proširivo s otvaranjem zasebnog sub-modula:
                    // window.open(`tunewise_all.html?q=${encodeURIComponent(songName)}`, '_blank');
                });
                return;
            }

            // 2. INTENT: EV & VOZILA -> EVChargeWise Modul
            if (lower.includes('tesla') || lower.includes('auto') || lower.includes('vozilo') || lower.includes('baterij') || lower.includes('punjač') || lower.includes('ev') || lower.includes('bmw i') || lower.includes('porsche taycan')) {
                let vehicleQuery = cleanedQuery.replace(/^(auto|vozilo|ev)\s*/i, '').trim();
                let responseText = `Otvaram EVChargeWise i pretražujem ${vehicleQuery}.`;
                
                showAIDialogue(responseText);
                speakText(responseText, () => {
                    executeMasterSearch(vehicleQuery);
                    // window.open(`evcharge_wise.html?q=${encodeURIComponent(vehicleQuery)}`, '_blank');
                });
                return;
            }

            // 3. INTENT: GENERAL RESELL (Mobiteli, Odjeća, Tehnika) -> ResellWise Engine
            let productQuery = cleanedQuery.replace(/^(stvar|proizvod|predmet)\s*/i, '').trim();
            let responseText = `Otvaram ResellWise i pretražujem ${productQuery}.`;

            showAIDialogue(responseText);
            speakText(responseText, () => {
                executeMasterSearch(productQuery);
            });
        }

        function executeMasterSearch(query) {
            const grid = document.getElementById('masterResultsGrid');
            const countEl = document.getElementById('resCount');

            const encoded = encodeURIComponent(query);
            grid.innerHTML = '';
            countEl.innerText = `Agregirano ${masterRegistry.length} servisa za "${query}"`;

            masterRegistry.forEach(item => {
                const card = document.createElement('div');
                card.className = 'res-card';
                card.innerHTML = `
                    <div>
                        <span class="res-badge ${item.badgeClass}">${item.type}</span>
                        <div class="res-title">${item.name}</div>
                        <div style="font-size: 13px; color: var(--text-muted);">Pretraga za: ${query}</div>
                    </div>
                    <a href="${item.url(encoded)}" target="_blank" class="res-link">Pretraži Live →</a>
                `;
                grid.appendChild(card);
            });
        }

        function openSubModule(url) {
            window.open(url, '_blank');
        }

        /* -------------------------------------------------------------
           GLASOVNO PREPOZNAVANJE (SPEECH RECOGNITION)
        ------------------------------------------------------------- */
        let recognition = null;
        let isListening = false;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'hr-HR';

            recognition.onstart = function() {
                isListening = true;
                const micBtn = document.getElementById('micBtn');
                const status = document.getElementById('searchStatus');
                micBtn.classList.add('listening');
                status.innerText = '🔴 Slušam... Izgovorite naredbu (npr. "ALL, pronađi Tesla Model Y")';
                status.style.color = 'var(--accent-cyan)';
            };

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById('masterInput').value = transcript;
                
                // Pokreni pametnu analizu rečenice
                processVoiceOrTextCommand(transcript);
            };

            recognition.onerror = function(event) {
                console.error('Greška pri slušanju:', event.error);
                resetMicUI();
            };

            recognition.onend = function() {
                resetMicUI();
            };
        } else {
            document.getElementById('micBtn').style.display = 'none';
        }

        function toggleVoiceRecognition() {
            if (!recognition) {
                alert('Tvoj preglednik ne podržava glasovne naredbe.');
                return;
            }

            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        }

        function resetMicUI() {
            isListening = false;
            const micBtn = document.getElementById('micBtn');
            const status = document.getElementById('searchStatus');
            micBtn.classList.remove('listening');
            status.innerText = '* Recite "ALL, pronađi..." ili kliknite mikrofon.';
            status.style.color = 'var(--text-muted)';
        }

        window.onload = () => executeMasterSearch("Tesla Model Y");
    </script>
</body>
</html>
