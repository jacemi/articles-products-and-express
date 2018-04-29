const express = require('express');
const articles = require('./articles.js');
const products = require('./products.js');

const router = express.Router();

router.use('/products', products);
router.use('/articles', articles); 

module.exports = router;

//Number.product.price for number strings that get cut; 