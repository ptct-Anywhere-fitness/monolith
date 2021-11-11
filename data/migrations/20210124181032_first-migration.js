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
    .createTable('courses', (product) => {
      product.increments('id');
      product.string('title', 50).notNullable();
      product.string('category', 50);
      product.string('details', 256);
      product.integer('price').unsigned();
      product.integer('quantity_in_stock').unsigned();
    });
};

// ==============================================

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('courses').dropTableIfExists('users');
};
