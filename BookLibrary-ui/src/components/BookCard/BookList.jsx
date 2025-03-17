import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

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

const BookList = ({ books }) => {
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
