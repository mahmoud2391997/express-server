// product.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
  },
  orderDate: { type: Date, default: Date.now },
  customerId: {
    type: mongoose.ObjectId,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Orders", orderSchema, "Orders");

module.exports = Order;
