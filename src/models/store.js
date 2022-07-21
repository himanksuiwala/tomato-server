const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid!");
      }
    },
  },
  contact: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  store_address: {
    type: String,
    required: true,
  },
  cuisine_type: {
    type: String,
    required: true,
  },
  home_delivery: {
    type: Boolean,
    required: true,
  },
  takeaway_available: {
    type: Boolean,
    required: true,
  },
  seating_available: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't be your Password");
      }
    },
  },
  created: {
    type: Date,
    default: new Date(),
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

storeSchema.methods.toJSON = function () {
  const store = this;
  const storeObject = store.toObject();

  delete storeObject.password;
  delete storeObject.tokens;

  return storeObject;
};

storeSchema.virtual("menu", {
  ref: "itemModel",
  localField: "_id",
  foreignField: "store_id",
});

storeSchema.virtual("reviews", {
  ref: "reviewModel",
  localField: "_id",
  foreignField: "store_id",
});

///////////////////
storeSchema.virtual("mycartOrder", {
  ref: "cartModel",
  localField: "_id",
  foreignField: "store_id",
});

storeSchema.methods.generateAuthToken = async function () {
  const store = this;
  const token = jwt.sign(
    {
      _id: store._id.toString(),
    },
    "SECRET"
  );

  store.tokens = store.tokens.concat({
    token,
  });
  await store.save();

  return token;
};

module.exports = mongoose.model("storeModel", storeSchema);
