const HttpError = require('../../helpers/http-error');
const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 2   | GET    | /api/courses/:id          | Returns **the course object with the specified id**                                                                               |
//
//
// - If there's an error in retrieving the _course_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The course information could not be retrieved" }`.
//
// ==============================================

// (2) [GET]  /api/courses/:id
const getCourseById = (req, res, next) => {
  const id = req.params.id;

  Courses.findById(id)
    .then((course) => {
      console.log('course: ', course);

      if (!course) {
        // -Cannot find a course with specified ID
        //
        // return res.status(404).json({
        //   message: 'The course with the specified ID does not exist',
        // });
        //
        // const error = new Error(
        //   'The course with the specified ID does not exist.'
        // );
        // error.status = 404;
        //
        return next(
          new HttpError('The course with the specified ID does not exist.', 404)
        );
      }
      res.status(201).json({ course });
    })
    .catch((e) => {
      // There's an error in retrieving the _course_ from the database:
      const error = new Error('The course information could not be retrieved.');
      error.status = 500;
      next(error);
    });

  console.log(`[GET]  /api/courses/${id}`);
};

// ==============================================

module.exports = getCourseById;
