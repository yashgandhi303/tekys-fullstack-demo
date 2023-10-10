const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err, success: false });
      return;
    }

    res.status(200).send({
      message: "User was registered successfully!",
      success: true
    });
  });
};

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err, success: false });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found.", success: false });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
          success: false,
        });
      }

      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });


      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        success: true
      });
    });
};

const getAllUsers = async (req, res, next) => {
  // Find the user by userId in your database
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  signin,
  signup,
  getAllUsers,
};
