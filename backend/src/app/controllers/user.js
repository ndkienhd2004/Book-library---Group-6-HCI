const Book = require("../models/book");
const User = require("../models/user");

class UserController {
  async updateInformation(req, res) {
    try {
      const new_user_information = req.body;
      const user = await User.findByIdAndUpdate(
        req.user_id,
        new_user_information,
        { new: true }
      );
      res.send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getInformation(req, res) {
    try {
      const user = await User.findById(req.user_id);
      res.send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getLibrary(req, res) {
    const { author, title } = req.body;

    try {
      const query = { owner: req.user_id };
      if (author) {
        query.author = { $regex: author, $options: "i" };
      }

      if (title) {
        query.title = { $regex: title, $options: "i" };
      }

      const my_books = await Book.find(query).sort({ uploaded_date: -1 });

      res.send(my_books);
    } catch (error) {
      res.status(500).send({ message: "Error fetching books", error });
    }
  }
}

module.exports = new UserController();
