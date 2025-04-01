import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetail/BookDetail";
import { useMutation } from "@tanstack/react-query";
import { getBookById, updateProgress } from "../../apis/book";
import { useEffect, useRef, useState } from "react";
import SupportReadingTools from "../../components/SupportReadingTools/SupportReadingTools";
import ReadingTimer from "../../components/ReadingTimer/ReadingTimer";

const ReadingPage = () => {
  const { bookid } = useParams();
  const [book, setBook] = useState(null);
  const [bookMetadata, setBookMetadata] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [summaryText, setSummaryText] = useState("");
  const [explainText, setExplainText] = useState("");
  const [numPages, setNumPages] = useState(0);
  const readingTimeRef = useRef(0);
  const numPagesRef = useRef(0);
  const _id = useRef("");
  const mutation = useMutation({
    mutationFn: getBookById,
    onSuccess: (data) => {
      setBookMetadata(data.metadata);
      setBook(data.fileUrl);
      _id.current = data.metadata._id;
    },
    onError: (error) => {
      console.error("Lỗi khi lấy sách:", error);
    },
  });
  const sendProgressUpdate = async () => {
    if (_id && readingTimeRef.current > 0 && numPagesRef.current > 0) {
      try {
        await updateProgress({
          bookID: _id,
          readingTime: readingTimeRef.current,
          numPages: numPagesRef.current,
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
      data.append("last_read_page", numPagesRef.current);

      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL}/book/update-progress`,
        data
      );
    }
  };

  useEffect(() => {
    if (bookid) {
      mutation.mutate(bookid);
    }
  }, [bookid]);

  useEffect(() => {
    readingTimeRef.current = readingTime;
    numPagesRef.current = numPages;
  }, [readingTime, numPages]);

  // Lưu tiến độ định kỳ mỗi 15 giây
  useEffect(() => {
    const interval = setInterval(sendProgressUpdate, 15000);
    return () => clearInterval(interval);
  }, [bookid]);

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
    <div style={styles.container}>
      <ReadingTimer setReadingTime={setReadingTime} readingTime={readingTime} />
      <BookDetails
        book={book}
        setExplainText={setExplainText}
        setSummaryText={setSummaryText}
        setNumPages={setNumPages}
        numPages={numPages}
      />
      <SupportReadingTools
        explainText={explainText}
        summaryText={summaryText}
      />
    </div>
  );
};

export default ReadingPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "3%",
    width: "100%",
  },
};
