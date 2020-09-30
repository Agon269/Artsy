const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
  },
  description: {
    type: String,
    minlength: 100,
  },
  img1: String,
  img2: String,
  img3: String,
  Adress: {},
  contact: {},
  owner: String,
  orders: [],
});

const Service = new mongoose.model("Services", serviceSchema);

module.exports = Service;
