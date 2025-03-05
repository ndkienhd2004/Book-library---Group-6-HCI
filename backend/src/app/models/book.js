const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  author: { type: String },
  summary: { type: String, default: "No summary for this book." },
  title: { type: String },
  nums_page: { type: Number },
  uploaded_date: { type: Date, default: Date.now },
  last_read_date: { type: Date, default: Date.now },
  last_read_page: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", BookSchema);
