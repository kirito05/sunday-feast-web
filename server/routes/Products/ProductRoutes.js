const express = require('express');
const router = express.Router();

const getAllProducts = require('../../controllers/Products/getProduct');
const getProductById = require('../../controllers/Products/getProduct');
const getProductsByCategory = require('../../controllers/Products/getProduct');
const createProduct = require('../../controllers/Products/createProduct');



router.get('/all-products', getAllProducts);
router.get('/product/:productID', getProductById);
router.get('/products/:category', getProductsByCategory);
router.post('/create-product', createProduct);



module.exports = router;