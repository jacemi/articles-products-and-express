const express = require('express');
const articlesDb = require('../db/articles')
const articleValidator = require('../util/article-validator');

const router = express.Router();


router.use(articleValidator.articleValidator);

let currentArticle = {};

router.route('/')
  .get((req, res) => {

    res.render('articles-list', { articles: articlesDb.all() });
  })
  .post((req, res) => {

    let title = req.body.title;
    let body = req.body.body;
    let author = req.body.author;
    let urlTitle = encodeURI(title);
    articlesDb.add(title, body, author, urlTitle);
    res.render('articles-list', { articles: articlesDb.all() });
    // }
  });



router.get('/new', (req, res) => {
  res.render('article-new');
});


router.route('/:title')
  .get((req, res) => {

    let decodedURL = decodeURI(req.url)

    let title = decodedURL.substring(1, req.url.length);

    console.log(articlesDb.getByTitle(title));

    res.render('article-by-title', articlesDb.getByTitle(title));
    // }
  })
  .put((req, res) => {
    let decodedURL = decodeURI(req.url);
    let title = (decodedURL.split('/')[1]).split('?')[0];
    if (articlesDb.getByTitle(req.body.title).title !== title) {
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.body = req.body.body;
      currentArticle.author = req.body.author;
      currentArticle.existenceCheck = true;
      currentArticle.urlTitle = encodeURI(req.body.title);
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
      // currentArticle.existenceCheck = true;
      // } else if(currentArticle.existenceCheck){
      //   console.log("restrict", existenceCheck);
      //   currentArticle.postError = true;
      //   currentArticle.title = req.body.title;
      //   currentArticle.body = req.body.body;
      //   currentArticle.author = req.body.author;
      //   console.log('currentArticle pre', currentArticle); 
      //   res.status(400).render('edit-article-by-title', currentArticle);
      //   currentArticle ={};
    } else {
      let newTitle = req.body.title;
      let newBody = req.body.body;
      let newAuthor = req.body.author;
      let newUrlTitle = encodeURI(title);
      articlesDb.getByTitle(title);
      articlesDb.editByTitle(title, newTitle, newBody, newAuthor, newUrlTitle);
      res.render('article-by-title', articlesDb.getByTitle(title));
    }
  })
  .delete((req, res) => {
    let decodedURL = decodeURI(req.url);
    let title = (decodedURL.split('/')[1]).split('?')[0];
    console.log('delete', title);
    articlesDb.deleteByTitle(title);
    res.render('articles-list', { articles: articlesDb.all() });
  });


router.get('/:title/edit', (req, res) => {
  console.log("edit");
  let decodedURL = decodeURI(req.url);
  let title = decodedURL.split('/')[1];
  console.log(title);
  res.render('edit-article-by-title', articlesDb.getByTitle(title));
})



module.exports = router;