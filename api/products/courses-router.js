const router = require('express').Router();

const productsController = require('./products-controller');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/products              | Returns **an array of all the product objects** contained in the database                                                          |
// | 2   | GET    | /api/products/:id          | Returns **the product object with the specified id**                                                                               |
// | 3   | POST   | /api/products              | Creates a product using the information sent inside the request body and returns **the newly created product object**                 |
// | 4   | PUT    | /api/products/:id          | Updates the product with the specified id using data from the request body and **returns the modified document**, not the original |
// | 5   | DELETE | /api/products/:id          | Removes the product with the specified id and returns the **deleted product object**                                                  |

// ==============================================

// (1) [GET]  /api/products
router.get('/', productsController.getProducts);

// ==============================================

// (2) [GET]  /api/products/:id
router.get('/:id', productsController.getProductById);

// ==============================================

// (3) [POST]  /api/products
router.post('/', productsController.postProduct);

// ==============================================

// (4) [PUT]   /api/products/:id
router.put('/:id', productsController.putProductById);

// ==============================================

// (5) [DELETE] /api/products/:id
router.delete('/:id', productsController.deleteProductById);

// ==============================================

// -Error handling middleware (products-router)
router.use((err, req, res, next) /* eslint-disable-line */ => {
  console.log(
    `
      ******************************************************
      *****Error-Handling Middleware (products-router)******
      ******************************************************
    `
  );

  // --------------------------------------------

  // -Check if response has already been sent.
  // -If so, then forward the error.
  if (res.headersSent) {
    return next(error);
  }

  // --------------------------------------------
  // err.code
  res.status(err.status || 500).json({
    stack: err.stack,
    message: err.message || 'an unkown error occurred (products-router.js)',
  });
});

// ==============================================

module.exports = router;
