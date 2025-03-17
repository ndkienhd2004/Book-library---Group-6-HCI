const express = require("express");
const route = express.Router();
const BookController = require("../app/controllers/book.js");
const { upload } = require("../app/middlewares/multer.js");
const generateSpeech = require("../services/google-cloud-tts.service.js");

route.post("/upload", upload.single("book"), BookController.uploadBook);
route.post("/explain", BookController.explainText);
route.post("/summary", BookController.summaryBook);
route.post("/update-progress", BookController.updateProgress);
route.get("/:book_id", BookController.getBook);
route.get("/uploaded", BookController.getUploadedBook);
route.post("/tts", generateSpeech);

module.exports = route;
