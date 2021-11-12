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
  const [new_course_obj] = await db('courses').insert(course, [
    'id',
    'title',
    // 'details',
    // 'price',
    // 'date',
    // 'time',
    // 'duration',
  ]);
  return new_course_obj;
}

// ==============================================

function update(id, course) {
  return db('courses').where('id', Number(id)).update(course);
}

// ==============================================

async function remove(id) {
  console.log('remove');
  const to_be_deleted = await findById(id);
  console.log('courses-model --> to_be_deleted: ', to_be_deleted);
  await db('courses').where('id', Number(id)).del();
  return to_be_deleted;
}

// ==============================================

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
