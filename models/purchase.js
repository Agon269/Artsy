const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  purchaser: {
    type: String,
    minlength: 5,
  },
  date: String,
  time: String,
  paymentInfo: {},
  seller: String,
});

const Purchase = new mongoose.model("Purchases", purchaseSchema);

module.exports = Purchase;
