const express = require("express");
const { main } = require("./models/Index");
const productRoute = require("./router/product-routes");
const storeRoute = require("./router/store-routes");
const purchaseRoute = require("./router/purchase-routes");
const salesRoute = require("./router/sales-routes");
const cors = require("cors");
const User = require("./models/User");
const Product = require("./models/Product");

const bcrypt = require("bcryptjs");

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  // console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API

// hash the password

app.post("/api/register", (req, res) => {
  // const saltRound = 10;
  // const hash_password = await bcrypt.hash(req.body.password,saltRound)
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});

app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: "6429979b2e5434138eda1564" });
  res.json(result);
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
