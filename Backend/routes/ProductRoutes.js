const express = require("express");
const productcontroller = require("../controllers/ProductControllers");
const router = express.Router();

router.post("/add-product/:firmId", productcontroller.addproduct);
router.get("/:firmId/products", productcontroller.getProductByFirm);

router.get('/uploads/:imagename',(req,res)=>{
    const imagename=req.params.imagename;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads', imagename));

});
router.delete('/:productId',productcontroller.deleteproductById);
module.exports = router;
