const db = require('../../db/db-config');

// ==============================================

function find() {
  return db('orders');
}

// ==============================================

function findById(id) {
  // return db('orders')
  //   .where({ id: Number(id) })
  //   .first();
  // return db.raw(`
  //   select
  //     Order_2_Product.order_id,
  //     Courses.title as product_name,
  //     Courses.price as product_price
  //   from Courses
  //   join Order_2_Product on Courses.id = Order_2_Product.course_id
  //   where Order_2_Product.order_id = ${id};
  // `);
  return db('courses')
    .join('order_2_product', 'courses.id', 'order_2_product.course_id')
    .select(
      'order_2_product.order_id',
      'order_2_product.course_id as product_id',
      // 'order_2_product.product_quantity',
      'courses.title as product_name',
      'courses.price as product_price'
    )
    .where('order_2_product.order_id', id);
}

// ==============================================

async function insert({ user_id, total, cart }) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL

  console.log('insert - user_id: ', user_id);

  // -Step 1: Add new entry into Orders table (user-id FK)
  const [new_order_obj] = await db('orders').insert({ user_id, total }, [
    'id',
    'user_id',
    'total',
  ]);
  return new_order_obj;

  // -Step 2: Place cart items in order_2_product table
}

// ==============================================

function getUsersOrders() {
  // select -- Select columns
  // 	o.total as total,
  // 	u.username as username
  // from users as u -- from left table
  // left join orders as o on u.user_id = o.user_id_fk; -- join tables
  //
  // return db.raw(`
  //   select
  //     o.total as total,
  //     u.username as username
  //   from users as u
  //   left join orders as o on u.user_id = o.user_id_fk;
  // `);
  //
  return db('users as u')
    .join('orders as o', 'u.user_id', 'o.user_id_fk')
    .select(
      'o.id as order_id',
      'o.total',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.user_id'
    );
  // .where('u.user_id', user_id);
}

// ==============================================

module.exports = {
  find,
  findById,
  getUsersOrders,
  insert,
};
