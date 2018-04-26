const express = require('express');
const articles = require('../db/articles')
const handlebars = require('handlebars');
const router = express.Router();

router.post('/', (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let author = req.body.author;
  let urlTitle = encodeURI("how to smell like a wet dog");
  articles.add(title, body, author, urlTitle);
});


router.get('/', (req, res) => {
  
  res.render('article', {message: "hi"})
});

router.get('/:title', (req, res) => {
  const title = req.params.title;
  res.send(`GET article with title:${title}`)
});

module.exports = router;