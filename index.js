const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");
const ordersRoute = require("./routes/order.route");
const customersRoute = require("./routes/customer.route");
const categoriesRoute = require("./routes/category.route");
const mongoose = require("mongoose");

const port = 3000;

app.use(express.json());

app.use(cors());
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/customers", customersRoute);
app.use("/api/categories", categoriesRoute);

app.get("/", (res, req) => {
  res.setEncoding("Hello from Node API server Updated");
});

mongoose
  .connect(
    "mongodb+srv://Cluster44370:dXB7e1pKbFVH@cluster44370.a6jdq.mongodb.net/",
    { dbName: "E-commerce" }
  )
  .then(() => {
    {
      console.log("Connected to database!");

      app.listen(port, () => {
        console.log(`i am on port ${port}`);
      });
    }
  })
  .catch(() => {
    console.log("Connection failed!");
  });
