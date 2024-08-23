// routes/VendorRoutes.js
//const FirmControllers = require('../controllers/FirmControllers');
const  VendorControllers  = require('../controllers/VendorControllers');
const express = require('express');
const router = express.Router();

router.post('/register', VendorControllers.VendorRegister);
router.post('/login',VendorControllers.VendorLogin);
router.get('/all-vendors', VendorControllers.vendorRecords);
router.get('/get-vendor/:id',VendorControllers.vendorById);
module.exports = router;
