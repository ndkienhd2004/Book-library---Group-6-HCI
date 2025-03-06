import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import bookcardex from "../../assets/images/bookcardex.jpg";
import { getLibrary } from "../../apis/book";

/**
 * @typedef {Object} Book
 * @property {string} _id
 * @property {string} filename
 * @property {string} name
 * @property {string} owner
 * @property {string} author
 * @property {string} summary
 * @property {string} title
 * @property {number} nums_page
 * @property {Date} uploaded_date
 * @property {Date} last_read_date
 * @property {number} last_read_page
 */

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const book = await getLibrary("");
        setBooks(book);
        console.log(book);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div style={styles.booklist}>
      {books.length > 0 ? (
        books.map((book) => <BookCard key={book._id} book={book} />)
      ) : (
        <p>No book in Library</p>
      )}
    </div>
  );
};

export default BookList;

const styles = {
  booklist: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "20px",
    justifyContent: "center",
    margin: "20px",
    borderRadius: "20px",
  },
};
