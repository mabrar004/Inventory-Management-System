const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches the model name
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Ensure this matches the model name
      required: true,
    },
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Ensure this matches the model name
      required: true,
    },
    stockSold: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
    totalSaleAmount: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sales", SaleSchema); // Model name in PascalCase
module.exports = Sales;
