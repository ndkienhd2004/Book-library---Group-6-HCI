const express = require("express");
const route = express.Router();
const BookController = require("../app/controllers/book");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "book"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

route.post("/upload", upload.single("book"), BookController.uploadBook);
route.post("/explain", BookController.explainText);
route.post("/summary", BookController.summaryBook);
route.post("/update-progress", BookController.updateProgress);

module.exports = route;
