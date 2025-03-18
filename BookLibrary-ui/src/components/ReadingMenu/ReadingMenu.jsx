import { useEffect, useState } from "react";
import { getAudio } from "../../apis/book";

const ReadingMenu = ({ x, y, selectedText, onClose }) => {
  if (!selectedText) return null;

  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleTextToSpeechButtonClicked = async () => {
    try {
      console.log("Selected text:", selectedText);
      const url = await getAudio(selectedText);
      console.log("Audio URL:", url);
      setAudioUrl(url);

      const newAudio = new Audio(url);
      setAudio(newAudio);
      newAudio
        .play()
        .catch((error) => console.error("Playback failed:", error));
    } catch (error) {
      console.error("Error fetching sound:", error);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      newAudio
        .play()
        .catch((error) => console.error("Playback failed:", error));
      setAudio(newAudio);
    }
  }, [audioUrl]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: "#FFD700",
        border: "2px solid #FF4500",
        padding: "8px",
        borderRadius: "5px",
        zIndex: 99999,
        whiteSpace: "nowrap",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      }}
    >
      <button
        onClick={handleTextToSpeechButtonClicked}
        style={{ cursor: "pointer", padding: "5px" }}
      >
        🎵 Text to Speech
      </button>
      {audio && (
        <button
          onClick={() => audio.play()}
          style={{ marginLeft: "5px", padding: "5px" }}
        >
          ▶️ Play Again
        </button>
      )}
      <div onClick={onClose} style={{ cursor: "pointer", padding: "5px" }}>
        🔖 Đánh dấu
      </div>
      <div onClick={onClose} style={{ cursor: "pointer", padding: "5px" }}>
        📝 Ghi chú
      </div>
    </div>
  );
};

export default ReadingMenu;
