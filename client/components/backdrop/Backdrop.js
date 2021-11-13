import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { gsap } from 'gsap';

import Spinner from 'react-bootstrap/Spinner';

import css from './Backdrop.module.scss';

// ==============================================

const Backdrop = ({ show }) => {
  // --------------------------------------------

  const duration = 0.25;

  // --------------------------------------------

  const [cssClassList, setCssClassList] = useState(
    `${css.backdrop} ${css.hide}`
  );

  // --------------------------------------------

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // --------------------------------------------

  const backdrop_ref = useRef();
  const tl = useRef();

  // --------------------------------------------

  useEffect(() => {
    console.log('show: ', show);

    if (show) {
      setCssClassList(css.backdrop);

      tl.current = gsap.timeline().to(backdrop_ref.current, {
        duration,
        background: 'rgba(0, 0, 0, 0.75)',
        onReverseComplete: () => {
          setCssClassList(`${css.backdrop} ${css.hide}`);
        },
      });
    } else if (!show && mounted) {
      if (tl) {
        tl.current.reverse();
      }
    }
  }, [show]);

  // --------------------------------------------

  // const classes = `${css.backdrop} ${show ? '' : css.hide}`;

  // --------------------------------------------

  const backdrop = (
    <div
      ref={backdrop_ref}
      className={cssClassList}
      // onClick={hideHandler}
    >
      <Spinner
        animation='border'
        role='status'
        variant='light'
        style={{
          position: 'absolute',
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 50px)',
          height: '50px',
          width: '50px',
        }}
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );

  // --------------------------------------------

  return mounted
    ? createPortal(backdrop, document.getElementById('backdrop-hook'))
    : null;

  // --------------------------------------------
};

// ==============================================

export default Backdrop;
