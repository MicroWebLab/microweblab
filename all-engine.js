<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALL Unified Hub | ResellWise Central Engine</title>
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
        }

        .search-input-wrapper {
            flex: 1;
        }

        .search-input-wrapper input {
            width: 100%;
            padding: 18px 24px;
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
        }

        .btn-master:hover {
            opacity: 0.9;
        }

        .btn-master:active {
            transform: scale(0.98);
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
            <div class="brand-title">Resell<span>Wise</span> Master Aggregator</div>
        </div>
        <div>
            <span style="font-size: 14px; color: var(--text-muted);">Sustav za objedinjeno pretraživanje</span>
        </div>
    </header>

    <div class="container">
        <div class="hero-banner">
            <h1>🌐 ALL Master Engine — Svi Moduli na Jednom Mjestu</h1>
            <p>Unesite bilo koji proizvod, automobil, bateriju ili opremu. ALL Master Engine pretražuje sve integrirane sub-module i lansira objedinjene rezultate.</p>
        </div>

        <!-- MASTER SEARCH -->
        <div class="master-search-card">
            <div class="search-row">
                <div class="search-input-wrapper">
                    <input type="text" id="masterInput" placeholder="Npr. iPhone 14 Pro, Tesla Model Y, Nike Dunks, Sony Headset..." value="Tesla Model 3">
                </div>
                <button class="btn-master" onclick="executeMasterSearch()">⚡ POKRENI ALL PRETRAGU</button>
            </div>
            <span style="font-size: 13px; color: var(--text-muted);">* Pokretanjem ALL pretrage automatski se agregiraju rezultati iz General, EV i specijaliziranih modula.</span>
        </div>

        <!-- MODULE SELECTORS -->
        <h2 style="font-size: 20px; margin-bottom: 20px;">Dostupni Sub-Moduli</h2>
        <div class="modules-grid">
            <div class="module-card" onclick="openSubModule('resellwise_all_engine.html')">
                <span class="module-icon">🛒</span>
                <div class="module-title">General E-Commerce Module</div>
                <div class="module-desc">eBay, Amazon, Vinted, Depop, Etsy, Poshmark, Mercari, Temu, AliExpress...</div>
                <a href="resellwise_all_engine.html" target="_blank" class="module-btn">Otvoriti General Modul →</a>
            </div>

            <div class="module-card" onclick="openSubModule('ev_search_engine.html')">
                <span class="module-icon">⚡</span>
                <div class="module-title">EV & Vehicles Module</div>
                <div class="module-desc">Mobile.de EV, AutoScout24, AutoTrader US, EV baterije, Wallbox punjači & oprema.</div>
                <a href="ev_search_engine.html" target="_blank" class="module-btn">Otvoriti EV Modul →</a>
            </div>

            <div class="module-card">
                <span class="module-icon">✨</span>
                <div class="module-title">AI Market Intelligence</div>
                <div class="module-desc">Automatsko slanje promptova za procjenu marži, cijena rabljenog/novog i analiza trendova.</div>
                <button class="module-btn" style="border:none; cursor:pointer;" onclick="runGlobalAI()">Pokrenuti AI Analizu →</button>
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
            // General platforms
            { name: "eBay Global", type: "General", badgeClass: "badge-general", url: (q) => `https://www.ebay.com/sch/i.html?_nkw=${q}` },
            { name: "Amazon", type: "General", badgeClass: "badge-general", url: (q) => `https://www.amazon.com/s?k=${q}` },
            { name: "Vinted", type: "General", badgeClass: "badge-general", url: (q) => `https://www.vinted.com/catalog?search_text=${q}` },
            { name: "Depop", type: "General", badgeClass: "badge-general", url: (q) => `https://www.depop.com/search/?q=${q}` },
            { name: "AliExpress", type: "General", badgeClass: "badge-general", url: (q) => `https://www.aliexpress.com/w/wholesale-${q}.html` },
            // EV & Vehicle platforms
            { name: "Mobile.de EV", type: "EV / Auto", badgeClass: "badge-ev", url: (q) => `https://www.mobile.de/srp/search?isSearchRequest=true&vc=Car&ft=ELECTRICITY&q=${q}` },
            { name: "AutoScout24 EV", type: "EV / Auto", badgeClass: "badge-ev", url: (q) => `https://www.autoscout24.com/lst?atype=C&ustate=N%2CU&fuel=E&sort=standard&desc=0&query=${q}` },
            { name: "eBay Motors EV", type: "EV / Auto", badgeClass: "badge-ev", url: (q) => `https://www.ebay.com/b/Auto-Parts-and-Vehicles/6000/bn_1865334?_nkw=${q}+electric` }
        ];

        function executeMasterSearch() {
            const query = document.getElementById('masterInput').value.trim();
            const grid = document.getElementById('masterResultsGrid');
            const countEl = document.getElementById('resCount');

            if (!query) {
                alert('Molimo unesite pojam za pretraživanje.');
                return;
            }

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

        function runGlobalAI() {
            const query = document.getElementById('masterInput').value.trim();
            if (!query) return alert('Unesite pojam.');
            const prompt = `Analiziraj globalno tržište, cijene i reselling profitabilnost za: ${query}`;
            window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, '_blank');
        }

        // Run default search on load
        window.onload = executeMasterSearch;
    </script>
</body>
</html>
