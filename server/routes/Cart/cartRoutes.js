const express = require('express');
const router = express.Router();
const AddToCart = require('../../controllers/Cart/addToCart');
const AnonymousUserCheck = require('../../middleware/annoymousUserCheck');
const updateCartItems = require('../../controllers/Cart/updateCart');


router.use(AnonymousUserCheck);
router.post('/add-to-cart', AddToCart);
router.put('/update-cart', updateCartItems);



module.exports = router;