import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Toy1 from './Toy-1';
import { date2day, calc_days_in_month as dNm } from './calendar-helper.js';

// ==============================================
const Cal = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 300px;
  background: #121212;
  /* background: black; */
  .top {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 50px;
    width: 100%;
    color: white;
    svg {
      transition: all 0.2s ease;
    }
    svg:hover {
      cursor: pointer;
      transform: scale(1.5, 1.5);
      color: deepskyblue;
    }
    p {
      width: fit-content;
    }
  }
  .bottom {
    flex-grow: 1;
    width: 100%;
  }
`;
// ==============================================

export default function Calendar({ setDate, setDays }) {
  // --------------------------------------------

  const month_int2String = (m) =>
    [
      null,
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ][m];

  const calc_num_blanks = (y, m, d) =>
    ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(
      date2day(y, m, d)
    );

  const get_todays_date = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return [year, month, day];
  };

  // --------------------------------------------

  // TODO: Initialize to whatever the current month/year/day
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  // TODO: -day should be set to whatever the current day is
  //        then on load have a different colorered circle
  //        around todays date
  //      -also, do not allow for selection beyond the current date
  //      -also, do not allow idx_2 to be less than idx_1,
  //       or better yet, if idx_2 > idx_1 then just swap order.
  // const [day, setDay] = useState(null);
  useEffect(() => {
    const [y, m /*, d */] = get_todays_date();
    setYear(y);
    setMonth(m);
    // setDay(d);
  }, []);

  // --------------------------------------------

  const [num_blanks, setNumBlanks] = useState(calc_num_blanks(year, month, 1));
  const [d_in_m, setNumDaysInMonth] = useState(dNm(year, month));
  // const [num_blanks_end, setNumBlanksEnd] = useState(
  // 6 - calc_num_blanks(year, month, d_in_m)
  // );
  // const [num_rows, setNumRows] = useState(
  //   Math.floor((d_in_m + num_blanks + num_blanks_end + 1) / 7)
  // );
  // const [num_Days, setNumDAYS] = useState(num_rows * 7);

  const [day_range_1, setDayRange1] = useState(null);
  const [day_range_2, setDayRange2] = useState(null);

  // --------------------------------------------

  useEffect(() => setDate({ day: day_range_1, month, year }), [day_range_1]);
  useEffect(() => setDays(day_range_2 - day_range_1 + 1), [day_range_2]);

  // --------------------------------------------

  useEffect(() => {
    const _num_blanks = calc_num_blanks(year, month, 1);
    setNumBlanks(_num_blanks);

    const _days_in_month = dNm(year, month);
    setNumDaysInMonth(_days_in_month);
    // const _num_blanks_end = 6 - calc_num_blanks(year, month, _days_in_month);
    // setNumBlanksEnd(_num_blanks_end);

    // const _num_rows = Math.floor(
    //   (_days_in_month + _num_blanks + _num_blanks_end + 1) / 7
    // );
    // setNumRows(_num_rows);
    // setNumDAYS(_num_rows * 7);

    // Update array of ref's to store one ref for each day:
    console.clear();
    console.log('days_in_month: ', d_in_m);
  }, [year, month]);

  // --------------------------------------------

  return (
    <div>
      <Cal>
        <div className='top'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-chevron-left'
            viewBox='0 0 16 16'
            onClick={() => setMonth(month - 1 > 0 ? month - 1 : month)}
          >
            <path
              fillRule='evenodd'
              d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
            />
          </svg>
          <p>
            {month_int2String(month)} {year}
          </p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-chevron-right'
            viewBox='0 0 16 16'
            onClick={() => setMonth(month + 1 <= 12 ? month + 1 : month)}
          >
            <path
              fillRule='evenodd'
              d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
            />
          </svg>
        </div>

        <div className='bottom' style={{ position: 'relative' }}>
          <Toy1
            num_blanks={num_blanks}
            days_in_month={d_in_m}
            setDayRange1={setDayRange1}
            setDayRange2={setDayRange2}
          />
        </div>
      </Cal>
    </div>
  );
}

// ==============================================
