exports.seed = function (knex, Promise) {
  return knex('orders').insert([
    { user_id: 1, total: 100 },
    { user_id: 1, total: 200 },
    { user_id: 2, total: 300 },
  ]);
};
