const mongoose = require("mongoose");
const validator = require("validator");
// const { validate } = require("");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
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
        throw new Error("Email is invalid");
      }
    },
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
  addresses: [
    {
      address: {
        type: String,
      },
    },
  ],
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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
userSchema.virtual("mycartOrder", {
  ref: "cartModel",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.virtual("myorders", {
  ref: "OrderModel",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.virtual("myreview", {
  ref: "reviewModel",
  localField: "_id",
  foreignField: "user_id",
});

// userSchema.virtual("myorder",{
//   ref:"orderModel",
//   localField:"_id",
//   foreignField:"user_id",
// })

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    "SECRET"
  );

  user.tokens = user.tokens.concat({
    token,
  });
  await user.save();

  return token;
};

module.exports = mongoose.model("userModel", userSchema);
