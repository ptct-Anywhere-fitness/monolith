const Products = require('../products-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 4   | PUT    | /api/products/:id          | Updates the product with the specified id using data from the request body and **returns the modified document**, not the original |
//
//
// - If the _product_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.
//
// - If the request body is missing the `title` or `contents` property:
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the product" }`.
//
// - If there's an error when updating the _product_:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The product information could not be modified" }`.
//
// - If the product is found and the new information is valid:
//   - update the product document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _product_.
//
// ==============================================

// (4) [PUT]  /api/products/:id
const putProductById = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  // - If the request body is missing the `title` or `contents` property:
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON: `{ message: "Please provide title and contents for the product" }`.
  if (!body.title || !body.contents) {
    return res
      .status(400)
      .json({ message: 'Please provide title and contents for the product' });
  }

  console.log('[PUT]  /api/products/:id, \t body: ', body);

  Products.update(id, body)
    .then((returned_id) => {
      if (returned_id) {
        // - If the product is found and the new information is valid:
        //   - update the product document in the database using the new information sent in the `request body`.
        //   - return HTTP status code `200` (OK).
        //   - return the newly updated _product_.
        console.log('Successful modification of product in DB!');
        res.status(201).json({ id: returned_id, ...body });
      } else {
        // - If the _product_ with the specified `id` is not found:
        //   - return HTTP status code `404` (Not Found).
        //   - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.
        res
          .status(404)
          .json({
            message: 'The product with the specified ID does not exist',
          });
      }
    })
    .catch((err) => {
      console.log('err: ', err);
      // - If there's an error when updating the _product_:
      //   - respond with HTTP status code `500`.
      //   - return the following JSON: `{ message: "The product information could not be modified" }`.
      res
        .status(500)
        .json({ message: 'The product information could not be modified' });
    });
};

// ==============================================

module.exports = putProductById;
