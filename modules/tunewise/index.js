// modules/tunewise/index.js
// TuneWise 3.0 Core Engine - Search, AudD Recognition, YouTube Scraper & Local Storage

/**
 * Cleans search queries from common voice assistant prefixes and command triggers.
 */
export function cleanSearchQuery(query) {
    if (!query) return '';
    return query
        .replace(/^(hey|hej)\s+all,?\s*/i, '')
        .replace(/^(play|find|search|pusti|nađi|pronađi|sviraj)\s+/i, '')
        .replace(/^(song|track|pjesma|pjesmu)\s+/i, '')
        .replace(/\s+by\s+/i, ' ')
        .trim();
}

/**
 * Multi-source CORS-safe YouTube Search Engine for GitHub Pages.
 * Extracts accurate 11-character Video IDs and supports automatic fallback list.
 */
export async function searchYouTubeVideo(query, excludeIds = []) {
    const cleanedQuery = cleanSearchQuery(query);
    if (!cleanedQuery) return { success: false, error: "Empty query" };

    const encoded = encodeURIComponent(cleanedQuery);

    // List of reliable public API endpoints / CORS mirrors
    const apiEndpoints = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://pipedapi.kavin.rocks/search?q=${encoded}&filter=music_videos`)}`,
        `https://vid.puffyan.us/api/v1/search?q=${encoded}&type=video`,
        `https://invidious.nerqv.ps/api/v1/search?q=${encoded}&type=video`,
        `https://inv.tux.pizza/api/v1/search?q=${encoded}&type=video`
    ];

    for (const endpoint of apiEndpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const response = await fetch(endpoint, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) continue;
            const data = await response.json();

            // Piped API format parsing
            if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                const item = data.items.find(i => {
                    const id = i.url ? i.url.split("v=")[1]?.split("&")[0] : null;
                    return id && id.length === 11 && !excludeIds.includes(id);
                });

                if (item) {
                    const vId = item.url.split("v=")[1]?.split("&")[0];
                    return {
                        success: true,
                        song: {
                            videoId: vId,
                            title: item.title || cleanedQuery,
                            artist: item.uploaderName || "YouTube Music",
                            cover: item.thumbnail || `https://i.ytimg.com/vi/${vId}/hqdefault.jpg`,
                            duration: item.duration ? formatSeconds(item.duration) : "3:30"
                        }
                    };
                }
            }

            // Invidious API format parsing
            if (Array.isArray(data) && data.length > 0) {
                const item = data.find(i => i.videoId && i.videoId.length === 11 && !excludeIds.includes(i.videoId));
                if (item) {
                    return {
                        success: true,
                        song: {
                            videoId: item.videoId,
                            title: item.title || cleanedQuery,
                            artist: item.author || "YouTube Music",
                            cover: item.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
                            duration: item.lengthSeconds ? formatSeconds(item.lengthSeconds) : "3:30"
                        }
                    };
                }
            }
        } catch (err) {
            console.warn(`[TuneWise Search] Proxy fallback failed: ${endpoint}`, err);
        }
    }

    // Direct Scraping Fallback via AllOrigins Proxy
    try {
        const scrapeUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.youtube.com/results?search_query=${encoded}`)}`;
        const res = await fetch(scrapeUrl);
        if (res.ok) {
            const html = await res.text();
            const matches = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
            if (matches && matches.length > 0) {
                for (const match of matches) {
                    const id = match.split(':"')[1].replace('"', '');
                    if (id && id.length === 11 && !excludeIds.includes(id)) {
                        return {
                            success: true,
                            song: {
                                videoId: id,
                                title: cleanedQuery,
                                artist: "YouTube Music",
                                cover: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                                duration: "3:30"
                            }
                        };
                    }
                }
            }
        }
    } catch (e) {
        console.error("[TuneWise Search] Scraping error:", e);
    }

    return { success: false, error: "Song not found" };
}

/**
 * Recognize song via AudD API (from 5s audio recorded blob).
 */
export async function recognizeAudioWithAudD(audioBlob, apiToken = 'test') {
    if (!audioBlob) return { success: false, error: "No audio blob recorded" };

    try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'sample.webm');
        formData.append('return', 'apple_music,spotify');
        formData.append('api_token', apiToken);

        const response = await fetch('https://api.audd.io/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("AudD network error");
        const data = await response.json();

        if (data.status === 'success' && data.result) {
            const artist = data.result.artist || '';
            const title = data.result.title || '';
            const searchQuery = `${artist} ${title}`.trim();

            const ytResult = await searchYouTubeVideo(searchQuery);
            if (ytResult.success) {
                return {
                    success: true,
                    song: {
                        ...ytResult.song,
                        artist: artist || ytResult.song.artist,
                        title: title || ytResult.song.title,
                        album: data.result.album || 'Single'
                    }
                };
            }
        }
        return { success: false, error: "Song not found in audio sample" };
    } catch (err) {
        console.error("[TuneWise AudD Error]:", err);
        return { success: false, error: "Recognition failed" };
    }
}

// LocalStorage Playlist & Queue Helpers

export function getFavorites() {
    try { return JSON.parse(localStorage.getItem('tunewise_favorites') || '[]'); } catch { return []; }
}

export function saveFavorites(favs) {
    localStorage.setItem('tunewise_favorites', JSON.stringify(favs));
}

export function toggleFavoriteSong(song) {
    let favs = getFavorites();
    const index = favs.findIndex(f => f.videoId === song.videoId);
    let isFav = false;
    if (index >= 0) {
        favs.splice(index, 1);
    } else {
        favs.unshift(song);
        isFav = true;
    }
    saveFavorites(favs);
    return isFav;
}

export function getRecentlyPlayed() {
    try { return JSON.parse(localStorage.getItem('tunewise_recent') || '[]'); } catch { return []; }
}

export function addRecentlyPlayed(song) {
    let recent = getRecentlyPlayed().filter(r => r.videoId !== song.videoId);
    recent.unshift(song);
    if (recent.length > 30) recent.pop();
    localStorage.setItem('tunewise_recent', JSON.stringify(recent));
}

export function getQueue() {
    try { return JSON.parse(localStorage.getItem('tunewise_queue') || '[]'); } catch { return []; }
}

export function saveQueue(queue) {
    localStorage.setItem('tunewise_queue', JSON.stringify(queue));
}

export function getPlaylists() {
    try { return JSON.parse(localStorage.getItem('tunewise_playlists') || '{}'); } catch { return {}; }
}

export function savePlaylists(playlists) {
    localStorage.setItem('tunewise_playlists', JSON.stringify(playlists));
}

export function createPlaylist(name) {
    if (!name) return false;
    let playlists = getPlaylists();
    if (!playlists[name]) {
        playlists[name] = [];
        savePlaylists(playlists);
        return true;
    }
    return false;
}

export function addSongToPlaylist(playlistName, song) {
    let playlists = getPlaylists();
    if (!playlists[playlistName]) playlists[playlistName] = [];
    if (!playlists[playlistName].some(s => s.videoId === song.videoId)) {
        playlists[playlistName].unshift(song);
        savePlaylists(playlists);
        return true;
    }
    return false;
}

function formatSeconds(seconds) {
    const sec = parseInt(seconds, 10);
    if (isNaN(sec)) return "3:30";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}
