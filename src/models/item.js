const mongoose = require("mongoose");
const validator = require("validator");
const itemSchema = new mongoose.Schema({
  name: {                     // FoodItemName:ex-"Shahi Panner"
    type: String,
    required: true,
  },
  cuisine_category: {         // CusineType:ex-"Thai","Chinese"
    type: String,
  },
  item_type:{                 // Item Category:ex-"VEG/NON-Veg"
    type:String,
    required:true,
    default:"Veg",
  },
  price: {                    // ItemPrice:ex-"Rs10.00"
    type: Number,
    required: true,
  },
  description: {              // Description of FoodItem     
    type: String,
  },
  store_id:{                  // stores the corres.Store
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'storeModel'
  }
});

module.exports = mongoose.model("itemModel",itemSchema)
