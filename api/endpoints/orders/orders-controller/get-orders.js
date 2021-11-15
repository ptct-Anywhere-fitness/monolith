const HttpError = require('../../../helpers/http-error');
const Orders = require('../orders-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/orders            | Returns **an array of all the order objects** contained in the database                                                          |
//
// ==============================================

// (1) [GET]  /api/orders
const getOrders = (req, res) => {
  console.log('[GET] /api/orders');

  Orders.getUsersOrders()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      next(
        new HttpError('The orders information could not be retrieved.', 500)
      );
    });
};

// ==============================================

module.exports = getOrders;
