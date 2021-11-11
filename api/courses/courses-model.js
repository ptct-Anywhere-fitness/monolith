const db = require('../../data/db-config');

// ==============================================

function find() {
  return db('courses');
}

// ==============================================

function findById(id) {
  return db('courses')
    .where({ id: Number(id) })
    .first();
}

// ==============================================

function insert(course) {
  return db('courses')
    .insert(course)
    .then((ids) => ({ id: ids[0] }));
}

// ==============================================

function update(id, course) {
  return db('courses').where('id', Number(id)).update(course);
}

// ==============================================

function remove(id) {
  return db('courses').where('id', Number(id)).del();
}

// ==============================================

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
