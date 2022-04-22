const mongoose = require("mongoose");
const validator = require("validator");
const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("reviewModel", reviewSchema);
