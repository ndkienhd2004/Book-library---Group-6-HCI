import { useEffect, useState } from "react";

const ReadingTimer = ({ setReadingTime, readingTime, darkMode }) => {
  const [isActive, setIsActive] = useState(true);

  // Move styles inside component and make them dynamic
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "40%",
      color: darkMode ? "#ffffff" : "#000000",
      width: "30vw",
    },
    text: {
      margin: "0.5rem 0",
      color: "inherit", // Inherit from container
    },
  };

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setReadingTime((prev) => prev + 1);
      }, 1000);
    }

    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Time spent reading</h1>
      <h2 style={styles.text}>{formatTime(readingTime)}</h2>
    </div>
  );
};

export default ReadingTimer;
