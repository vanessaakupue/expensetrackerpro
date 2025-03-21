const express = require("express");

const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransaction");
const editTransaction = require("./controllers/editTransaction");

const transactionsRoutes = express.Router();

// Routes
transactionsRoutes.use(auth);

// Protected routes
transactionsRoutes.post("/addincome", addIncome);
transactionsRoutes.post("/addexpense", addExpense);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/", editTransaction);

module.exports = transactionsRoutes;
