const express = require('express');
const router = express.Router();
const AddToCart = require('../../controllers/Cart/addToCart');
const AnonymousUserCheck = require('../../middleware/annoymousUserCheck');


router.use(AnonymousUserCheck);
router.post('/add-to-cart', AddToCart);


module.exports = router;