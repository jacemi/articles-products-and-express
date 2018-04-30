
let articleValidator = function (req, res, next) {
  
  const reqBody = req.body;
  let currentArticle = {};
  let currentArticleKeys = null;

  switch (req.method) {
    case "POST":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          currentArticle[`${key}Check`] = true;
        } else {
          currentArticle[key] = reqBody[key];
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      if (errorFlagsPresent(currentArticleKeys)) {
        currentArticle.postError = true;
        res.status(400).render('article-new', currentArticle);
        currentArticle = {};
      } else {
        next()
      }
      break;
    case "PUT":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          currentArticle[`${key}Check`] = true;
        } else {
          currentArticle[key] = reqBody[key];
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      if (errorFlagsPresent(currentArticleKeys)) {
        currentArticle.postError = true;
        res.status(400).render('edit-article-by-title', currentArticle);
        currentArticle = {};
      } else {
        next()
      }
      break;
    default:
      next()
      break;
  };
};

function errorFlagsPresent(params) {
  for (i = 0; i < params.length; i++) {
    if (params[i] == 'titleCheck' || params[i] == 'bodyCheck' || params[i] == 'authorCheck') {
      return true;
    }
  }
  return false;
};

module.exports = {
  articleValidator: articleValidator,
};

