import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetail/BookDetail";
import { useMutation } from "@tanstack/react-query";
import { getBookById, updateProgress } from "../../apis/book";
import { useEffect, useRef, useState } from "react";
import SupportReadingTools from "../../components/SupportReadingTools/SupportReadingTools";
import ReadingTimer from "../../components/ReadingTimer/ReadingTimer";
import { Alert, Snackbar, Stack } from "@mui/material";
import Loading from "../../components/Loading/Loading";

const ReadingPage = () => {
  const { bookid } = useParams();
  const [book, setBook] = useState(null);
  const [bookMetadata, setBookMetadata] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [explainText, setExplainText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const readingTimeRef = useRef(0);
  const pageNumberRef = useRef(0);
  const [darkMode, setDarkMode] = useState(false);
  const _id = useRef("");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "stretch",
      gap: "3rem",
      padding: "2vh 5vw",
      backgroundColor: darkMode ? "#1a1a1a" : "#f8f8f8",
      color: darkMode ? "#ffffff" : "#000000",
      minHeight: "100vh",
    },
    sidePanel: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      gap: "1rem",
    },
    toggleButton: {
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      border: "none",
      backgroundColor: darkMode ? "#424242" : "#e0e0e0",
      color: darkMode ? "white" : "black",
      cursor: "pointer",
    },
  };

  const sendProgressUpdate = async () => {
    if (_id && readingTimeRef.current > 0 && pageNumberRef.current > 0) {
      try {
        await updateProgress({
          bookID: _id,
          readingTime: readingTimeRef.current,
          pageNumber: pageNumberRef.current,
        });
        console.log("Progress updated successfully");
      } catch (err) {
        console.error("Lỗi khi cập nhật tiến độ:", err);
      }
    }
  };

  const sendProgressBeacon = () => {
    if (_id && readingTimeRef.current > 0) {
      const data = new FormData();
      data.append("book_id", _id);
      data.append("reading_time", readingTimeRef.current);
      data.append("last_read_page", pageNumberRef.current);

      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL}/book/update-progress`,
        data
      );
    }
  };

  useEffect(() => {
    if (!bookid) {
      return;
    }
    const getBook = async () => {
      try {
        const data = await getBookById(bookid);
        setBookMetadata(data.metadata);
        setBook(data.fileUrl);
        _id.current = data.metadata._id;
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, [bookid]);

  useEffect(() => {
    readingTimeRef.current = readingTime;
    pageNumberRef.current = pageNumber;
  }, [readingTime, pageNumber]);

  // Lưu tiến độ định kỳ mỗi 15 giây
  useEffect(() => {
    const interval = setInterval(sendProgressUpdate, 15000);
    return () => clearInterval(interval);
  }, [bookid]);

  useEffect(() => {
    sendProgressUpdate();
  }, [pageNumber]);
  // Xử lý khi người dùng rời trang
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      sendProgressBeacon();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookid]);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.container}>
          {book ? (
            <>
              <div style={styles.sidePanel}>
                <ReadingTimer
                  setReadingTime={setReadingTime}
                  readingTime={readingTime}
                  darkMode={darkMode}
                />
                <button
                  style={styles.toggleButton}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>

              <div>
                <BookDetails
                  book={book}
                  setExplainText={setExplainText}
                  setSummaryText={setSummaryText}
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  setLoading={setLoading}
                  darkMode={darkMode}
                />
              </div>

              <div>
                <SupportReadingTools
                  explainText={explainText}
                  summaryText={summaryText}
                  darkMode={darkMode}
                />
              </div>
            </>
          ) : (
            <p>Loading book details...</p>
          )}
        </div>
      </div>
      <Snackbar
        open={!!isLoading}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          left: "2vw",
          bottom: "2vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Alert
          severity="info"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: darkMode ? "#fff" : "#000",
            backgroundColor: darkMode ? "#424242" : "#e3f2fd",
            minHeight: "32px",
            minWidth: "80px",
            textAlign: "center",
            padding: "8px 16px",
          }}
          icon={false}
        >
          <Loading size={16} />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginLeft: "1vw",
              color: darkMode ? "white" : "black",
              fontSize: 16,
            }}
          >
            Loading ...
          </span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReadingPage;
