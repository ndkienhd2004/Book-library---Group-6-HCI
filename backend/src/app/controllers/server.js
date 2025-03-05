const Book = require("../models/book");

class ServerController {
  async getListBook(req, res) {
    const { author, title } = req.body;
    try {
      const query = {};
      if (author) {
        query.author = { $regex: author, $options: "i" };
      }

      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      const list_books = await Book.find(query).sort({ uploaded_date: -1 });

      res.send(list_books);
    } catch (error) {
      res.status(500).send({ message: "Error fetching books", error });
    }
  }
}

module.exports = new ServerController();
