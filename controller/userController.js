const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password.trim() !== confirmPassword.trim()) {
    console.log("password mismatch");
    res.status(400).json({ message: "password doesn't match" });
  }

  try {
    const exitingUser = await user.findOne({ username });
    if (exitingUser) {
      return res.status(400).json({ message: "username already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ username, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "successfuly registered" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ msg: "Server error" });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUser = await user.findOne({ username });
    if (!checkUser) {
      return res.status(400).json({ message: "unable to login" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "unable to login" });
    }

    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      token,
      user: {
        username: checkUser.username,
        role: checkUser.role,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server error" });
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await user.find();
    return res.status(201).json(users);
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json("server error");
  }
};

exports.deleteuser = async (req, res) => {
  const { username, role } = req.body;
  try {
    const deleteUser = await user.findOneAndDelete({ username, role });
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: "user not found or already deleted" });
    } else {
      return res.status(201).json({ message: "successfully Deleted" });
    }
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json("Server Error");
  }
};
