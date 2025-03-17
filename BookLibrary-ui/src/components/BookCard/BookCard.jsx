import React, { useState } from "react";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import PreviewCard from "./PreviewCard";
import { getBookImage } from "../../apis/book";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleDetailButtonClicked = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchBookImage = async () => {
    try {
      const bookImage = await getBookImage(book.cover_image);
      return bookImage;
    } catch (error) {
      console.error("Error fetching book image:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, backgroundImage: `url(${book.image})` }}>
        <div style={styles.content}>
          <div style={styles.genre}>{book.genre}</div>
          <div style={{ marginBottom: "15px" }}>
            <h3 style={styles.title}>"{book.title}"</h3>
            <span style={{ color: "black", fontSize: "14px", marginTop: 0 }}>
              By {book.author}
            </span>
          </div>
          <button
            className="bookCardButton-with-icon"
            onClick={handleDetailButtonClicked}
          >
            <svg
              className="icon"
              id="Play"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
              ></path>
            </svg>
            <span className="text">Detail</span>
          </button>
        </div>
      </div>
      <PreviewCard book={book} open={open} handleClose={handleClose} />
    </div>
  );
};

export default BookCard;

const styles = {
  container: {
    width: "300px",
    height: "420px",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
  },
  card: {
    width: "270px",
    height: "400px",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
    margin: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    justifyContent: "center",
    backgroundSize: "100% 100%",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    minHeight: "45%",
    backgroundColor: "rgb(232,222,213, 0.6)",
    backdropFilter: "blur(5px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
    margin: "0",
  },
  genre: {
    top: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    alignSelf: "flex-start",
    marginBottom: "5px",
  },
};
