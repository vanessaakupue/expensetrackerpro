require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handler/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors()); //allows api endpoints to be accessed from anywhere ie frontend

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("mongo connection successful");
  })
  .catch(() => {
    console.log("mongo connection failed!");
  });

// models initialization
require("./models/users.model");
require("./models/transactions.model");

app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

// errorHandler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not found",
  });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("server is started");
});
