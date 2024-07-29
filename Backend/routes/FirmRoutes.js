

const express= require("express");
const FirmControllers = require("../controllers/FirmControllers");
const VerifyToken= require("../Middleware/VerifyTokens");
const router=express.Router();
router.post('/add-firm',VerifyToken,FirmControllers.addFirm);
module.exports=router;