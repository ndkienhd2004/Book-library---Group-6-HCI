const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const token =
    req.headers["authorization"]?.replace("Bearer ", "") || req.body.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyToken };
