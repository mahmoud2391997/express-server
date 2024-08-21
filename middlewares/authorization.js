const jwt = require("jsonwebtoken");
async function profilesConnection() {
  const client = new MongoClient(
    "mongodb+srv://Cluster44370:dXB7e1pKbFVH@cluster44370.a6jdq.mongodb.net/"
  );
  await client.connect();
  const db = client.db("E-commerce");
  const collection = db.collection("Profiles");
  return collection;
}
async function getSecretKey(email) {
  const collection = await profilesConnection();
  profile = await collection.find({ email: email });
  return profile.password;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiam9obi4uLmRvZUBleGFtcGxlLmNvbW0iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MjQxMTg3MTUsImV4cCI6MTcyNDEyMjMxNX0.g3BuieXYIy1J65dUMAnDObOTkYnoSuvTUzMDnAJNMlI";
const secret = "12345678";
const decoded = jwt.decode(token);

// Extract email and role from the decoded token
if (decoded) {
  const { email, role } = decoded;
  console.log("Email:", email);
  getSecretKey(email);
  console.log("Role:", role);
} else {
  console.log("Failed to decode the token");
}
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    // Token is invalid
    console.error("Invalid token");
  } else {
    // Token is valid
    const { email, role } = decoded.user;
    console.log("Email:", email);
    console.log("Role:", role);

    // Further actions like DB lookup can be performed here
  }
});
const verifyAuth = async (req, res, next) => {
  token = req.header.authorization;
  const isTokenExpired = (token) => {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  };

  // Example usage
  const expired = isTokenExpired(token);

  if (expired) {
    return res.status(401).json({ message: "token is expired" });
  } else {
    // Token is still valid
    const decoded = jwt.decode(token);

    // Extract email and role from the decoded token
    if (decoded) {
      const { email, role } = decoded;
      console.log("Email:", email);
      secret = await getSecretKey(email);
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          // Token is invalid
          console.error("Invalid token");
        } else {
          // Token is valid
          const { email, role } = decoded.user;
          console.log("Email:", email);
          console.log("Role:", role);
          next();
          // Further actions like DB lookup can be performed here
        }
      });
      console.log("Role:", role);
    } else {
      console.log("Failed to decode the token");
    }
  }
};
module.exports = verifyAuth;
