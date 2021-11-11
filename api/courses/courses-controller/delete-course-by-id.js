const HttpError = require('../../helpers/http-error');
const Courses = require('../courses-model');

// ==============================================

// | N   | Method | Endpoint                | Description                                                                                                                     |
// | --- | ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
// | 5   | DELETE | /api/courses/:id          | Removes the course with the specified id and returns the **deleted course object**                                                  |
//
//
// - If the _course_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON: `{ message: "The course with the specified ID does not exist" }`.
//
// - If there's an error in removing the _course_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON: `{ message: "The course could not be removed" }`.
//
// ==============================================

// (5) [DELETE]  /api/courses/:id
const deleteCourseById = (req, res, next) => {
  const id = req.params.id;
  console.log(`[DELETE]  /api/courses/${id}`);

  Courses.remove(id)
    .then((deleted_course) => {
      console.log('deleted_course: ', deleted_course);

      if (!deleted_course) {
        // - The _course_ with the specified `id` is not found:
        // return res.status(404).json({
        //   message: 'The course with the specified ID does not exist',
        // });
        return next(
          new HttpError('The course with the specified ID does not exist', 404)
        );
      }

      res.status(201).json({ deleted_course });
    })
    .catch(() => {
      // - There's an error in removing the _course_ from the database:
      // res.status(500).json({ message: 'The course could not be removed' });
      next(new HttpError('The course could not be removed', 500));
    });
};

// ==============================================

module.exports = deleteCourseById;
