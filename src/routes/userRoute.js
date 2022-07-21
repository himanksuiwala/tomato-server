const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const user = require("../models/user");
const auth = require("../middleware/auth");

userRoute.get("/user/about", auth, async (req, res) => {
  try {
    res.status(202).send(req.user);
  } catch (error) {
    console.log(e);
  }
});

userRoute.put("/user/:id", auth, async (req, res) => {
  const updatedUser = { ...req.body };

  try {
    await user.findOneAndUpdate({ _id: req.params.id }, updatedUser, { new: true });
    res.status(200).send({msg:"User Updated"});
  } catch (error) {
    res.status(400).send(error);
  }
});

userRoute.post("/user", async (req, res) => {
  const user = new userModel({
    ...req.body,
  });

  const address = req.body.address;
  user.addresses = user.addresses.concat({
    address,
  });

  user.password = bcrypt.hashSync(user.password, 10);
  const token = jwt.sign({ _id: user._id.toString() }, "SECRET");
  user.tokens = user.tokens.concat({
    token,
  });

  try {
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(401).send({
      msg: error,
    });
  }
});

userRoute.post("/user/login", async (req, res) => {
  const loginEmail = req.body.email;
  const loginPass = req.body.password;

  const checkforUser = await user.findOne({ email: loginEmail });
  const comparePass = await bcrypt.compare(loginPass, checkforUser.password);
  const token = await jwt.sign({ _id: checkforUser._id.toString() }, "SECRET");
  checkforUser.tokens = checkforUser.tokens.concat({
    token,
  });
  await checkforUser.save();

  try {
    if (!comparePass || !checkforUser) {
      throw new Error();
    }
    res.status(200).send({ checkforUser, token });
  } catch (error) {
    res.status(400).send({ msg: "Please check your Username or Password" });
  }
});

userRoute.get("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("You've been logout");
  } catch (e) {
    rs.status(500).send(e.message);
  }
});

module.exports = userRoute;
