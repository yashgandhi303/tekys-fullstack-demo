const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send({ success: true, message: "Public Content" });
};

exports.userBoard = (req, res) => {
  // Find the user by userId in your database
  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err, success: false });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    // If the user is found, you can send the user data in the response
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).send({ success: true, user: userData });
  });
};