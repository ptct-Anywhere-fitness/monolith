import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Button from './Panels-Button';

// ==============================================

const Container = styled.div`
  border: solid black 5px;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
`;
const Section1 = styled.div`
  height: 90%;
  position: relative;

  .front,
  .back {
    height: 100%;
    width: 100%;
    position: absolute;
    transition: opacity 0.5s ease;
  }

  .front {
    z-index: 1;
    opacity: 1;
  }

  .back {
    z-index: -1;
    opacity: 0;
  }
`;
const Section2 = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 50%;
    background: #bb86fc;
  }
`;

// ==============================================

export default function Panels() {
  // --------------------------------------------

  const [tab_in_front, setTabInFront] = useState('A');

  const underline_ref = useRef(null);

  useEffect(() => {
    const elem = underline_ref.current;
    console.clear();
    console.log('elem: ', elem);

    if (tab_in_front === 'A') {
      gsap.to(elem, { x: '0', duration: 0.2 });
    } else if (tab_in_front === 'B') {
      gsap.to(elem, { x: '100%', duration: 0.2 });
    }
  }, [tab_in_front]);

  // --------------------------------------------

  return (
    <Container>
      <Section2>
        <Button
          setTabInFront={setTabInFront}
          tab_in_front={tab_in_front}
          tab={'A'}
          label={'User'}
        ></Button>
        <Button
          setTabInFront={setTabInFront}
          tab_in_front={tab_in_front}
          tab={'B'}
          label={'Admin'}
        ></Button>
        <div ref={underline_ref} className='underline'></div>
      </Section2>
      <Section1>
        <div className={tab_in_front === 'A' ? 'front' : 'back'}>
          <h1>A</h1>
        </div>
        <div className={tab_in_front === 'B' ? 'front' : 'back'}>
          <h1>B</h1>
        </div>
      </Section1>
    </Container>
  );
}

// ==============================================
