const mongoose = require("mongoose");
const cartOrderSchema = new mongoose.Schema({
  items: [
    {
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: "itemModel" },
      quantity: { type: Number, default: 1 },
    },
  ],
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "storeModel",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  date: {
    type: Date,
    default: new Date(),
  },
  order_total: {
    type: Number,
    default: 0,
  },
  delivery_address: {
    type: String,
    default: "Sector-51,GGn",
  },
  payment_type: {
    type: String,
    default: "Cash",
  },
});

module.exports = mongoose.model("cartModel", cartOrderSchema);
