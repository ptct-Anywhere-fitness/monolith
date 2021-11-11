const router = require('express').Router();

const coursesController = require('./courses-controller');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/courses              | Returns **an array of all the course objects** contained in the database                                                          |
// | 2   | GET    | /api/courses/:id          | Returns **the course object with the specified id**                                                                               |
// | 3   | POST   | /api/products              | Creates a product using the information sent inside the request body and returns **the newly created product object**                 |
// | 4   | PUT    | /api/products/:id          | Updates the product with the specified id using data from the request body and **returns the modified document**, not the original |
// | 5   | DELETE | /api/courses/:id          | Removes the course with the specified id and returns the **deleted product object**                                                  |

// ==============================================

// (1) [GET]  /api/courses
router.get('/', coursesController.getCourses);

// ==============================================

// (2) [GET]  /api/courses/:id
router.get('/:id', coursesController.getCourseById);

// ==============================================

// (3) [POST]  /api/products
router.post('/', coursesController.postProduct);

// ==============================================

// (4) [PUT]   /api/products/:id
router.put('/:id', coursesController.putProductById);

// ==============================================

// (5) [DELETE] /api/products/:id
router.delete('/:id', coursesController.deleteCourseById);

// ==============================================

// -Error handling middleware (products-router)
router.use((err, req, res, next) /* eslint-disable-line */ => {
  console.log(
    `
      ******************************************************
      *****Error-Handling Middleware (courses-router)******
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
    message: err.message || 'an unkown error occurred (products-router.js)',
  });
});

// ==============================================

module.exports = router;
