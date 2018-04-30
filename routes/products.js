const express = require('express');
const productsDb = require('../db/products');
const productValidator = require('../util/product-validator');

const router = express.Router();

router.use(productValidator.productValidator);

let currentProduct = {};

router.route('/')
  .get((req, res) => {
    res.render('products-list', { products: productsDb.all() });
  })
  .post((req, res) => {
      let parsedPrice = Number(req.body.price);
      let parsedInventory = Number(req.body.inventory);
      if ((isNaN(parsedPrice)) && (isNaN(parsedInventory))) {
        console.log('price and inventory are NaN');
        currentProduct.postError = true;
        currentProduct.priceIsNaN = true;
        currentProduct.inventoryIsNaN = true;
        currentProduct.name = req.body.name;
        currentProduct.price = req.body.price;
        currentProduct.inventory = req.body.inventory;
        res.status(400).render('product-new', currentProduct);
        currentProduct = {};
      } else if (isNaN(parsedPrice)) {
        console.log('price is NaN'); 
        currentProduct.postError = true;
        currentProduct.priceIsNaN = true;
        currentProduct.name = req.body.name;
        currentProduct.price = req.body.price;
        currentProduct.inventory = req.body.inventory;
        res.status(400).render('product-new', currentProduct);
        currentProduct = {};
      } else if (isNaN(parsedInventory)) {
        console.log('inventory is NaN');
        currentProduct.postError = true;
        currentProduct.inventoryIsNaN = true;
        currentProduct.name = req.body.name;
        currentProduct.price = req.body.price;
        currentProduct.inventory = req.body.inventory;
        res.status(400).render('product-new', currentProduct);
        currentProduct = {};
      } else {
        console.log('post successful');
        let name = req.body.name;
        let price = req.body.price;
        let inventory = req.body.inventory;
        productsDb.add(name, price, inventory);
        res.render('products-list', { products: productsDb.all() });
      }
    
  })


router.get('/new', (req, res) => {
  res.render('product-new');
})

router.route('/:id')
  .get((req, res) => {
    let parsedId = Number(req.params.id);
    res.render('product-by-id', productsDb.getById(parsedId));
  })
  .put((req, res) => {
    let currentProduct = {};
    currentProduct.id = 
    let parsedPrice = Number(req.body.price);
    let parsedInventory = Number(req.body.inventory);
    if ((isNaN(parsedPrice)) && (isNaN(parsedInventory))) {
      console.log('price and inventory are NaN');
      currentProduct.postError = true;
      currentProduct.priceIsNaN = true;
      currentProduct.inventoryIsNaN = true;
      currentProduct.name = req.body.name;
      currentProduct.price = req.body.price;
      currentProduct.inventory = req.body.inventory;
      res.status(400).render('edit-product-by-id', currentProduct);
      currentProduct = {};
    } else if (isNaN(parsedPrice)) {
      console.log('price is NaN');
      currentProduct.postError = true;
      currentProduct.priceIsNaN = true;
      currentProduct.name = req.body.name;
      currentProduct.price = req.body.price;
      currentProduct.inventory = req.body.inventory;
      res.status(400).render('edit-product-by-id', currentProduct);
      currentProduct = {};
    } else if (isNaN(parsedInventory)) {
      console.log('inventory is NaN');
      currentProduct.postError = true;
      currentProduct.inventoryIsNaN = true;
      currentProduct.name = req.body.name;
      currentProduct.price = req.body.price;
      currentProduct.inventory = req.body.inventory;
      res.status(400).render('edit-product-by-id', currentProduct);
      currentProduct = {};
    }else{
      console.log('passed put validations');
      let parsedId = Number(req.params.id);
      let newName = req.body.name;
      let newPrice = req.body.price;
      let newInventory = req.body.inventory;
      productsDb.editById(parsedId, newName, newPrice, newInventory);
      res.render('product-by-id', productsDb.getById(parsedId)); 
    }
})
  .delete((req,res) => {
    let parsedId = Number(req.params.id);
    productsDb.deleteById(parsedId);
    res.render('products-list', { products: productsDb.all() })
  })

router.get('/:id/edit', (req, res) => {
  let parsedId = Number(req.params.id);
  res.render('edit-product-by-id', productsDb.getById(parsedId));
});
module.exports = router;