exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id');
      tbl.string('username', 200).notNullable();
      tbl.string('password', 200).notNullable();
      tbl.string('first_name', 200);
      tbl.string('last_name', 200);
      tbl.string('role', 200).notNullable();
      tbl.timestamps(false, true);
    })
    .createTable('courses', (tbl) => {
      tbl.increments('id');
      tbl.string('title', 50).notNullable();
      // tbl.string('category', 50);
      tbl.string('details', 256);
      tbl.integer('price').unsigned();
      // tbl.integer('quantity_in_stock').unsigned();

      // Name (title)
      // tbl.string('name', 50).notNullable();

      // Type (category)
      // tbl.string('category', 50);

      // Start time
      // date — table.date(name)
      // tbl.date('date');
      // tbl.time('time');
      // tbl.datetime('datetime');
      tbl.date('date');
      tbl.time('time');

      // Duration
      tbl.integer('duration').unsigned();

      // Intensity level
      tbl.integer('intensity').unsigned();

      // Type
      tbl.integer('type').unsigned();
      // const type_map = [
      //   'All Types',
      //   'Type 1:  Yoga',
      //   'Type 2: Insanity',
      //   'Level 3: RIPPED',
      //   'Level 4: Pilates',
      // ];

      // Location
      tbl.string('city', 50);

      // Current number of registered attendees
      tbl.integer('registered_attendees').unsigned();

      // Max class size
      tbl.integer('max_class_size').unsigned();
    })
    .createTable('orders', (tbl) => {
      tbl.increments('id');
      tbl.integer('total').notNullable();
      tbl
        .integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.timestamps(false, true);
    })
    .createTable('order_2_product', (tbl) => {
      // -Primary-key
      tbl.increments('id');

      // -Foriegn-key (Products)
      tbl
        .integer('course_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE') // vs. RESTRICT
        .onUpdate('CASCADE');

      // -Foreign-key (Orders)
      tbl
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE') // vs. RESTRICT
        .onUpdate('CASCADE');
    });
};

// ==============================================

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('order_2_product')
    .dropTableIfExists('orders')
    .dropTableIfExists('courses')
    .dropTableIfExists('users');
};
