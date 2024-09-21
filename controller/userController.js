const user = require("../models/user");

exports.register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  console.log("recieved data ", { username, password, confirmPassword });

  if (password.trim() !== confirmPassword.trim()) {
    console.log("password mismatch");
    res.status(201).json({ message: "password doesn't match" });
  }

  try {
    const exitingUser = await user.findOne({ username });
    if (exitingUser) {
      return res.status(201).json({ message: "username already exist" });
    }
    const newUser = new user({ username, password });
    await newUser.save();
    return res.status(201).json({ message: "user successfuly registered" });
  } catch (err) {
    if (!res.headersSent) {
      res.status(201).json({ msg: "Server error" });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  try {
    const checkUser = await user.findOne({ username });
    if (!checkUser) {
      throw new Error("username not found");
    }
    if(password === checkUser.password){
        return res.status(201).json({message : "loged in "})
    } else{
        return res.status(201).json({message: "unable to login"})
    }
  } catch (error) {
    return res.status(201).json({ message: "server error" });
  }
};
