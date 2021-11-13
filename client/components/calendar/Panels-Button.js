import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import gsap from 'gsap'

import Button_Ripple from './Panel-Button-Ripple'

// ==============================================

const _Button_ = styled.div`
    height: 100%;
    width: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;

    /* background: darkorchid; */
    color: white;
`;

// ==============================================

export default function Button({label, setTabInFront, tab_in_front, tab}) {

  // --------------------------------------------
  // --------------------------------------------

  return (
    <_Button_ onClick={() => {
      setTabInFront(tab);
    }}
      style={tab_in_front === tab ? 
        {
          background: 'blue'
        } : 
        {
          background: 'black'
        }}
    >
      <Button_Ripple label={label} />
    </_Button_>
  );
};

// ==============================================