import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

// ==============================================

const NUM_ROWS     = 7;
const NUM_COLS     = 7;
const NUM_SQUARES  = NUM_ROWS * NUM_COLS;

const r = idx => Math.floor(idx / NUM_COLS);
const c = idx => idx % NUM_COLS;

// ==============================================

const Square_ = styled.div` position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background: #121212;
  color: white;
`;
const Circle = styled.div` position: absolute;

  height: 100%;
  width: 100%;

  &.show {
    border: solid lightgray 1px;
    border-radius: 50%;
  }
  &.solid-circle {
    display: grid;
    place-items: center;
    background: #96CCF7;
    color: #141A20;
    border: solid #8F989F 1px;
    border-radius: 100vh;
    z-index: 2;
  }
`;

// ==============================================

export default function Square({num, idx, idx_1, idx_2, range_on, setRangeOn, setIdx1, setIdx2, num_blanks}) {

  // --------------------------------------------

  return (
    <Square_ 
      key={idx} 
      onClick={(e) => {
        if (range_on === false) {
          e.target.classList.add('solid-circle');

          if (idx_1 === null) {
            console.log('PATH 1');
            setIdx1(idx);
          } else if (idx_2 === null && idx_1 < idx) {
            console.log('PATH 2');
            setIdx2(idx);
            setRangeOn(true);
          } 
          // console.log('idx: ', idx, ', row(idx): ', r(idx), ', col(idx): ', c(idx), ', idx_1: ', idx_1, ', idx_2: ', idx_2);
        }
      }} // onClick={() => {}}
    >
      <Circle style={{zIndex: 1}}
        onMouseEnter={(e) => {
          if (range_on === false) {
            // console.log('enter');
            e.target.classList.add('show');
          }
        }}
        onMouseLeave={(e) => {
          if (range_on === false) {
            // console.log('leave');
            e.target.classList.remove('show');
          }
        }}
        onClick={(e) => {
          if (range_on === false || range_on && idx_2 === null) {


            // This is where the graphic text for the day-range endpoints are set

            e.target.innerText = `${idx-7-num_blanks+1}`;
            e.target.style.fontWeight = 'bold';
          }
        }}
      >
        
      </Circle>
      {num}
    </Square_> // <Square />
  );
};

// ==============================================