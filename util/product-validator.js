
let productValidator = function (req, res, next) {
  const reqBody = req.body;
  let currentProduct = {};
  let currentProductKeys = null;
  switch (req.method) {
    case "POST":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          currentProduct[`${key}Check`] = true;
        } else {
          console.log('assigning available keys');
          currentProduct[key] = reqBody[key];
        }
      }
      currentProductKeys = Object.keys(currentProduct);
      if (errorFlagsPresent(currentProductKeys)) {
        console.log('route to send error');
        currentProduct.postError = true;
        res.status(400).render('product-new', currentProduct);
        currentProduct = {};
      } else {
        console.log('route to successful post')
        next()
      }
      break;
    case "PUT":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          console.log('checking for empty strings');
          currentProduct[`${key}Check`] = true;
        } else {
          console.log('assigning available keys');
          currentProduct[key] = reqBody[key];
          console.log("else in 1st validation", currentProduct);
        }
      }
      currentProductKeys = Object.keys(currentProduct);
      console.log("currentProductKeys", currentProductKeys);
      if (errorFlagsPresent(currentProductKeys)) {
        console.log('route to send error');
        currentProduct.postError = true;
        res.status(400).render('edit-product-by-id', currentProduct);
        currentProduct = {};
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
  productValidator: productValidator,
};


function errorFlagsPresent(params) {
  for (i = 0; i < params.length; i++) {
    if (params[i] == 'nameCheck' || params[i] == 'priceCheck' || params[i] == 'inventoryCheck') {
      return true;
    }
  }
  return false;
};
