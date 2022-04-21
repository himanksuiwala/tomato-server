const express = require("express");
const itemRoute = express.Router();
const itemModel = require("../models/item");
const store = require("../models/store");
const storeAuth = require("../middleware/store_auth");
const item = require("../models/item");

itemRoute.post("/item/add", storeAuth, async (req, res) => {
  const item = new itemModel({
    ...req.body,
    store_id: req.store._id,
  });

  try {
    await item.save();
    res.status(200).send({ item });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

itemRoute.get("/items", storeAuth, async (req, res) => {
  try {
    await req.store.populate("menu");
    res.status(200).send(req.store.menu);
  } catch (error) {
    res.status(400).send(error);
  }
});

itemRoute.get("/item/:id", storeAuth, async (req, res) => {
  const item_id = req.params.id;

  try {
    const items = await item.findOne({ item_id });
    res.send("HELLO");
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = itemRoute;
