const HttpError = require('../../../helpers/http-error');
const Orders = require('../orders-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 2   | GET    | /api/orders/:id         | Returns **the order object  with the specified id**
//
// ==============================================

// (2) [GET]  /api/orders/:id
const getOrderById = (req, res, next) => {
  const id = req.params.id;

  console.log(`[GET]  /api/orders/${id}`);

  Orders.findById(id)
    .then((products) => {
      console.log('products in order: ', products);

      if (products.length === 0) {
        console.log('products.length === 0');

        return next(
          new HttpError('The order with the specified ID does not exist.', 404)
        );
      }
      res.status(201).json(products);
    })
    .catch((e) => {
      next(new HttpError('The order information could not be retrieved.', 500));
    });
};

// ==============================================

module.exports = getOrderById;
