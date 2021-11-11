const HttpError = require('../../helpers/http-error');
const Products = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 2   | GET    | /api/products/:id          | Returns **the product object with the specified id**                                                                               |
//
//
// - If the _product_ with the specified `id` is not found:
//
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.
//
// - If there's an error in retrieving the _product_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The product information could not be retrieved" }`.
//
// ==============================================

// (2) [GET]  /api/products/:id
const getProductById = (req, res, next) => {
  const id = req.params.id;

  Products.findById(id)
    .then((product) => {
      console.log('product: ', product);

      // -If cannot find a product with given ID
      if (!product) {
        // return res.status(404).json({
        //   message: 'The product with the specified ID does not exist',
        // });
        //
        // const error = new Error(
        //   'The product with the specified ID does not exist.'
        // );
        // error.status = 404;
        //
        return next(
          new HttpError(
            'The product with the specified ID does not exist.',
            404
          )
        );
      }
      res.status(201).json({ product });
    })
    .catch((e) => {
      const error = new Error(
        'The product information could not be retrieved.'
      );
      error.status = 500;
      next(error);
    });

  console.log(`[GET]  /api/products/${id}`);
};

// ==============================================

module.exports = getProductById;
