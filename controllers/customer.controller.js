const Customer = require("../models/customer.model");

const getCustomers = async (req, res) => {
  try {
    const customersArr = await Customer.find({});

    res.json(customersArr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getCustomers };
