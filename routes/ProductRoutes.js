const express = require("express");
const productcontroller = require("../controllers/ProductControllers");
const router = express.Router();

router.post("/add-product/:firmId", productcontroller.addproduct);
router.get("/:firmId/products", productcontroller.getProductByFirm);
module.exports = router;
