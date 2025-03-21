const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Password incorrect";

  const accessToken = jwtManager(getUser);

  // success
  res.status(200).json({
    status: "success",
    message: "user logged in successfully!",
    accessToken: accessToken,
  });
};

module.exports = login;
