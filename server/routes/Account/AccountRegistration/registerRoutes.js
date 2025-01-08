const express = require('express');
const router = express.Router();
const userRegister = require('../../../controllers/CustomerAccount/Register/userRegistration');
const RegisterOtp = require('../../../controllers/CustomerAccount/Register/registerOtp');



router.post('/verification',RegisterOtp);
router.post('/register',userRegister);


module.exports = router;
