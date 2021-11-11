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
const deleteCourseById = (req, res) => {
  const id = req.params.id;
  console.log(`[DELETE]  /api/courses/${id}`);

  Courses.remove(id)
    .then((returned_id) => {
      console.log('returned_id: ', returned_id);

      if (!returned_id) {
        // - The _course_ with the specified `id` is not found:
        return res.status(404).json({
          message: 'The course with the specified ID does not exist',
        });
      }

      res.status(201).json({ fuck: returned_id });
    })
    .catch(() => {
      // - There's an error in removing the _course_ from the database:
      res.status(500).json({ message: 'The course could not be removed' });
    });
};

// ==============================================

module.exports = deleteCourseById;
