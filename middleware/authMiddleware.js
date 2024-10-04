const jwt = require('jsonwebtoken');
require("dotenv").config()

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
      console.log("Auth Middleware Triggered"); 
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Authentication required" });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); 
  
        if (requiredRole && decoded.role !== requiredRole) {
          console.log("Access denied for role:", decoded.role);
          return res.status(403).json({ message: "Access denied" });
        }
  
        req.user = decoded;
        next();
      } catch (error) {
        console.log("Invalid token");
        return res.status(401).json({ message: "Invalid token" });
      }
    };
  };
  
module.exports = authMiddleware;
