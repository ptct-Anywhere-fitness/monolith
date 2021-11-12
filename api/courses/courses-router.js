const router = require('express').Router();

const coursesController = require('./courses-controller');

const authMiddleware = require('../auth/auth-middleware');

// -Two middlewares:
//  --authMiddleware.restricted
//    ---Requires a valid JWT.
//  --

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                         |
// | --- | ------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/courses            | Returns **an array of all the course objects** contained in the database                                                          |
// | 2   | GET    | /api/courses/:id        | Returns **the course object with the specified id**                                                                               |
// | 3   | POST   | /api/courses            | Creates a course using the information sent inside the request body and returns **the newly created course object**               |
// | 4   | PUT    | /api/courses/:id        | Updates the course with the specified id using data from the request body and **returns the modified document**, not the original |
// | 5   | DELETE | /api/courses/:id        | Removes the course with the specified id and returns the **deleted course object**                                                |

// ==============================================

// (1) [GET]  /api/courses
router.get('/', authMiddleware.restricted, coursesController.getCourses);

// ==============================================

// (2) [GET]  /api/courses/:id
router.get('/:id', coursesController.getCourseById);

// ==============================================

// (3) [POST]  /api/courses
router.post('/', coursesController.postCourse);

// ==============================================

// (4) [PUT]   /api/courses/:id
router.put('/:id', coursesController.putCourseById);

// ==============================================

// (5) [DELETE] /api/courses/:id
router.delete('/:id', coursesController.deleteCourseById);

// ==============================================

// -Error handling middleware (courses-router)
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
    message: err.message || 'an unkown error occurred (courses-router.js)',
  });
});

// ==============================================

module.exports = router;
