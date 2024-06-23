const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is required!";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email does not exist!";

  const resetCode = Math.floor(10000 + Math.random() * 90000); //How to generate random 5 digit numbers

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your reset code is " + resetCode,
    "Your reset code is " + resetCode,
    "Reset your password - Expense tracker PRO!"
  );

  res.status(200).json({
    status: "success",
    message: "reset code sent to email",
  });
};

module.exports = forgotPassword;
