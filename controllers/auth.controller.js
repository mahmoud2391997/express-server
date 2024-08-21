const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

function getToken(email, password) {
  const user = {
    email: email,
    role: "user",
  };
  const token = jwt.sign({ user }, password, { expiresIn: "1h" });
  console.log(token);
  return token;
}
async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

// Sample user data

// Secret key to sign the token (keep this secure and secret)

// Create a JWT token with an expiration time of 1 hour

async function profilesConnection() {
  const client = new MongoClient(
    "mongodb+srv://Cluster44370:dXB7e1pKbFVH@cluster44370.a6jdq.mongodb.net/"
  );
  await client.connect();
  const db = client.db("E-commerce");
  const collection = db.collection("Profiles");
  return collection;
}
const checkAuth = async (req, res) => {
  const collection = await profilesConnection();
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailCheck = await collection.findOne({ email: email });
    if (emailCheck) {
      if (bcrypt.compare(password, emailCheck.password)) {
        res.json({
          success: true,
          message: "Authentication successful",
          token: getToken(email, password),
        });
      } else {
        res.json({
          success: false,
          message: "Wrong password",
        });
      }
    } else {
      res.json({
        success: false,
        message: "No profile with the entered email ",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const checkRegisteration = async (req, res) => {
  const collection = await profilesConnection();
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailCheck = await collection.findOne({ email: email });
    if (!emailCheck) {
      await collection.insertOne({
        email: email,
        password: await hashPassword(password),
      });

      res.json({
        success: true,
        message: "Registeration successful",
        token: getToken(email, password),
      });
    } else {
      res.json({
        success: false,
        message: "the entered email is already used",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const checkAuthroize = async (req, res) => {
  token = req.body.token;
  secret = req.body.secret;
  const user = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      // Token is invalid
      console.error("Invalid token");
    } else {
      // Token is valid
      ({ email, role } = decoded.user);
      res.json({
        email: email,
        role: role,
      });
    }
  });
};
// const getProduct = async (req, res) => {
//   const collection = await productsConnection();
//   const Id = req.params.id;

//   try {
//     const product = await collection.findOne({
//       _id: new ObjectId(Id),
//     });

//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const createProduct = async (req, res) => {
//   const collection = await productsConnection();

//   const product = req.body;
//   try {
//     const addedProduct = await collection.insertOne(product);

//     res.json(addedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const deleteProduct = async (req, res) => {
//   const collection = await productsConnection();
//   const Id = req.params.id;
//   console.log(Id);

//   try {
//     const deleteProduct = await collection.deleteOne({
//       _id: new ObjectId(Id),
//     });

//     res.json(deleteProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const updateProduct = async (req, res) => {
//   const collection = await productsConnection();

//   let product = req.body;
//   const Id = req.params.id;

//   try {
//     const editedProduct = await collection.updateOne(
//       { _id: new ObjectId(Id) },
//       { $set: product },
//       { upsert: false }
//     );

//     res.json(editedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  checkAuth,
  checkRegisteration,
  checkAuthroize,
};
