const db = require('../../data/db-config');

// ==============================================

function find() {
  return db('orders');
}

// ==============================================

function findById(id) {
  return db('orders')
    .where({ id: Number(id) })
    .first();
}

// ==============================================

function getUsersOrders() {
  // select -- Select columns
  // 	o.total as total,
  // 	u.username as username
  // from users as u -- from left table
  // left join orders as o on u.user_id = o.user_id_fk; -- join tables
  return db.raw(`
    select
      o.total as total,
      u.username as username
    from users as u
    left join orders as o on u.user_id = o.user_id_fk;
  `);
}

// ==============================================

module.exports = {
  find,
  findById,
  getUsersOrders,
};