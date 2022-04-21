const jwt = require("jsonwebtoken");
const Store = require("../models/store");

const storeAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "SECRET");
    const store = await Store.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!store) {
        
      console.log(store)
      throw new Error();
    }

    req.token = token;
    req.store = store;
    next();
  } catch (error) {
    res.status(400).send({
      msg: "Store need to get authenticated",
    });
  }
};

module.exports = storeAuth;
