const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderer: {
    type: String,
    minlength: 5,
  },
  Adress: {},
  contact: {},
  date: String,
  time: String,
  paymentInfo: {},
  servicer: String,
});

const Order = new mongoose.model("Orders", orderSchema);

module.exports = Order;
