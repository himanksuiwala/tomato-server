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

itemRoute.delete("/item/:id", storeAuth, async (req, res) => {
  try {
    const items = await item.findOneAndDelete({
      _id: req.params.id,
      store_id: req.store._id,
    });
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

itemRoute.put("/item/:id", storeAuth, async (req, res) => {
  const updatedItem = { ...req.body };

  try {
    await item.findOneAndUpdate({ _id: req.params.id }, updatedItem);
    res.status(200).send("Item Updated");
  } catch (error) {
    res.status(400).send(error);
  }
});

itemRoute.get("/storeMenu/:storeId", async (req, res) => {
  try {
    const data = await item.find({ store_id: req.params.storeId });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
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
