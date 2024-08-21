// profile.js

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
});

const Profile = mongoose.model("Profiles", profileSchema, "Profiles");

module.exports = Profile;
