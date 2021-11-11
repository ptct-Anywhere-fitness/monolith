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

async function insert(course) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [new_course_obj] = await db('courses').insert(course, ['id', 'title']);
  return new_course_obj;
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
