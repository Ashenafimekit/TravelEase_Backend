const jwt = require("jsonwebtoken");
require("dotenv").config()

const authenticateUser = (req, res, next) => {
  // Get the token from Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Please Login" });
  }

  //console.log("Auth Header:", authHeader); 
  const token = authHeader.replace("Bearer ", ""); 
  //console.log("Extracted Token:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to req.user
    next(); 
  } catch (err) {
    console.error("Token verification error:", err); 
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = authenticateUser;
