import React from 'react';
import styled from 'styled-components';

// ==============================================

const NUM_ROWS = 7;
const NUM_COLS = 7;
// const NUM_SQUARES = NUM_ROWS * NUM_COLS;

const r = (idx) => Math.floor(idx / NUM_COLS);
const c = (idx) => idx % NUM_COLS;

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
const Border = styled.div`
  /* background: #8F989F; */
  border: solid #8f989f 1px;
  border-radius: 100vh;
`;

// ==============================================

export default function ToyTop({ range_on, idx_1, idx_2 }) {
  // --------------------------------------------

  return (
    <div style={{ position: 'relative' }}>
      {range_on ? (
        <Container style={{ position: 'absolute', zIndex: 1 }}>
          {
            r(idx_2) === r(idx_1) ? (
              // Case 1:  row_idx_2 === row_idx_2
              <Border
                style={
                  range_on
                    ? {
                        gridColumnStart: `${c(idx_1) + 1}`,
                        gridColumnEnd: `${c(idx_2) + 2}`,
                        gridRowStart: `${r(idx_1) + 1}`,
                        gridRowEnd: `${r(idx_2) + 2}`,
                        background: 'rgba(255, 255, 255, 0.2)',
                      }
                    : {}
                }
              ></Border>
            ) : (
              // Case 2: row_idx_2 > row_idx_2
              <>
                {/* Case 2 - First Row */}
                <Border
                  style={
                    range_on
                      ? {
                          gridColumnStart: `${c(idx_1) + 1}`,
                          gridColumnEnd: `${NUM_COLS - 1 + 2}`,
                          gridRowStart: `${r(idx_1) + 1}`,
                          gridRowEnd: `${r(idx_1) + 2}`,
                          background: 'rgba(255, 255, 255, 0.2)',
                        }
                      : {}
                  }
                ></Border>

                {/* Case 2 - Middle Rows */}
                {
                  // ****************************************************
                  // Draw square covering all full rows between top and bottom rows containing idx_1 and idx_2
                  r(idx_2) - r(idx_1) > 1
                    ? [...Array(r(idx_2) - r(idx_1) - 1)].map((_, i) => {
                        // alert(r(idx_2) - r(idx_1));
                        const row_diff = r(idx_2) - r(idx_1);
                        if (row_diff < 4) {
                          return (
                            <Border
                              key={i}
                              style={
                                range_on
                                  ? {
                                      gridColumnStart: `${0 + 1}`,
                                      gridColumnEnd: `${NUM_COLS - 1 + 2}`,
                                      gridRowStart: `${r(idx_1) + 2 + i}`,
                                      gridRowEnd: `${r(idx_2) - 1 + 1 + i}`,
                                      background: 'rgba(255, 255, 255, 0.2)',
                                    }
                                  : {}
                              }
                            ></Border>
                          ); // return();
                        } // if()
                        else if (row_diff >= 4) {
                          return (
                            <Border
                              key={i}
                              style={
                                range_on
                                  ? {
                                      gridColumnStart: `${0 + 1}`,
                                      gridColumnEnd: `${NUM_COLS - 1 + 2}`,
                                      gridRowStart: `${r(idx_1) + 2 + i}`,
                                      gridRowEnd: `${
                                        r(idx_2) - 1 + 1 - (row_diff - 2) + i
                                      }`,
                                      background: 'rgba(255, 255, 255, 0.2)',
                                    }
                                  : {}
                              }
                            ></Border>
                          ); // return();
                        } // else if()
                      })
                    : null
                  // ****************************************************
                }

                {/* Case 2 - Last Row */}
                <Border
                  style={
                    range_on
                      ? {
                          gridColumnStart: `${0 + 1}`,
                          gridColumnEnd: `${c(idx_2) + 2}`,
                          gridRowStart: `${r(idx_2) + 1}`,
                          gridRowEnd: `${r(idx_2) + 2}`,
                          background: 'rgba(255, 255, 255, 0.2)',
                        }
                      : {}
                  }
                ></Border>
              </>
            ) // Case 2
          }
        </Container>
      ) : null}
    </div>
  );
}

// ==============================================
