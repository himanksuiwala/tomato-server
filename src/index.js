const express = require("express");
var cors = require("cors");
const store = require("./routes/storeRoute");
const user = require("./routes/userRoute");
const item = require("./routes/itemRoute");
const conn = require("./db/db_config");

const app = express();
app.use(express.json());
app.use(cors());
app.use(store);
app.use(user);
app.use(item);

const PORT = 3000;

conn.on("open", () => {
  console.log("Connection Established with DB");
});

app.listen(PORT, () => {
  console.log("SERVER is Listenring");
});

const Item = require("./models/item");
const Store = require("./models/store");

// const main = async () => {
//   const store = await Store.findById("625ecb37377c4bc421fd4736");
//   await store.populate("menu");
//   console.log(store.menu);
// };

// const main = async()=>{
//     const item = await Item.findById('626000bca6948bdddc729a27')
//     await item.populate('store_id')
//     console.log(item.store_id )
// }

// main();
