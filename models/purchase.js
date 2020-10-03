const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    purchaser: String,
    date: String,
    totPaied: String,
    seller: String,
    artist: String,
    adress: {},
  },
  { timestamps: true }
);

const Purchase = new mongoose.model("Purchases", purchaseSchema);

module.exports = Purchase;
