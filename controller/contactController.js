const Contact = require("../models/contact");

exports.contact = async (req, res) => {
  const { fullName, email, phone, message } = req.body;
  console.log({ fullName, email, phone, message });

  try {
    const comment = new Contact({ fullName, email, phone, message });
    const savedComment = await comment.save();
    console.log("saved comment ",{savedComment})
    return res.status(201).json({message: "submitted"})
  } catch (error) {
    console.error("Server error: ", error);  
    return res.status(500).json({ message: "server error" });
  }
};
