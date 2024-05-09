const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
    default: [],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
