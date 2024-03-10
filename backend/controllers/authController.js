const { User } = require("../models");
const config = require("../config/auth");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const { firstName, lastName, email, username, password } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    username,
    password,
  })
    .then((user) => {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.json({message: 'Successfully signed in', success: true, accessToken: token });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        uuid: user.uuid,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
