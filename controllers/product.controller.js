const Product = require("../models/product.model");
const Category = require("../models/category.model");
const ObjectId = require("mongodb").ObjectId;

const getProducts = async (req, res) => {
  try {
    const productsArr = await Product.find({});

    res.json(productsArr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  const Id = req.params.id;

  try {
    const product = await Product.findOne({
      _id: new ObjectId(Id),
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createProduct = async (req, res) => {
  const product = req.body;
  console.log(product);

  try {
    const category = await Category.findOne({ categoryName: product.category });
    console.log(category);

    if (category) {
      await Product.create({ ...product, categoryId: category._id });
    } else {
      const createdCategory = await Category.create({
        categoryName: product.category,
      });
      await Product.create({
        ...product,
        categoryId: createdCategory._id,
      });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const Id = req.params.id;
  console.log(Id);

  try {
    const deleteProduct = await Product.deleteOne({
      _id: new ObjectId(Id),
    });

    res.json(deleteProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateProduct = async (req, res) => {
  let product = req.body;
  const Id = req.params.id;

  try {
    const editedProduct = await Product.updateOne(
      { _id: new ObjectId(Id) },
      { $set: product },
      { upsert: false }
    );

    res.json(editedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
