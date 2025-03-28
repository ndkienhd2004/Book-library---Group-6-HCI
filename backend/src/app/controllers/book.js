const fs = require("fs");
const Book = require("../models/book");
const path = require("path");
const poppler = require("pdf-poppler");
const Fuse = require("fuse.js");
const Stream = require("stream");
const openai = require("../../config/openai.config");

class BookController {
  async summaryBook(req, res) {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      console.log(content);
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "developer",
            content:
              "Bạn sẽ tóm tắt đoạn văn bản sau bằng Tiếng Việt. Đoạn tóm tắt trình bày theo gạch đầu dòng. Nhiều nhất là 5 gạch đầu dòng.",
          },
          { role: "user", content: content },
        ],
      });

      const summary =
        response.choices[0]?.message?.content || "Không có kết quả";

      return res.json({ summary });
    } catch (error) {
      console.error("Error streaming response:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
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
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      console.log(content);
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "developer",
            content: "giải thích ngắn gọn đoạn sau bằng tiếng việt.",
          },
          { role: "user", content: content },
        ],
      });

      const explain =
        response.choices[0]?.message?.content || "Không có kết quả";

      return res.json({ explain });
    } catch (error) {
      console.error("Error streaming response:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProgress(req, res) {
    const { book_id, last_read_page, reading_time } = req.body;
    try {
      const curr_book = await Book.findById(book_id);

      await Book.findByIdAndUpdate(
        book_id,
        {
          last_read_date: new Date(),
          last_read_page,
          total_reading_time:
            Number(curr_book.total_reading_time) + Number(reading_time),
        },
        { new: true }
      );
    } catch (error) {
      res.status(400).send(error.message);
    }
    res.send("Progress updated");
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

  async searchingBook(req, res) {
    const { query } = req.body;

    try {
      const books = await Book.find();

      const fuse = new Fuse(books, {
        keys: ["name", "author"],
        includeScore: true,
        threshold: 0.6,
        findAllMatches: true,
        distance: 100,
        minMatchCharLength: 2,
      });

      const results = fuse.search(query);

      res.send(results.slice(0, 20).map((result) => result.item));
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in App/Controllers/BookController/searchingBook",
        error,
      });
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
