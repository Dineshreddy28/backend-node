const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const addproduct = async (req, res) => {
  try {
    const { productname, price, bestseller, category, description } = req.body;
    const image = req.filename ? req.file.filename : undefined;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(400).json({ error: "firm not found" });
    }
    const product = new Product({
      productname,
      price,
      bestseller,
      category,
      description,
      image,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.product.push(savedProduct);
    await firm.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    console.log(firmId);
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(400).json({ error: "firm not found" });
    }
    const firmObjId = new mongoose.Types.ObjectId(firmId);
    const products = await Product.find({ firm: firmObjId });
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ Message: "Internal error" });
    console.log(error);
  }
};

module.exports = {
  addproduct: [upload.single("image"), addproduct],
  getProductByFirm,
};
