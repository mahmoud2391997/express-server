const Profile = require("../models/profile.model");
const ObjectId = require("mongodb").ObjectId;

const getProfiles = async (req, res) => {
  try {
    const profilesArr = await Profile.find({});

    res.json(profilesArr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getProfile = async (req, res) => {
  email = req.params.email;
  try {
    const profile = await Profile.findOne({ email: email });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editProfile = async (req, res) => {
  const Id = req.params.id;
  const editedProfile = req.body;
  console.log(editedProfile);

  try {
    const profile = await Profile.updateOne(
      { _id: new ObjectId(Id) },
      { $set: editedProfile },
      { upsert: false }
    );

    res.json(editedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteProfile = async (req, res) => {
  const Id = req.params.id;
  console.log(Id);

  try {
    const deleteProfile = await Profile.deleteOne({
      _id: new ObjectId(Id),
    });

    res.json(deleteProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProfiles, editProfile, deleteProfile, getProfile };
