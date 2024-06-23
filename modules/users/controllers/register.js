const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  // validations...
  if (!name) throw "Name is required";
  if (!email) throw "Email is required!";
  if (!password) throw "Password is required";
  if (password.length < 5) throw "password must be more than 5 characters";
  if (password !== confirm_password)
    throw "password and confirmed password does not match";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Hello from expense tracker PRO! Welcome! Hope you love us!",
    "<h1>Hello from expense tracker PRO!</h1> Welcome! Hope you love us!",
    "Welcome to expense tracker pro!"
  );

  res.status(201).json({
    status: "user registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
