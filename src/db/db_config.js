const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

mongoose.connect(URI);

const conn = mongoose.connection;

module.exports = conn;
