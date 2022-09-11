const mongoose = require("mongoose");

const URI = "mongodb+srv://himank:stepbystep@cluster0.hfux0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(URI);

const conn = mongoose.connection;

module.exports = conn;
