const fs = require("fs");
const Book = require("../models/book");
const path = require("path");
const poppler = require("pdf-poppler");

class BookController {
  async summaryBook(req, res) {
    const content =
      "Hãy tóm tắt giúp tôi đoạn văn bản sau bằng Tiếng Việt. " +
      "Đoạn tóm tắt trình bày theo gạch đầu dòng" +
      "Nhiều nhất là 5 gạch đầu dòng" +
      req.body.content;

    let summary = "";
    if (content.length > 5000) {
      const pages = Math.ceil(content.length / 5000);
      for (let i = 0; i < pages; i++) {
        const result = await askAI(content.slice(i * 5000, (i + 1) * 5000));
        summary += result.choices[0].message.content;
      }
    } else {
      const result = await askAI(content);
      summary = result.choices[0].message.content;
    }

    res.send(summary);
  }

  async uploadBook(req, res) {
    const uploaded_date = new Date();

    const pdfPath = path.join(
      __dirname,
      "../../public/book/",
      req.file.filename
    );

    const imgDir = path.join(__dirname, "../../public/img");

    const imgFileName = req.file.filename.replace(".pdf", ".png");

    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    await poppler.convert(pdfPath, {
      format: "png",
      out_dir: imgDir,
      out_prefix: imgFileName.replace(".png", ""),
      page: 1,
      scale: 1024,
    });

    const files = fs.readdirSync(imgDir);

    const matchingFile = files.find((file) =>
      file.startsWith(imgFileName.replace(".png", ""))
    );

    const oldPath = path.join(imgDir, matchingFile);
    const newPath = path.join(imgDir, imgFileName);

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }

    const new_book = await Book.create({
      filename: req.file.filename,
      name: req.file.originalname,
      owner: req.user_id,
      title: req.body.title,
      author: req.body.author,
      summary: "",
      nums_page: req.body.nums_page,
      uploaded_date: uploaded_date,
      cover_image: imgFileName,
    });

    res.send({ data: new_book.filename });
  }

  async explainText(req, res) {
    const content =
      "Hãy giải thích giúp tôi đoạn văn sau bằng tiếng Việt: " +
      req.body.content;
    let explain = "";
    if (content.length > 5000) {
      const pages = Math.ceil(content.length / 5000);
      for (let i = 0; i < pages; i++) {
        const result = await askAI(content.slice(i * 5000, (i + 1) * 5000));
        explain += result.choices[0].message.content;
      }
    } else {
      const result = await askAI(content);
      explain = result.choices[0].message.content;
    }
    res.send(explain);
  }

  async updateProgress(req, res) {
    const { book_id, last_read_page } = req.body;
    try {
      await Book.findByIdAndUpdate(
        book_id,
        { last_read_date: new Date(), last_read_page },
        { new: true }
      );
    } catch (error) {
      res.status(400).send(error.message);
    }
    res.send("Update successfully");
  }

  async getUploadedBook(req, res) {
    const { user_id } = req;
    try {
      const list_books = await Book.find({ owner: user_id }).sort({
        uploaded_date: -1,
      });
      res.send(list_books);
    } catch (error) {
      res.status(500).send({ message: "Error fetching books", error });
    }
  }

  async getBook(req, res) {
    const { book_id } = req.params;

    const filePath = path.join(__dirname, "../../public/book", `${book_id}`);

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send("File not found");
      }
    });
  }
}

module.exports = new BookController();
