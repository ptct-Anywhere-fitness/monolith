const router = require('express').Router();

const ordersController = require('./orders-controller');

const authMiddleware = require('../auth/auth-middleware');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                         |
// | --- | ------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/courses            | Returns **an array of all the course objects** contained in the database                                                          |

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

module.exports = router;
