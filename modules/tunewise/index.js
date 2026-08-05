import { recognizeSong } from "../../api/audd/audd.js";

export async function startTuneWiseRecognition(audioBlob) {
    try {
        const result = await recognizeSong(audioBlob);

        if (result && result.status === "success") {
            return {
                success: true,
                song: result.result
            };
        }

        return {
            success: false
        };

    } catch (error) {
        console.error("TuneWise Module:", error);

        return {
            success: false,
            error
        };
    }
}
