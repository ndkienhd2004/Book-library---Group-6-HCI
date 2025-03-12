import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetail/BookDetail";
import { useMutation } from "@tanstack/react-query";
import { getBookById } from "../../apis/book";
import { useEffect, useState } from "react";

const ReadingPage = () => {
  const { bookid } = useParams();
  const [book, setBook] = useState(null);
  const mutation = useMutation({
    mutationFn: getBookById,
    onSuccess: (data) => {
      setBook(data);
      console.log(data);
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
    <div>
      <BookDetails book={book} />
    </div>
  );
};

export default ReadingPage;
