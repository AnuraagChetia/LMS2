const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userId = jwt.verify(token, process.env.AUTH_KEY).id;
    const user = await User.findOne({ _id: userId });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = authenticate;
