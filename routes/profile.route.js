const express = require("express");
const router = express.Router();
const {
  getProfile,
  getProfiles,
  editProfile,
  deleteProfile,
} = require("../controllers/profile.controller");
router.get("/", getProfiles);
router.get("/:email", getProfile);
router.put("/:id", editProfile);
router.delete("/:id", deleteProfile);
module.exports = router;
