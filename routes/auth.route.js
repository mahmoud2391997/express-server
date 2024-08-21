const express = require("express");
const router = express.Router();
const {
  checkAuth,
  checkRegisteration,
  checkAuthroize,
} = require("../controllers/auth.controller");
router.post("/login", checkAuth);
router.post("/authorize", checkAuthroize);
router.post("/register", checkRegisteration);

module.exports = router;
