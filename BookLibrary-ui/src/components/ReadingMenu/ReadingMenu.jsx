import { useEffect, useState } from "react";
import { explainBook, getAudio, summaryBook } from "../../apis/book";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SummarizeIcon from "@mui/icons-material/Summarize";
import styled from "styled-components";
const ReadingMenu = ({
  x,
  y,
  selectedText,
  onClose,
  setExplainText,
  setSummaryText,
}) => {
  if (!selectedText) return null;

  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleExplainButtonClicked = async () => {
    try {
      onClose();
      const respond = await explainBook(selectedText);
      setExplainText(respond);
    } catch (error) {
      console.log("Error fetching text", error);
    }
  };
  const handleSummaryButtonClicked = async () => {
    try {
      onClose();
      const respond = await summaryBook(selectedText);
      setSummaryText(respond);
    } catch (error) {
      console.log("Error fetching text", error);
    }
  };

  const handleTextToSpeechButtonClicked = async () => {
    try {
      onClose();
      console.log("Selected text:", selectedText);
      const url = await getAudio(selectedText);
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

  return (
    <div style={{ ...styles.container, left: `${x}px`, top: `${y}px` }}>
      <StyledWrapper onClick={handleTextToSpeechButtonClicked}>
        <VolumeUpIcon
          style={{ color: "#fff", width: "16px", height: "16px" }}
        />
        Text to speech
      </StyledWrapper>

      <StyledWrapper onClick={handleExplainButtonClicked}>
        <InfoOutlinedIcon
          style={{ color: "#fff", width: "16px", height: "16px" }}
        />
        Explain the text
      </StyledWrapper>
      <StyledWrapper onClick={handleSummaryButtonClicked}>
        <SummarizeIcon
          style={{ color: "#fff", width: "16px", height: "16px" }}
        />
        Summary the text
      </StyledWrapper>
    </div>
  );
};

export default ReadingMenu;
const styles = {
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",

    width: "136px",
    height: "104px",
    backgroundColor: "#fff",
    border: "2px solid #c8a17a",
    padding: "8px",
    borderRadius: "5px",
    zIndex: 99999,
    whiteSpace: "nowrap",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
    gap: "5px",
  },
};

const StyledWrapper = styled.div`
  cursor: pointer;
  background-color: #c8a17a;
  border: none;
  display: flex;
  align-items: center;
  line-height: 1;
  justify-content: flex-start;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 128px;
  height: 32px;
  gap: 8px;
  padding-left: 8px;
  text-align: left;
  border-radius: 5px;

  &:hover {
    background-color: #b28966;
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
