const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
