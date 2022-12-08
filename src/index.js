const express = require("express");
const cors = require("cors");
const store = require("./routes/storeRoute");
const user = require("./routes/userRoute");
const item = require("./routes/itemRoute");
const order = require("./routes/orderRoute");
const review = require("./routes/reviewRoute");
const conn = require("./db/db_config");
const allowed = [
  "http://localhost:3000/",
  "http://localhost:3001/",
  "http://localhost:3000/login",
  "https://www.google.com/",
];

const app = express();
app.use(
  cors({
    origin: "https://tomato-lac.vercel.app/",
    credentials: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  })
);
app.use(express.json());

app.use(store);
app.use(order);
app.use(user);
app.use(item);
app.use(review);

const PORT = process.env.PORT || 3001;

conn.on("open", () => {
  console.log("Connection Established with DB");
});

app.listen(PORT, () => {
  console.log("SERVER is Listenring", PORT);
});
