const mongoose = require("mongoose");

const FirmSchema = new mongoose.Schema({
  firmname: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  region: {
    type: [
      {
        type: [String],
        enum: ["South indian", "North indian", "chinese"],
      },
    ],
  },
  category: {
    type: [
      {
        type: [String],
        enum: ["veg", "non-veg"],
      },
    ],
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const Firm = mongoose.model("Firm", FirmSchema);
module.exports = Firm;
