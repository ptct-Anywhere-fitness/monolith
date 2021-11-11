const Products = require('../products-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 5   | DELETE | /api/products/:id          | Removes the product with the specified id and returns the **deleted product object**                                                  |
//
//
// - If the _product_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.
//
// - If there's an error in removing the _product_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The product could not be removed" }`.
//
// ==============================================

// (5) [DELETE]  /api/products/:id
const deleteProductById = (req, res) => {
  const id = req.params.id;
  console.log(`[DELETE]  /api/products/${id}`);

  Products.remove(id)
    .then((returned_id) => {
      console.log('returned_id: ', returned_id);

      if (!returned_id) {
        // - If the _product_ with the specified `id` is not found:
        //   - return HTTP status code `404` (Not Found).
        //   - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.
        return res
          .status(404)
          .json({
            message: 'The product with the specified ID does not exist',
          });
      }

      res.status(201).json({ fuck: returned_id });
    })
    .catch(() => {
      // - If there's an error in removing the _product_ from the database:
      //   - respond with HTTP status code `500`.
      //   - return the following JSON: `{ message: "The product could not be removed" }`.
      res.status(500).json({ message: 'The product could not be removed' });
    });
};

// ==============================================

module.exports = deleteProductById;
