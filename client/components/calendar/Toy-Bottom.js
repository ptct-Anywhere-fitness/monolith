import React from 'react';
import styled from 'styled-components';

import Square from './Toy-Bottom-Square';

// ==============================================

const NUM_ROWS = 7;
const NUM_COLS = 7;
const NUM_SQUARES = NUM_ROWS * NUM_COLS;

// const r = (idx) => Math.floor(idx / NUM_COLS);
// const c = (idx) => idx % NUM_COLS;

// ==============================================

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUM_ROWS}, 1fr);
  grid-template-rows: repeat(${NUM_COLS}, 1fr);
  /* gap: 1px; */
  height: 300px;
  width: 300px;
  /* background: #121212; */
  /* background: rgba(0, 0, 0, 0.5); */
  color: white;
  border: solid black 5px;
`;
const Square_ = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background: #121212;
  color: white;

  &.dayName {
    background: #000000;
    color: lightgray;
  }
`;

// ==============================================

export default function ToyBottom({
  num_blanks,
  // num_blanks_end,
  days_in_month,
  range_on,
  idx_1,
  idx_2,
  setRangeOn,
  setIdx1,
  setIdx2,
}) {
  // --------------------------------------------

  // --------------------------------------------

  return (
    <Container style={{ zIndex: 0 }}>
      <Square_ className='dayName'>Su</Square_>
      <Square_ className='dayName'>Mo</Square_>
      <Square_ className='dayName'>Tu</Square_>
      <Square_ className='dayName'>We</Square_>
      <Square_ className='dayName'>Th</Square_>
      <Square_ className='dayName'>Fr</Square_>
      <Square_ className='dayName'>Sa</Square_>
      {
        [...Array(NUM_SQUARES - 7)].map((_, i) => {
          // i:   [0, 6*7=42)
          // idx: [7, 42 + 7]

          let idx = i + 7;

          // Region 1:                               i < num_blanks
          // Region 2:                 num_blanks <= i < days_in_month - blanks_end
          // Region 3: days_in_month - blanks_end <= i

          return i < num_blanks || i >= days_in_month + num_blanks ? (
            <Square_ />
          ) : (
            <Square
              num_blanks={num_blanks}
              num={i - num_blanks + 1}
              idx={idx}
              idx_1={idx_1}
              idx_2={idx_2}
              range_on={range_on}
              setRangeOn={setRangeOn}
              setIdx1={setIdx1}
              setIdx2={setIdx2}
            />
          ); // return ();
        }) // .map(() => {})
      }{' '}
      {/**/}
    </Container>
  );
}

// ==============================================
