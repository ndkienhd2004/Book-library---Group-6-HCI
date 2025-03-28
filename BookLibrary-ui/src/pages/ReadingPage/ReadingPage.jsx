import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetail/BookDetail";
import { useMutation } from "@tanstack/react-query";
import { getBookById } from "../../apis/book";
import { useEffect, useState } from "react";
import SupportReadingTools from "../../components/SupportReadingTools/SupportReadingTools";
import ReadingTimer from "../../components/ReadingTimer/ReadingTimer";

const ReadingPage = () => {
  const { bookid } = useParams();
  const [book, setBook] = useState(null);
  const [summaryText, setSummaryText] = useState("");
  const [explainText, setExplainText] = useState("");

  const mutation = useMutation({
    mutationFn: getBookById,
    onSuccess: (data) => {
      setBook(data);
    },
    onError: (error) => {
      console.error("Lỗi khi lấy sách:", error);
    },
  });

  useEffect(() => {
    if (bookid) {
      mutation.mutate(bookid);
    }
  }, [bookid]);

  return (
    <div style={styles.container}>
      <ReadingTimer />
      <BookDetails
        book={book}
        setExplainText={setExplainText}
        setSummaryText={setSummaryText}
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
    gap: "3%  ",
    width: "100%",
  },
};
