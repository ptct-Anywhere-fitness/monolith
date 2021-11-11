const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 3   | POST   | /api/courses              | Creates a course using the information sent inside the request body and returns **the newly created course object**
//
//
// - If the request body is missing the `title` or `contents` property:
//
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON: `{ message: "Please provide title and contents for the course" }`.
//
// - If the information about the _course_ is valid:
//
//   - save the new _course_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _course_.
//
// - If there's an error while saving the _course_:
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON: `{ message: "There was an error while saving the course to the database" }`.
//
// ==============================================

// (3) [POST]  /api/courses
const postCourse = (req, res) => {
  const { title, contents } = req.body;
  console.log('[POST]  /api/courses');

  if (title && contents) {
    Courses.insert({ title, contents })
      .then((p) => {
        console.log('Successful addition of past to DB!');
        res.status(201).json(p);
      })
      .catch((err) => {
        console.log('err: ', err);
        res.status(500).json({
          message: 'There was an error while saving the course to the database',
        });
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the course' });
  }
};

// ==============================================

module.exports = postCourse;
