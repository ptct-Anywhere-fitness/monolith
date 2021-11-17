exports.seed = function (knex, Promise) {
  return knex('order_2_product').insert([
    { course_id: 1, order_id: 1 },
    { course_id: 1, order_id: 2 },
    { course_id: 2, order_id: 2 },
    { course_id: 2, order_id: 3 },
    { course_id: 3, order_id: 1 },
    { course_id: 3, order_id: 3 },
  ]);
};
