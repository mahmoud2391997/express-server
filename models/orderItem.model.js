// product.js

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },

  orderId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const OrderItem = mongoose.model("OrderItems", orderItemSchema, "OrderItems");

module.exports = OrderItem;
