const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
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
    type: Date,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
