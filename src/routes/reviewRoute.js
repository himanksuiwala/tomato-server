const express = require("express");
const reviewRoute = express.Router();
const reviewModel = require("../models/Review");
const userAuth = require("../middleware/auth");
const storeAuth = require("../middleware/store_auth");
const review = require("../models/Review");

reviewRoute.post("/review/add/:storeid", userAuth, async (req, res) => {
  const review = new reviewModel({
    ...req.body,
    user_id: req.user._id,
    store_id: req.params.storeid,
  });

  try {
    await review.save();
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

reviewRoute.get("/reviews", storeAuth, async (req, res) => {
  try {
    await req.store.populate("reviews");
    res.status(200).send(req.store.reviews);
  } catch (error) {
    res.status(400).send(error);
  }
});

reviewRoute.get("/myReviews", userAuth, async (req, res) => {
  try {
    await req.user.populate("myreview");
    res.status(200).send(req.user.myreview);
  } catch (error) {
    res.status(400).send(error);
  }
});

reviewRoute.delete("/review/:id", userAuth, async (req, res) => {
  try {
    const reviews = await review.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = reviewRoute;
