import React, { useState, useEffect } from 'react';
// import styled from 'styled-components'
import ToyTop from './Toy-Top';
import ToyBottom from './Toy-Bottom';

// ==============================================

const Toy1 = ({ num_blanks, days_in_month, setDayRange1, setDayRange2 }) => {
  // --------------------------------------------

  const [idx_1, setIdx1] = useState(null);
  const [idx_2, setIdx2] = useState(null);
  const [range_on, setRangeOn] = useState(false);

  // --------------------------------------------
  // -When idx_1 or idx_2 is modified, update the
  //  endpoints of the date range in top-level
  //  calendar state:
  // TODO: If user changes month (or clicks off of date range)
  //       reset date range state.
  const idx2idxRangeEndpoint = (idx) => idx - 7 - num_blanks + 1;
  useEffect(() => setDayRange1(idx2idxRangeEndpoint(idx_1)), [idx_1]);
  useEffect(() => setDayRange2(idx2idxRangeEndpoint(idx_2)), [idx_2]);

  // --------------------------------------------

  return (
    <div style={{ position: 'relative' }}>
      <ToyTop range_on={range_on} idx_1={idx_1} idx_2={idx_2} />

      <ToyBottom
        num_blanks={num_blanks}
        days_in_month={days_in_month}
        range_on={range_on}
        idx_1={idx_1}
        idx_2={idx_2}
        setRangeOn={setRangeOn}
        setIdx1={setIdx1}
        setIdx2={setIdx2}
      />
    </div>
  );
};

// ==============================================

export default Toy1;

// ==============================================
