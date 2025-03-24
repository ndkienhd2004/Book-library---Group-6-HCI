import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
 * @property {number}
 * @property {string} book_type

 */
const PreviewCard = ({ book, open, handleClose }) => {
  if (!book) return null;
  const navigate = useNavigate();
  const handleReadBook = () => {
    navigate(`/books/${book.filename}`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="book-title"
      aria-describedby="book-description"
    >
      <Box sx={styles.container}>
        {/* Phần trên (60%) */}
        <Box sx={styles.topSection}>
          <Box sx={styles.leftOutline}>
            <img src={book.image} alt={book.title} style={styles.image} />
          </Box>
          <Box sx={styles.rightOutLine}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              {book.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              Author: {book.author}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              Format: {book.nums_page} pages, {book.book_type}
            </Typography>
          </Box>
        </Box>

        {/* Phần dưới (40%) */}
        <Box sx={styles.bottomSection}>
          <Box sx={styles.descriptionContainer}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mt: 2, color: "black" }}
            >
              Description
            </Typography>
            <Typography variant="body1" sx={{ color: "black" }}>
              {book.summary?.trim()
                ? book.summary
                : "There is no description for this book"}
            </Typography>
          </Box>
          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ mt: 3, ml: 2, backgroundColor: "#cba580" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReadBook}
              sx={{ mt: 3, ml: 2, backgroundColor: "#cba580" }}
            >
              Read
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewCard;

const styles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 500,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    boxShadow: 24,
    borderRadius: "8px",
    overflow: "hidden",
  },
  topSection: {
    display: "flex",
    flex: 3,
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
  },
  leftOutline: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRight: "1px solid #ddd",
  },
  rightOutLine: {
    width: "60%",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    maxWidth: "200px",
    maxHeight: "300px",
    borderRadius: "5px",
  },
  bottomSection: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Đẩy phần mô tả lên và nút xuống
    alignItems: "center",
    overflowX: "hidden",
  },
  descriptionContainer: {
    width: "100%",
    textAlign: "left",
    paddingLeft: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: "10px",
  },
};
