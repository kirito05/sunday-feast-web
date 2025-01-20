const express = require('express');
const router = express.Router();
const useLogin = require('../../../controllers/CustomerAccount/Login/userLogin');
const loginOtp = require('../../../controllers/CustomerAccount/Login/loginOtp');


router.post('/login-verification', loginOtp);
router.post('/login', useLogin);


module.exports = router;