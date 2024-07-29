const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");

dotenv.config();

const Key=process.env.SecretKey

const VerifyToken= async(req, res, next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error:"Token is required"});

    }
    try{
        const decoded= jwt.verify(token, Key)
        const vendor=await Vendor.findById(decoded.vendorId);
        if(!Vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId=vendor._id
        next()
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Invaild TOken"});
            
        }
}
module.exports=VerifyToken;


