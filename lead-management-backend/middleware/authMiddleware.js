const jwt = require("jsonwebtoken");
require("dotenv").config()

const protect = (req, res, next) => { // check the routes if the access token available then the user access the routes 
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

const adminOnly = (req, res, next) => { // middleware for get the user role 
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};

module.exports = { protect, adminOnly };
