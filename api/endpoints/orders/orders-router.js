const router = require('express').Router();

const ordersController = require('./orders-controller');

const authMiddleware = require('../auth/auth-middleware');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                         |
// | --- | ------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/orders            | Returns **an array of all the course objects** contained in the database                                                          |
// | 2   | GET    | /api/orders/:id        | Returns **the order object  with the specified id**
//
// ==============================================
// ==============================================

// (1) [GET]  /api/orders
router.get(
  '/',
  authMiddleware.restricted,
  authMiddleware.admin_only,
  ordersController.getUsersOrders
);

// ==============================================

// (1) [GET]  /api/orders/:id
router.get(
  '/:id',
  authMiddleware.restricted,
  authMiddleware.admin_only,
  ordersController.getOrderById
);

// ==============================================

// -Error handling middleware (orders-router)
router.use((err, req, res, next) /* eslint-disable-line */ => {
  console.log(
    `
      ******************************************************
      *****Error-Handling Middleware (orders-router)******
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
    message: err.message || 'an unkown error occurred (order-router.js)',
  });
});

// ==============================================

module.exports = router;
