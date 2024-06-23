const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    balance: {
      type: Number,
      required: [true, "balance is required"],
      default: 0,
    },
    reset_code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
