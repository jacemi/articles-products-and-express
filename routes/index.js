const express = require('express');
const articles = require('./articles');
const products = require('./products');

const router = express.Router();

router.use('/products', products);
router.use('/articles', articles); 

module.exports = router;