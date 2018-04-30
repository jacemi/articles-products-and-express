
let articleValidator = function (req, res, next) {
  const reqBody = req.body;
  let currentArticle = {};
  let currentArticleKeys = null;
  console.log("methods", req.method);
  
  switch (req.method) {
    case "POST":
      console.log(req.body);
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          console.log(reqBody[key])
          currentArticle[`${key}Check`] = true;
          console.log(currentArticle);
        } else {
          console.log('assigning available keys');
          currentArticle[key] = reqBody[key];
          console.log(reqBody[key]);
          console.log(currentArticle);
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      console.log("currentArticleKeys", currentArticleKeys);
      console.log(errorFlagsPresent(currentArticleKeys));
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
      console.log(req.body);
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          console.log(reqBody[key])
          currentArticle[`${key}Check`] = true;
          console.log(currentArticle);
        } else {
          console.log('assigning available keys');
          currentArticle[key] = reqBody[key];
          console.log(reqBody[key]);
          console.log(currentArticle);
        }
      }
      currentArticleKeys = Object.keys(currentArticle);
      console.log("currentArticleKeys", currentArticleKeys);
      console.log(errorFlagsPresent(currentArticleKeys));
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
    console.log(params[i]);
    if (params[i] == 'titleCheck' || params[i] == 'bodyCheck' || params[i] == 'authorCheck') {
      return true;
    }
  }
  return false;
};
