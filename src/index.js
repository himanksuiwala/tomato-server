const express = require("express");
var cors = require("cors");
const store = require("./routes/storeRoute");
const user = require("./routes/userRoute");
const item = require("./routes/itemRoute");
const review = require("./routes/reviewRoute");
const conn = require("./db/db_config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(store);
app.use(user);
app.use(item);
app.use(review);

const PORT = 3000;

conn.on("open", () => {
  console.log("Connection Established with DB");
});

app.listen(PORT, () => {
  console.log("SERVER is Listenring");
});
