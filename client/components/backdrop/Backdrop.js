import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { gsap } from 'gsap';

import css from './Backdrop.module.scss';

// ==============================================

const Backdrop = ({ show, children }) => {
  // --------------------------------------------

  const duration = 0.275;

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
      if (tl.current /* want to check if tl.current is undefined */) {
        tl.current?.reverse();
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
      {children}
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
