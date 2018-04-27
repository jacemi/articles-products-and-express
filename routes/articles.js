const express = require('express');
const articlesDb = require('../db/articles')
const articleValidator = require('../util/article-validator');
const router = express.Router();


router.use(articleValidator.articleValidator);

router.post('/', (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let author = req.body.author;
  let urlTitle = encodeURI(title);
  articlesDb.add(title, body, author, urlTitle);
  res.render('articles-list', { articles: articlesDb.all() });
});


router.get('/', (req, res) => {
  // console.log(req);
  console.log({ articles: articlesDb.all() });
  res.render('articles-list', { articles: articlesDb.all() });
});

router.get('/new', (req, res) => {
  console.log(req.url.substring(1, req.url.length)); 
  res.render('article-new');
})

router.get('/:title', (req, res) => {
  // const title = req.params.title;
  // console.log(title);
  let title = req.url.substring(1, req.url.length);
  // console.log(title); 
  console.log({ article: articlesDb.getByTitle(title) });
  res.render('article-by-title', articlesDb.getByTitle(title))

});


module.exports = router;