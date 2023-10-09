const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err, success: false });
      return;
    }

    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
        success: false
      });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
          success: false
        });
        return;
      }

      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
          success: false
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
