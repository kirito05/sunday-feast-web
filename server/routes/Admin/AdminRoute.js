const express = require('express');
const router = express.Router();
const AdminLogin = require('../../controllers/AdminAccount/AdminLogin');
const AdminRegister = require('../../controllers/AdminAccount/AdminRegister');
const masterKeyValidation = require('../../middleware/masterVer');


router.post('/login',AdminLogin)
router.post('/register',masterKeyValidation,AdminRegister)


module.exports = router;