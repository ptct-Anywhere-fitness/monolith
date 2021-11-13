export const calc_days_in_month = (year, month) => (
  //      jan                    feb    mar apr may jun jul aug sep oct nov dec
  //       1                      2      3   4   5   6   7   8   9  10  11  12
  [-1e10, 31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
);

// ==============================================

export const date2day = (year, month, _date_) => {
  // Description:
  //  -map date to day of week:   date -> weekday
  // Inputs:
  //  -year:   (int)
  //  -month:  (int)
  //  -_date_: (int)
  // Output:
  //  -_day_:  (string) 

  
  const days_in_this_month = calc_days_in_month(year, month);

  const calc_days_so_far_in_current_year = (year, month, date) => {
    let days_so_far_in_current_year = 0;
    for (let i = month; i > 0; i--)
      days_so_far_in_current_year += calc_days_in_month(year, i);
    days_so_far_in_current_year -= calc_days_in_month(year, month) - date;
    return days_so_far_in_current_year;
  };
  const days_so_far_in_current_year = calc_days_so_far_in_current_year(year, month, _date_);
  // console.log('days_so_far_in_current_year: ', days_so_far_in_current_year);

  const test_1 = (() => {
    console.log('TESTING');
    console.log('TESTING');
    console.log('TESTING');
    console.log('TESTING');
    console.log('TESTING');
    console.log('TESTING');
    console.log('TESTING');
    // Tests Here:
    // 1. calc_days_so_far_in_current_year(2021, 1, 1)   === 1
    // 2. calc_days_so_far_in_current_year(2021, 1, 31)  === 31
    // 3. calc_days_so_far_in_current_year(2021, 2, 1)   === 32
    // 4. calc_days_so_far_in_current_year(2021, 12, 31) === 365
    // 5. calc_days_so_far_in_current_year(2020, 12, 31) === 366
    if (calc_days_so_far_in_current_year(2021, 1, 1) !== 1)
      console.error('error! 1');
    if (calc_days_so_far_in_current_year(2021, 1, 31) !== 31)
      console.error('error! 2');
    if (calc_days_so_far_in_current_year(2021, 2, 1) !== 32)
      console.error('error! 3');
    if (calc_days_so_far_in_current_year(2021, 12, 31) !== 365)
      console.error('error! 4');
    if (calc_days_so_far_in_current_year(2020, 12, 31) !== 366)
      console.error('error! 5');
    console.log('DONE TESTING!!!');
    console.log('DONE TESTING!!!');
    console.log('DONE TESTING!!!');
  });

  // 2021-01-01 === date_idx = 0
  const years_since_2021 = year - 2021;
  let date_idx;
  if (years_since_2021 > 0) { // year > 2021
    const idx2 = Math.floor((years_since_2021 + 1) / 4);
    const idx1 = years_since_2021 - idx2;
    const days_in_years_between_2021_and_current_year = idx1 * 365 + idx2 * 366;
    date_idx = days_so_far_in_current_year + days_in_years_between_2021_and_current_year;
    // console.log('year: ', year, ',  month: ', month, ',  _date_: ', _date_,  'idx1: ', idx1, ',  idx2: ', idx2);
  } 
  else if (years_since_2021 < 0) { // year < 2021
    // TODO: Throw error!
  }
  else {
    date_idx = days_so_far_in_current_year;
  }

  // date_idx uses zero-based indexing
  date_idx--;
  // console.log('date_idx: ', date_idx);

  // const weekday_map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const weekday_map_2021 = ['fri', 'sat', 'sun', 'mon', 'tue', 'wed', 'thu'];
  
  const _weekday_ = weekday_map_2021[date_idx % 7];
  // console.log('_weekday_: ', _weekday_);

  return _weekday_;
};

// ==============================================

const test_2 = (() => {
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  console.log('date2day TESTING');
  // Tests Here:
  // 1. calc_days_so_far_in_current_year(2021, 1, 1)   === 1
  // 2. calc_days_so_far_in_current_year(2021, 1, 31)  === 31
  // 3. calc_days_so_far_in_current_year(2021, 2, 1)   === 32
  // 4. calc_days_so_far_in_current_year(2021, 12, 31) === 365
  // 5. calc_days_so_far_in_current_year(2020, 12, 31) === 366
  if (date2day(2021, 1, 1) !== 'fri')
    console.error('date2day error! 1');
  if (date2day(2021, 1, 31) !== 'sun')
    console.error('date2day error! 2');
  if (date2day(2021, 2, 1) !== 'mon')
    console.error('date2day error! 3');
  if (date2day(2021, 12, 31) !== 'fri')
    console.error('date2day error! 4');
  if (date2day(2022, 1, 1) !== 'sat')
    console.error('date2day error! 5');


  // TODO: Fix this error:
  // TODO: Fix this error:
  // TODO: Fix this error:
  // TODO: Fix this error:
  // TODO: Fix this error:
  // TODO: Fix this error:
  // -idx1 * 365 + idx2 * 366; should count up idx2 in the year AFTER the yeap year
  //  => in 2024 idx2 should be 0
  //  => in 2025 idx2 should be 1

  if (date2day(2024, 2, 29) !== 'thu')
    console.error('date2day error! 6... date2day(2024, 2, 29): ', date2day(2024, 2, 29));
  if (date2day(2024, 12, 31) !== 'tue')
    console.error('date2day error! 7... date2day(2024, 12, 31): ', date2day(2024, 12, 31));
  if (date2day(2025, 1, 1) !== 'wed')
    console.error('date2day error! 8... date2day(2025, 1, 1): ', date2day(2025, 1, 1));
  console.log('date2day DONE TESTING!!!');
  console.log('date2day DONE TESTING!!!');
  console.log('date2day DONE TESTING!!!');
});

// ==============================================