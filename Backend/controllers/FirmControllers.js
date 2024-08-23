
const Vendor=require('../models/Vendor');
const Firm= require('../models/Firm');
const multer=require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb)  {
        cb(null, Date.now() + path.extname(file.originalname));
    }
    });

    const upload = multer({ storage: storage });

const addFirm= async(req, res)=>
{
    try{
        const {firmname, area, region, category, offer}=req.body
        const image=req.filename? req.file.filename: undefined;

        const vendor=await Vendor.findById(req.vendorId);
        if(!Vendor){
            res.status(400).json({error:"Vendor Not Found"})
        }
        const firm = new Firm({
        firmname, area, region, category, offer, image, vendor: vendor._id
    })
        const savedFirm=await firm.save()
        const firmId= savedFirm._id
        vendor.Firm.push(savedFirm)
        await vendor.save()
        return res.status(200).json({success:"Firm added successfully", "firmId": firmId})
    }
    
    
    catch(error){
        console.log(error);
        res.status(500).json({error:"server error"})
    }
}
module.exports={addFirm:[upload.single('file'),addFirm]}