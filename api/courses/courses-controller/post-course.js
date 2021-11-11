const HttpError = require('../../helpers/http-error');
const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 3   | POST   | /api/courses              | Creates a course using the information sent inside the request body and returns **the newly created course object**
//
// ==============================================

// (3) [POST]  /api/courses
const postCourse = (req, res) => {
  const { title } = req.body;
  console.log('[POST]  /api/courses');

  if (title) {
    Courses.insert({ title })
      .then((course) => {
        console.log('Successful addition of course to DB! - course: ', course);
        res.status(201).json(course);
      })
      .catch((err) => {
        // -There's an error while saving the _course_
        console.log('err: ', err);
        next(
          new HttpError(
            'There was an error while saving the course to the database',
            500
          )
        );
      });
  } else {
    // -The request body is missing the `title` property
    // res.status(400).json({ message: 'Please provide title for the course' });
    next(new HttpError('Please provide title for the course', 400));
  }
};

// ==============================================

module.exports = postCourse;
