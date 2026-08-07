// modules/tunewise/index.js
// TuneWise 3.1 Core Engine - Multi-fallback Search, AudD Recognition & Local Storage Persistence

/**
 * Cleans search queries by removing voice triggers, conversational prefixes, and unwanted tokens.
 * HandlesCroatian and English voice command variations.
 */
export function cleanSearchQuery(query) {
    if (!query) return '';
    return query
        .replace(/^(hey|hej)\s+all,?\s*/i, '')
        .replace(/^(play|find|search|pusti|nađi|pronađi|sviraj|traži|prikazi)\s+/i, '')
        .replace(/^(song|track|pjesma|pjesmu|video)\s+/i, '')
        .replace(/\s+by\s+/i, ' ')
        .replace(/["']/g, '')
        .trim();
}

/**
 * Validates if a string is a legitimate 11-character YouTube video ID.
 */
function isValidVideoId(id) {
    return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Formats seconds into M:SS timestamp format.
 */
function formatSeconds(seconds) {
    const sec = parseInt(seconds, 10);
    if (isNaN(sec) || sec <= 0) return "3:30";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * Multi-source CORS-safe YouTube Search Engine tailored for GitHub Pages (no backend needed).
 * Iterates across Piped APIs, Invidious APIs, and CORS Proxy HTML scraping.
 * Supports exclusion of restricted/unembeddable video IDs.
 */
export async function searchYouTubeVideo(query, excludeIds = []) {
    const cleanedQuery = cleanSearchQuery(query);
    if (!cleanedQuery) return { success: false, error: "Empty query" };

    const encoded = encodeURIComponent(cleanedQuery);

    // List of CORS-friendly API public endpoints for YouTube metadata retrieval
    const primaryEndpoints = [
        `https://pipedapi.kavin.rocks/search?q=${encoded}&filter=music_videos`,
        `https://pipedapi.tokhmi.xyz/search?q=${encoded}&filter=music_videos`,
        `https://inv.nadeko.net/api/v1/search?q=${encoded}&type=video`,
        `https://yewtu.be/api/v1/search?q=${encoded}&type=video`,
        `https://inv.tux.pizza/api/v1/search?q=${encoded}&type=video`
    ];

    for (const endpoint of primaryEndpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            const response = await fetch(endpoint, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) continue;
            const data = await response.json();

            // Handle Piped API Response Format
            if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                for (const item of data.items) {
                    const id = item.url ? item.url.split("v=")[1]?.split("&")[0] : null;
                    if (id && isValidVideoId(id) && !excludeIds.includes(id)) {
                        return {
                            success: true,
                            song: {
                                videoId: id,
                                title: item.title || cleanedQuery,
                                artist: item.uploaderName || "YouTube Artist",
                                cover: item.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                                duration: item.duration ? formatSeconds(item.duration) : "3:30"
                            }
                        };
                    }
                }
            }

            // Handle Invidious API Response Format
            if (Array.isArray(data) && data.length > 0) {
                for (const item of data) {
                    if (item.videoId && isValidVideoId(item.videoId) && !excludeIds.includes(item.videoId)) {
                        return {
                            success: true,
                            song: {
                                videoId: item.videoId,
                                title: item.title || cleanedQuery,
                                artist: item.author || "YouTube Artist",
                                cover: item.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
                                duration: item.lengthSeconds ? formatSeconds(item.lengthSeconds) : "3:30"
                            }
                        };
                    }
                }
            }
        } catch (err) {
            console.warn(`[TuneWise Engine] Endpoint failed: ${endpoint}`, err);
        }
    }

    // CORS Proxy Scraping Fallback (Guarantees YouTube search results)
    const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://www.youtube.com/results?search_query=${encoded}`)}`,
        `https://corsproxy.io/?${encodeURIComponent(`https://www.youtube.com/results?search_query=${encoded}`)}`
    ];

    for (const proxyUrl of proxyUrls) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(proxyUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const html = await res.text();
                const matches = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
                if (matches && matches.length > 0) {
                    for (const match of matches) {
                        const id = match.split(':"')[1].replace('"', '');
                        if (isValidVideoId(id) && !excludeIds.includes(id)) {
                            // Extract title if present in page JSON
                            let songTitle = cleanedQuery;
                            const titleMatch = html.match(/"title":{"runs":\[{"text":"([^"]+)"/);
                            if (titleMatch && titleMatch[1]) {
                                songTitle = titleMatch[1];
                            }

                            return {
                                success: true,
                                song: {
                                    videoId: id,
                                    title: songTitle,
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
            console.error("[TuneWise Engine] Proxy scraper error:", e);
        }
    }

    return { success: false, error: "Song not found" };
}

/**
 * Recognizes audio using AudD API (from a recorded AudioBlob) and resolves the matching YouTube Video ID.
 */
export async function recognizeAudioWithAudD(audioBlob, apiToken = 'test') {
    if (!audioBlob) return { success: false, error: "No audio recorded" };

    try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'sample.webm');
        formData.append('return', 'apple_music,spotify');
        formData.append('api_token', apiToken);

        const response = await fetch('https://api.audd.io/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("AudD service error");
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
                        title: title || ytResult.song.title
                    }
                };
            }
        }
        return { success: false, error: "Song not found" };
    } catch (err) {
        console.error("[TuneWise AudD Engine Error]:", err);
        return { success: false, error: "Audio recognition failed" };
    }
}

// LocalStorage Persistence Helpers

export function getFavorites() {
    try { return JSON.parse(localStorage.getItem('tunewise_favorites') || '[]'); } catch { return []; }
}

export function saveFavorites(favs) {
    localStorage.setItem('tunewise_favorites', JSON.stringify(favs));
}

export function toggleFavoriteSong(song) {
    if (!song || !song.videoId) return false;
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
    if (!song || !song.videoId) return;
    let recent = getRecentlyPlayed().filter(r => r.videoId !== song.videoId);
    recent.unshift(song);
    if (recent.length > 40) recent.pop();
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
    if (!name || !name.trim()) return false;
    const cleanName = name.trim();
    let playlists = getPlaylists();
    if (!playlists[cleanName]) {
        playlists[cleanName] = [];
        savePlaylists(playlists);
        return true;
    }
    return false;
}

export function addSongToPlaylist(playlistName, song) {
    if (!playlistName || !song || !song.videoId) return false;
    let playlists = getPlaylists();
    if (!playlists[playlistName]) playlists[playlistName] = [];
    if (!playlists[playlistName].some(s => s.videoId === song.videoId)) {
        playlists[playlistName].unshift(song);
        savePlaylists(playlists);
        return true;
    }
    return false;
}
