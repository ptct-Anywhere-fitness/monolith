const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 3   | POST   | /api/courses              | Creates a course using the information sent inside the request body and returns **the newly created course object**
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
        // - There's an error while saving the _course_
        console.log('err: ', err);
        res.status(500).json({
          message: 'There was an error while saving the course to the database',
        });
      });
  } else {
    // - The request body is missing the `title` or `contents` property
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the course' });
  }
};

// ==============================================

module.exports = postCourse;
