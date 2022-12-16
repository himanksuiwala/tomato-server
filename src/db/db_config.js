const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URI);

const conn = mongoose.connection;

module.exports = conn;
