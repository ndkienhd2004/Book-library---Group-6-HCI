const express = require("express");
const route = express.Router();
const BookController = require("../app/controllers/book");
const { upload } = require("../app/middlewares/multer");

route.post("/upload", upload.single("book"), BookController.uploadBook);
route.post("/explain", BookController.explainText);
route.post("/summary", BookController.summaryBook);
route.post("/update-progress", BookController.updateProgress);
route.get("/:book_id", BookController.getBook);

module.exports = route;
