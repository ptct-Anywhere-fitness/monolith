const Products = require('../products-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/products              | Returns **an array of all the product objects** contained in the database                                                          |
//
//
// - If there's an error in retrieving the _products_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The products information could not be retrieved" }`.
//
// ==============================================

// (1) [GET]  /api/products
const getProducts = (req, res) => {
  Products.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The products information could not be retrieved' });
    });
};

// ==============================================

module.exports = getProducts;
