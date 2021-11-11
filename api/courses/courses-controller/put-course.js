const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 4   | PUT    | /api/courses/:id          | Updates the course with the specified id using data from the request body and **returns the modified document**, not the original |
//
//
// - If the _course_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The course with the specified ID does not exist" }`.
//
// - If the request body is missing the `title` or `contents` property:
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the course" }`.
//
// - If there's an error when updating the _course_:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The course information could not be modified" }`.
//
// - If the course is found and the new information is valid:
//   - update the course document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _course_.
//
// ==============================================

// (4) [PUT]  /api/courses/:id
const putCourseById = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  // - If the request body is missing the `title` or `contents` property:
  //   - respond with HTTP status code `400` (Bad Request).
  //   - return the following JSON: `{ message: "Please provide title and contents for the course" }`.
  if (!body.title || !body.contents) {
    return res
      .status(400)
      .json({ message: 'Please provide title and contents for the course' });
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
        res.status(404).json({
          message: 'The course with the specified ID does not exist',
        });
      }
    })
    .catch((err) => {
      console.log('err: ', err);
      // - If there's an error when updating the _course_:
      //   - respond with HTTP status code `500`.
      //   - return the following JSON: `{ message: "The course information could not be modified" }`.
      res
        .status(500)
        .json({ message: 'The course information could not be modified' });
    });
};

// ==============================================

module.exports = putCourseById;
