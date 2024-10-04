const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "user" },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
