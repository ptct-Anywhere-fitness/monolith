const HttpError = require('../../helpers/http-error');
const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                       |
// | --- | ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
// | 4   | PUT    | /api/courses/:id        | Updates the course with the specified id using data from the request body and **returns the modified document**, not the original |
//
// ==============================================

// (4) [PUT]  /api/courses/:id
const putCourseById = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  // - If the request body is missing the `title` or `contents` property:
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON: `{ message: "Please provide title and contents for the course" }`.
  if (!body.title) {
    return next(new HttpError('Please provide title for the course', 400));
  }

  console.log('[PUT]  /api/courses/:id, \t body: ', body);

  Courses.update(id, body)
    .then((returned_id) => {
      if (returned_id) {
        // - If the course is found and the new information is valid:
        //   - update the course document in the database using the new information sent in the `request body`.
        //   - return HTTP status code `200` (OK).
        //   - return the newly updated _course_.
        console.log('Successful modification of course in DB!');
        res.status(201).json({ id: returned_id, ...body });
      } else {
        // - If the _course_ with the specified `id` is not found:
        //   - return HTTP status code `404` (Not Found).
        //   - return the following JSON: `{ message: "The course with the specified ID does not exist" }`.
        next(
          new HttpError('The course with the specified ID does not exist', 404)
        );
      }
    })
    .catch((err) => {
      console.log('err: ', err);
      // - If there's an error when updating the _course_:
      //   - respond with HTTP status code `500`.
      //   - return the following JSON: `{ message: "The course information could not be modified" }`.
      next(new HttpError('The course information could not be modified', 500));
    });
};

// ==============================================

module.exports = putCourseById;
