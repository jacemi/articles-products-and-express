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
});

// .put((req, res) => {
//   console.log("hello");
//   let title = req.url.split('/')[1];
//   let newTitle = req.body.title;
//   let newBody = req.body.body;
//   let newAuthor = req.body.author;
//   let newUrlTitle = encodeURI(title);
//   articlesDb.editByTitle(title, newTitle, newBody, newAuthor, newUrlTitle);
//   res.render('article-by-title', articlesDb.getByTitle(title))
// })

router.route('/:title')
  .get((req, res) => {
    // const title = req.params.title;
    console.log("test3",req.url);
    let title = req.url.substring(1, req.url.length);
    // console.log(title); 
    console.log({ article: articlesDb.getByTitle(title) });
    res.render('article-by-title', articlesDb.getByTitle(title));

  })
  .put((req, res) => {
    console.log("post");

    
  })

router.get('/:title/edit', (req, res) => {
  console.log("edit");

  let title = req.url.split('/')[1];
  res.render('edit-article-by-title', articlesDb.getByTitle(title));
})



module.exports = router;