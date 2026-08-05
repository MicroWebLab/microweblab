// api/audd/audd.js

import { AUDD_API_KEY } from "./config.js";

export async function recognizeSong(audioData) {
  try {
    const formData = new FormData();

    formData.append("api_token", AUDD_API_KEY);
    formData.append("file", audioData);
    formData.append("return", "apple_music,spotify,deezer");

    const response = await fetch("https://api.audd.io/", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("AudD API Error:", error);
    return null;
  }
}

