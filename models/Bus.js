const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
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
  time: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
