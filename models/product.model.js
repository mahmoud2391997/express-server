// product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  categoryId: {
    type: mongoose.ObjectId,
    required: true,
  },
  status: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;
