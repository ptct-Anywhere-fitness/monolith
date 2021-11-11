const Products = require('../products-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 3   | POST   | /api/products              | Creates a product using the information sent inside the request body and returns **the newly created product object**
//
//
// - If the request body is missing the `title` or `contents` property:
//
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the product" }`.
//
// - If the information about the _product_ is valid:
//
//   - save the new _product_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _product_.
//
// - If there's an error while saving the _product_:
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON: `{ message: "There was an error while saving the product to the database" }`.
//
// ==============================================

// (3) [POST]  /api/products
const postProduct = (req, res) => {
  const { title, contents } = req.body;
  console.log('[POST]  /api/products');

  if (title && contents) {
    Products.insert({ title, contents })
      .then((p) => {
        console.log('Successful addition of past to DB!');
        res.status(201).json(p);
      })
      .catch((err) => {
        console.log('err: ', err);
        res.status(500).json({
          message:
            'There was an error while saving the product to the database',
        });
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the product' });
  }
};

// ==============================================

module.exports = postProduct;
