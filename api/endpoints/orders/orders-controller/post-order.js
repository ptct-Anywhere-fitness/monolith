const HttpError = require('../../../helpers/http-error');
const Orders = require('../orders-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 3   | POST   | /api/orders             | Creates a order using the information sent inside the request body and returns **the newly created order object**                |
//
// ==============================================

// (3) [POST]  /api/orders
const postOrder = (req, res, next) => {
  console.log('[POST]  /api/orders');

  console.log('req.decoded_token: ', req.decoded_token);
  console.log(
    'typeof req.decoded_token.userId: ',
    typeof req.decoded_token.userId
  );

  const user_id = req.decoded_token.userId;
  console.log('user_id: ', user_id);

  const { cart, total } = req.body;

  // if (title) {
  Orders.insert({
    user_id,
    total,
    cart,
  })
    .then((order) => {
      console.log('Successful addition of order to DB! - order: ', order);
      res.status(201).json({ order_line_items: order, order_total: total });
    })
    .catch((err) => {
      // -There's an error while saving the _order_
      console.log('err: ', err);
      next(
        new HttpError(
          'There was an error while saving the order to the database',
          500
        )
      );
    });
  // }
  //else {
  //   // -The request body is missing the `title` property
  //   // res.status(400).json({ message: 'Please provide title for the course' });
  //   next(new HttpError('Please provide title for the course', 400));
  // }
};

// ==============================================

module.exports = postOrder;
