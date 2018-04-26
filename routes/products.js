const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET products');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`GET product with id:${id}`)
});

module.exports = router;