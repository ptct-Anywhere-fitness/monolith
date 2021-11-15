exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { username: 'lao_tzu', password: '1234', role: 'customer' },
    { username: 'socrates', password: '1234', role: 'customer' },
    { username: 'seneca', password: '1234', role: 'customer' },
    { username: 'hypatia', password: '1234', role: 'customer' },
  ]);
};
