const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  image: { type: String },
  purchasePrice: { type: Number },
  salesPrice: { type: Number },
  stock: { type: Number },
});

module.exports = mongoose.model("product", productSchema);
