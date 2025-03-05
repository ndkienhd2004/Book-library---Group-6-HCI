const fs = require('fs');
const path = require('path');
const openai = require('../config/openai.config.js');

async function generateSpeech(req, res) {
    console.log("Body nhận được:", req.body);

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Vui lòng nhập văn bản!" });

    try {
        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: text
        });

        const buffer = Buffer.from(await response.arrayBuffer());
        res.setHeader("Content-Type", "audio/mpeg");
        res.send(buffer);

        console.log("Tạo giọng nói thành công!");
    } catch (error) {
        console.error("Lỗi xử lý TTS:", error);
        res.status(500).json({ error: "Lỗi xử lý TTS: " + error.message });
    }
}

module.exports = { generateSpeech };
