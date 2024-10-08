const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  bestseller: {
    type: Boolean,
  },
  category: {
    type: [
      {
        type: [String],
        enum: ["veg", "non-veg"],
      },
    ],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Firm",
  },
});
const product = mongoose.model("Product", productSchema);
module.exports = product;
