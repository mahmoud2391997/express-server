const express = require("express");
const router = express.Router();
const {
  getOrder,
  getOrders,
  updateOrderStatus,
  addOrder,
} = require("../controllers/order.controller");
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrderStatus);
module.exports = router;
