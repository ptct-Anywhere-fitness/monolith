exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable();
      users.string('password', 200).notNullable();
      users.string('first_name', 200).notNullable();
      users.string('last_name', 200).notNullable();
      users.string('role', 200);
      users.timestamps(false, true);
    })
    .createTable('courses', (course) => {
      course.increments('id');
      course.string('title', 50).notNullable();
      // course.string('category', 50);
      course.string('details', 256);
      course.integer('price').unsigned();
      // course.integer('quantity_in_stock').unsigned();

      // Name (title)
      // course.string('name', 50).notNullable();

      // Type (category)
      // course.string('category', 50);

      // Start time
      // date — table.date(name)
      // course.date('date');
      // course.time('time');
      // course.datetime('datetime');
      course.date('date');
      course.time('time');

      // Duration
      course.integer('duration').unsigned();

      // Intensity level
      course.integer('intensity').unsigned();

      // Location
      course.string('city', 50);

      // Current number of registered attendees
      course.integer('registered_attendees').unsigned();

      // Max class size
      course.integer('max_class_size').unsigned();
    });
};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('courses').dropTableIfExists('users');
};
