const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  const { transaction_id, remarks } = req.body;

  if (!transaction_id) throw "Transaction id is required";

  // if (transaction_type !== "income" && transaction_type !== "expense")
  //   throw "transaction type must be income or expense";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid Id";

  const getTransactions = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransactions) throw "Transaction not found";

  await transactionsModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      // transaction_type,
      // amount,  //do the sum of these ones by yourself
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Transaction edited",
  });
};

module.exports = editTransaction;
