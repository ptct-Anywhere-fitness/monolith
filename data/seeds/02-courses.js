exports.seed = function (knex, Promise) {
  return knex('courses').insert([
    {
      title: 'course-1',
      category: 'category-1',
      details: 'details-1',
      price: 1111,
      quantity_in_stock: 1,
    },
    {
      title: 'course-2',
      category: 'category-2',
      details: 'details-2',
      price: 2222,
      quantity_in_stock: 2,
    },
    {
      title: 'course-3',
      category: 'category-3',
      details: 'details-3',
      price: 3333,
      quantity_in_stock: 3,
    },
  ]);
};
