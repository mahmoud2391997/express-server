const Category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const categoriesArr = await Category.find({});

    res.json(categoriesArr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getCategories };
