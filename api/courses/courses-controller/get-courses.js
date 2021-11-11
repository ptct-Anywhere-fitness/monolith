const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 1   | GET    | /api/courses            | Returns **an array of all the course objects** contained in the database                                                          |
//
// ==============================================

// (1) [GET]  /api/courses
const getCourses = (req, res) => {
  Courses.find()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((err) => {
      // - There's an error in retrieving the _courses_ from the database:
      res.status(500).json({
        err,
        message: 'The courses information could not be retrieved',
      });
    });
};

// ==============================================

module.exports = getCourses;
