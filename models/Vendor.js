const mongoose = require('mongoose');

const VendorSchema= new mongoose.Schema({
    username:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String
    },
    Firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})

const Vendor=mongoose.model('Vendor', VendorSchema);

module.exports= Vendor ;