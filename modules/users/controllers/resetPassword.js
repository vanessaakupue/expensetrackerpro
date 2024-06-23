const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required!";
  if (!new_password) throw "Password is required!";
  if (!reset_code) throw "reset code is required!";
  if (new_password.length < 5) throw "password must be more than 5 characters";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your password has been changed! If this was not you please contact us",
    "Your password has been changed! If this was not you please contact us",
    "Password changed!"
  );

  res.status(200).json({
    stauts: "success",
    message: "Password has been reset",
  });
};

module.exports = resetPassword;
