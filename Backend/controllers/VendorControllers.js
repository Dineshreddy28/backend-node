const  Vendor  = require("../models/Vendor");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
dotEnv.config();
const key=process.env.secretkey
const VendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const VendorEmail = await Vendor.findOne({ email });
        if (VendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: HashedPassword
        });
        await newVendor.save();
        res.status(201).json("Vendor registered successfully");
        console.log("registered");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const VendorLogin= async(req, res)=>{
    const{email, password}=req.body;
    try{
        const vendor= await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(400).json({Message:"Invaild email or password"})
        }
        const token=jwtToken.sign({vendorId: vendor._id},key)
        res.status(200).json({success: "Login success", token})
        console.log(token);
        }
    catch(error){
        res.status(500).json({Messsage:"Internal error"});
        console.log(error);
    }


        
}
const vendorRecords=async(req, res)=>{
    try{
        const vendors=await Vendor.find().populate('Firm');
        res.json({vendors})
    }
    catch(error){
        res.status(500).json({Message:"Internal error"});
        console.log(error);
    }
}
const vendorById=async(req, res)=>{
    const vendorId=req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId);
        if(!vendor){
            return res.status(400).json({error:"vendor not found"});
        }
        return res.status(200).json({vendor})
    } catch (error) {
        res.status(500).json({Message:"Internal error"});
        console.log(error);
        
    }
}

module.exports = { VendorRegister, VendorLogin,vendorRecords, vendorById };
