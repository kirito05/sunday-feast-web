const express = require('express');
const router = express.Router();
const AddToCart = require('../../controllers/Cart/addToCart');
const AnonymousUserCheck = require('../../middleware/annoymousUserCheck');
const updateCartItems = require('../../controllers/Cart/updateCart');
const getCartItems = require('../../controllers/Cart/displayCartItems');


router.use(AnonymousUserCheck);
router.post('/add-to-cart', AddToCart);
router.put('/update-cart', updateCartItems);
router.get('/get-cart-items', getCartItems);



module.exports = router;