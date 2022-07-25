const express = require("express");
const orderRoute = express.Router();
const userAuth = require("../middleware/auth");
const OrderModel = require("../models/Order");
const cartOrder = require("../models/cartOrder");
const item = require("../models/item");

orderRoute.post("/order", userAuth, async (req, res) => {
  const order = new OrderModel({
    ...req.body,
    user_id: req.user._id,
    price: req.body.quantity * 100,
  });
  try {
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

orderRoute.get("/myorders", userAuth, async (req, res) => {
  try {
    await req.user.populate({
      path: "myorders",
      populate: {
        path: "item_id",
      },
    });
    res.status(200).send(req.user.myorders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

orderRoute.post("/cartOrder", userAuth, async (req, res) => {
  const cart = new cartOrder({
    ...req.body,
    user_id: req.user._id,
  });

  try {
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

orderRoute.get("/cart", userAuth, async (req, res) => {
  try {
    await req.user.populate({
      path: "mycartOrder",
      populate: {
        path: "items.item_id store_id",
      },
      // populate: {
      //   path:"store_id",
      // },
    });
    res.status(200).send(req.user.mycartOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = orderRoute;
