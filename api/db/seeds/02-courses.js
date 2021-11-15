exports.seed = function (knex, Promise) {
  // --------------------------------------------

  // const type_map = [
  //   'All Types',
  //   'Type 1:  Yoga',
  //   'Type 2: Weight Lifting',
  //   'Level 3: Jogging',
  //   'Level 4: Pilates',
  // ];
  const type_arr = [1, 2, 3, 4];
  const intensity_arr = [1, 2, 3]; // 1: Easy, 2: Moderate, 3: Extreme
  const duration_arr = [40, 75, 100]; // minutes
  //                 30   |  60   | 90  |   120
  const price_arr = [1000, 2000, 3000];

  const date_arr = ['2021-12-01'];
  for (let i = 0; i <= 2; ++i) {
    for (let j = 1; j <= 9; ++j) {
      date_arr.push(`2021-12-${i}${j}`);
    }
  }

  const city_arr = ['New York', 'Los Angelas', 'Seattle', 'Dallas'];
  const title_matrix = [
    ['Beginner Yoga', 'Intermediate Yoga', 'Advanced Yoga'],
    [
      'Beginner Weight-Lifting',
      'Intermediate Weight-Lifting',
      'Advanced Weight-Lifting',
    ],
    ['Beginner Jogging', 'Intermediate Jogging', 'Advanced Jogging'],
    ['Beginner Pilates', 'Intermediate Pilates', 'Advanced Pilates'],
  ];

  // --------------------------------------------

  function randInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // --------------------------------------------

  function randElem(arr) {
    return arr[randInterval(0, arr.length - 1)];
  }

  // --------------------------------------------

  const objs = [];

  const num_rows = title_matrix.length;
  const num_cols = title_matrix[0].length;
  for (let title_idx = 0; title_idx < num_rows; ++title_idx) {
    const type = type_arr[title_idx]; //type_arr[title_idx];
    // const city = city_arr[title_idx];
    for (let title_jdx = 0; title_jdx < num_cols; ++title_jdx) {
      objs.push({
        title: title_matrix[title_idx][title_jdx],
        type,
        intensity: intensity_arr[title_jdx],
        duration: randElem(duration_arr),
        price: randElem(price_arr),
        date: randElem(date_arr),
        time: '13:00:00.0-06',
        registered_attendees: 0,
        max_class_size: 10,
        // details: '...',
        city: randElem(city_arr),
      });
    }
  }
  console.log('objs: ', objs);

  // --------------------------------------------

  return knex('courses').insert(objs);

  // --------------------------------------------
};
