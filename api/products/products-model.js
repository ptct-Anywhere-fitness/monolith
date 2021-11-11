const db = require('../../data/db-config');

// ==============================================

function find() {
  return db('products');
}

// ==============================================

function findById(id) {
  return db('products')
    .where({ id: Number(id) })
    .first();
}

// ==============================================

function insert(product) {
  return db('products')
    .insert(product)
    .then((ids) => ({ id: ids[0] }));
}

// ==============================================

function update(id, product) {
  return db('products').where('id', Number(id)).update(product);
}

// ==============================================

function remove(id) {
  return db('products').where('id', Number(id)).del();
}

// ==============================================

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
