const express = require("express");
const router = express.Router();
const { getCustomers } = require("../controllers/customer.controller");
router.get("/", getCustomers);
module.exports = router;
