import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap/dist/gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);

// ==============================================

function FlipComp({ children }) {
  const el = useRef();

  useEffect(() => {}, []);

  return <span ref={el}>{children}</span>;
}

// ==============================================

export { FlipComp };
