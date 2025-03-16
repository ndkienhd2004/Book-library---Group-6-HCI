const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient({});

async function generateSpeech(req, res) {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send("Văn bản không được cung cấp.");
    }

    const request = {
      input: { text: text },
      voice: {
        languageCode: "vi-VN",
        name: "vi-VN-Standard-A",
        ssmlGender: "NEUTRAL",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.set({
      "Content-Type": "audio/mp3",
    });
    res.send(response.audioContent);
  } catch (error) {
    console.error("Lỗi TTS:", error);
    res.status(500).send("Đã xảy ra lỗi khi tạo âm thanh.");
  }
}

module.exports = generateSpeech;
