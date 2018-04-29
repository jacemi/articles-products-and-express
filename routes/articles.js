const express = require('express');
const articlesDb = require('../db/articles')
// const articleValidator = require('../util/article-validator');

const router = express.Router();


// router.use(articleValidator.articleValidator);

let currentArticle = {};

router.route('/')
  .get((req, res) => {
    // console.log(req);
    // console.log({ articles: articlesDb.all() });
    res.render('articles-list', { articles: articlesDb.all() });
  })
  .post((req, res) => {
    if (!req.body.title && !req.body.body && !req.body.author) {
      console.log("no title, body, author");
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.authorCheck = true;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.title && !req.body.body) {
      console.log("title and body")
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.body && !req.body.author) {
      console.log("no body and author")
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.bodyCheck = true;
      currentArticle.authorCheck = true;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.title && !req.body.author) {
      console.log("no title and body");
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.title) {
      console.log('no title');
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.body = req.body.body;
      currentArticle.author = req.body.author;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.body) {
      console.log('no body');
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (!req.body.author) {
      console.log('no author');
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.body = req.body.body;
      currentArticle.authorCheck = true;
      res.status(400).render('article-new', currentArticle);
      currentArticle = {};
    } else if (articlesDb.getByTitle(req.body.title)) {
      console.log('it exists');
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.body = req.body.body;
      currentArticle.author = req.body.author;
      currentArticle.existenceCheck = true;
      res.status(400).render('article-new', currentArticle);
      console.log(currentArticle);
      currentArticle = {};
    } else {
      console.log(articlesDb.getByTitle(req.title));
      console.log('post successful');
      let title = req.body.title;
      let body = req.body.body;
      let author = req.body.author;
      let urlTitle = encodeURI(title);
      articlesDb.add(title, body, author, urlTitle);
      res.render('articles-list', { articles: articlesDb.all() });
    }
  });



router.get('/new', (req, res) => {
  // console.log(req.url.substring(1, req.url.length));
  console.log("this is bullshit");
  res.render('article-new');
});


router.route('/:title')
  .get((req, res) => {
    // console.log("params",req.params);
    let decodedURL = decodeURI(req.url)
    // console.log(decodedURL);
    let title = decodedURL.substring(1, req.url.length);
    // console.log(title);
    console.log(articlesDb.getByTitle(title));
    if (title.search(' ') >= 1) {
      // console.log("get if");
      res.render('article-by-title', articlesDb.getByTitle(title))
    } else {
      // console.log("get else");
      res.render('article-by-title', articlesDb.getByTitle(title));
    }
  })
  .put((req, res) => {
    let decodedURL = decodeURI(req.url);
    let title = (decodedURL.split('/')[1]).split('?')[0];
    if (!req.body.title && !req.body.body && !req.body.author) {
      console.log("no title, body, author");
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.authorCheck = true;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.title && !req.body.body) {
      console.log("title and body")
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.body && !req.body.author) {
      console.log("no body and author")
      currentArticle.postError = true;
      currentArticle.bodyCheck = true;
      currentArticle.authorCheck = true;
      currentArticle.title = req.body.title;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.title && !req.body.author) {
      console.log("no title and body");
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.title) {
      console.log('no title');
      currentArticle.postError = true;
      currentArticle.titleCheck = true;
      currentArticle.body = req.body.body;
      currentArticle.author = req.body.author;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.body) {
      console.log('no body');
      currentArticle.postError = true;
      currentArticle.bodyCheck = true;
      currentArticle.author = req.body.author;
      currentArticle.title = req.body.title;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (!req.body.author) {
      console.log('no author');
      currentArticle.postError = true;
      currentArticle.authorCheck = true;
      currentArticle.body = req.body.body;
      currentArticle.title = req.body.title;
      res.status(400).render('edit-article-by-title', currentArticle);
      currentArticle = {};
    } else if (articlesDb.getByTitle(req.body.title).title !== title) {
      console.log('it exists');
      console.log("body", req.body.title, "url", req.url)
      currentArticle.postError = true;
      currentArticle.title = req.body.title;
      currentArticle.body = req.body.body;
      currentArticle.author = req.body.author;
      currentArticle.existenceCheck = true;
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
      // let decodedURL = decodeURI(req.url);
      // let title = (decodedURL.split('/')[1]).split('?')[0];
      console.log('are we here?');
      let newTitle = req.body.title;
      let newBody = req.body.body;
      let newAuthor = req.body.author;
      let newUrlTitle = encodeURI(title);
      console.log("this is also bullshit", articlesDb.getByTitle(title));
      articlesDb.editByTitle(title, newTitle, newBody, newAuthor, newUrlTitle);
      res.render('article-by-title', articlesDb.getByTitle(title))
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