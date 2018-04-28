
let articleValidator = function (req, res, next) {
  // if(!(req.body.title && req.body.body && req.body.author)){
  //   res.status(400).json({ 'success': false })
  // }else if(req.body.title
  switch (req.method) {
    case "POST":
      if (!req.body.title) {
        // console.log("check1");
        res.status(400).render('article-new');
      } else if (!req.body.body) {
        // console.log("check2");
        res.status(400).render('article-new');
      } else if (!req.body.author) {
        // console.log("check3");
        res.status(400).render('article-new');
      } else {
        // console.log("check4");
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