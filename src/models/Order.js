const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemModel",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price:{
    type:Number,
    default:0
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("OrderModel", orderSchema);
