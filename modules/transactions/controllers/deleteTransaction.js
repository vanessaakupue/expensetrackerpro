const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid Id";

  const getTransactions = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "Transaction not found";

  if (getTransactions.transaction_type === "income") {
    // income logic
    await usersModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    // expense logic
    await usersModel.updateOne(
      {
        _id: getTransactions.user_id,
      },
      {
        $inc: {
          balance: getTransactions.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionsModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "success",
    message: "transaction deleted successfully",
  });
};

module.exports = deleteTransaction;
