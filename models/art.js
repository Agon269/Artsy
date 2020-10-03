const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
  },
  description: {
    type: String,
    minlength: 50,
  },
  img1: String,
  img2: String,
  img3: String,
  Adress: {},
  artist: String,
  owner: String,
  price: String,
});

const Art = new mongoose.model("Arts", artSchema);

module.exports = Art;
