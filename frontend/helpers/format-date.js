const formatTime_12hr = (time) => {
  // 2022-01-01T06:00:00.000Z  =>  2022-01-01
  // console.log('time:\n', time);

  // TODO: Fix the 12 & 24-o'clock hour edge case

  return (
    time &&
    `${String(Number(time.split(':')[0]) % 12).padStart(2, '0')}:${
      time.split(':')[1]
    } ${time.split(':')[0] >= 12 ? 'PM' : 'AM'}`
  );
};

// ==============================================

const formatTime_24hr = (time) => {
  // 2022-01-01T06:00:00.000Z  =>  2022-01-01
  // console.log('time:\n', time);
  return time && `${time.split(':')[0]}:${time.split(':')[1]}`;
};

// ==============================================

const formatDate = (date) => {
  // 2022-01-01T06:00:00.000Z  =>  2022-01-01
  // console.log('date:\n', date);
  return date && date.split('T')[0];
};

// ==============================================

export { formatTime_12hr, formatTime_24hr, formatDate };
