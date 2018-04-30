
let articleValidator = function (req, res, next) {
  const reqBody = req.body;
  let currentArticle = {};
  let currentArticleKeys = null;
  
  switch (req.method) {
    case "POST":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          currentArticle[`${key}Check`] = true;
          console.log(currentArticle);
        } else {
          console.log('assigning available keys');
          currentArticle[key] = reqBody[key];
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      if (errorFlagsPresent(currentArticleKeys)) {
        console.log('route to send error');
        currentArticle.postError = true;
        res.status(400).render('article-new', currentArticle);
        currentArticle = {};
      } else {
        console.log('route to successful post')
        next()
      }
      break;
    case "PUT":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          currentArticle[`${key}Check`] = true;
        } else {
          console.log('assigning available keys');
          currentArticle[key] = reqBody[key];
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      if (errorFlagsPresent(currentArticleKeys)) {
        console.log('route to send error');
        currentArticle.postError = true;
        res.status(400).render('edit-article-by-title', currentArticle);
        currentArticle = {};
      } else {
        console.log('route to successful post')
        next()
      }
      break;
    default:
      next()
      break;
  }
};



module.exports = {
  articleValidator: articleValidator,
};


function errorFlagsPresent(params) {
  for (i = 0; i < params.length; i++) {
    if (params[i] == 'titleCheck' || params[i] == 'bodyCheck' || params[i] == 'authorCheck') {
      return true;
    }
  }
  return false;
};
