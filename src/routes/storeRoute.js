const express = require("express");
const storeRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const storeModel = require("../models/store");
const storeAuth = require("../middleware/store_auth");
const store = require("../models/store");

storeRoute.get("/store/about", storeAuth, async (req, res) => {
  try {
    res.status(200).send(req.store);
  } catch (error) {
    res.send({ msg: error });
  }
});

storeRoute.post("/store/login", async (req, res) => {
  const loginEmail = req.body.email;
  const loginPass = req.body.password;

  const checkforUser = await store.findOne({ email: loginEmail });

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
    res.status(201).send({ msg: "HURRAH!", checkforUser, token });
  } catch (error) {
    res.status(401).send({ msg: error });
  }
});

storeRoute.post("/store", async (req, res) => {
  const storeEmail = req.body.email;
  // const checkforExisiting = await store.findOne({ email: storeEmail });

  
  const store = new storeModel({
    ...req.body,
  });
    // const checkforExisiting = await store.findOne({ email: req.body.email });

  // if (checkforExisiting) {
  //   throw new Error("User Already exists!");
  // }
  store.password = bcrypt.hashSync(store.password, 10);
  const token = await store.generateAuthToken();

  try {
    res.status(201).send({ store, token });
  } catch (error) {
    res.status(401).send({ msg: error });
  }
});

storeRoute.post("/store/logout", storeAuth, async (req, res) => {
  try {
    req.store.tokens = req.store.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.store.save();
    console.log(req.store.tokens);
    res.status(200).send("Youve bee");
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = storeRoute;
