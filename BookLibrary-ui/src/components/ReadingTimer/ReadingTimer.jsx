import { useEffect, useState } from "react";

const ReadingTimer = ({ setReadingTime, readingTime }) => {
  const [isActive, setIsActive] = useState(true);
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
      <h1>Time spent reading</h1>
      <h2>{formatTime(readingTime)}</h2>
    </div>
  );
};
export default ReadingTimer;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    color: "black",
    width: "30vw",
  },
};
