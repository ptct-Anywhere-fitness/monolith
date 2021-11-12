exports.seed = function (knex, Promise) {
  return knex('courses').insert([
    {
      // Name (title)
      // course.string('name', 50).notNullable();
      title: 'course-1',

      // Type (category)
      // course.string('category', 50);
      category: 'category-1',

      details: 'details-1',
      price: 1111,
      quantity_in_stock: 1,

      // Start time
      // date — table.date(name)
      // course.date('date');
      // course.time('time');
      datetime: '2021-11-12 03:51:53.863049-06',
      date: '2021-11-12',
      time: '03:51:53.863049-06',

      // const date = new Date();
      // date.getDate();
      // date.getDay();
      // date.getTime(); // jan 1, 1970
      // const date2 = new Date('07/11/19'); // July 11, 2019
      // const d_date = date - date2;
      // d_date / 1000 /* ms. -> s. */ / 60 /* s. -> min. */ / 60 /* min. -> hr. */ / 24 /* hr. -> days */;

      // Duration
      // course.integer('duration').unsigned();
      duration: 30,

      // Intensity level
      // course.integer('intensity').unsigned();
      intensity: 1,

      // Location
      // course.string('city', 50);
      city: 'tulsa',

      // Current number of registered attendees
      // course.integer('registered_attendees').unsigned();
      registered_attendees: 0,

      // Max class size
      // course.integer('max_class_size').unsigned();
      max_class_size: 10,
    },
    {
      title: 'course-2',
      category: 'category-2',
      details: 'details-2',
      price: 2222,
      quantity_in_stock: 2,
      datetime: '2022-01-01 00:00:00.0-06',
      date: '2022-01-01',
      time: '00:00:00.0-06',
      duration: 30,
      intensity: 1,
      city: 'tulsa',
      registered_attendees: 0,
      max_class_size: 10,
    },
    {
      title: 'course-3',
      category: 'category-3',
      details: 'details-3',
      price: 3333,
      datetime: '2022-01-01 00:00:00.0-06',
      date: '2022-01-01',
      time: '00:00:00.0-06',
      duration: 30,
      intensity: 1,
      city: 'tulsa',
      registered_attendees: 0,
      max_class_size: 10,
      quantity_in_stock: 3,
    },
  ]);
};
