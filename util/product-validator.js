
let productValidator = function (req, res, next) {
  
  const reqBody = req.body;
  let currentProduct = {};
  let currentProductKeys = null;

  switch (req.method) {
    case "POST":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          currentProduct[`${key}Check`] = true;
        } else {
          currentProduct[key] = reqBody[key];
        }
      }
      currentProductKeys = Object.keys(currentProduct);
      if (errorFlagsPresent(currentProductKeys)) {
        currentProduct.postError = true;
        res.status(400).render('product-new', currentProduct);
        currentProduct = {};
      } else {
        next()
      }
      break;
    case "PUT":
      for (key in reqBody) {
        if (reqBody[key] == "") {
          currentProduct[`${key}Check`] = true;
        } else {
          currentProduct[key] = reqBody[key];
        }
      }
      currentProductKeys = Object.keys(currentProduct);
      if (errorFlagsPresent(currentProductKeys)) {
        currentProduct.postError = true;
        res.status(400).render('edit-product-by-id', currentProduct);
        currentProduct = {};
      } else {
        next()
      }
      break;

    default:
      next()
      break;
  }
};

function errorFlagsPresent(params) {
  for (i = 0; i < params.length; i++) {
    if (params[i] == 'nameCheck' || params[i] == 'priceCheck' || params[i] == 'inventoryCheck') {
      return true;
    }
  }
  return false;
};

module.exports = {
  productValidator: productValidator,
};


