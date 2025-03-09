const fs = require("fs");
const pdf = require("pdf-parse");
const Book = require("../models/book");
const path = require("path");

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
    console.log(req.file.path);

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(pdfBuffer);
    const content = pdfData.text;
    let summary = "";

    const new_book = await Book.create({
      filename: req.file.filename,
      name: req.file.originalname,
      owner: req.user_id,
      title: req.body.title,
      author: req.body.author,
      summary: summary,
      nums_page: req.body.nums_page,
      uploaded_date: uploaded_date,
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
