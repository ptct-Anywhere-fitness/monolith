import { useState, useEffect, useRef } from 'react';

import { element_geometry, viewport_geometry } from './geometry.js';

// ==============================================

export default function Canvas({setDurationMinInput, setDurationMaxInput}) {

  // --------------------------------------------

  const CANVAS_WIDTH = 400;
  const MAX_VAL = 120;
  const MIN_VAL = 1;

   // --------------------------------------------

  const [click_num, setClickNum] = useState(1);

  // --------------------------------------------

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  // --------------------------------------------

  const canvas_ref = useRef();

  // --------------------------------------------

  const canvas_click_handler = (e) => {


    // - - - - - - - - - - - - - - - - - - - - - 

    function get_mouse_coordinates(event) {
      const [x, y] = [event.clientX, event.clientY];
      return [x, y];
    }

    // - - - - - - - - - - - - - - - - - - - - - 
    
    // console.log('clicked');
    const { x0, y0, x1, y1, w, h } = element_geometry(canvas_ref.current);
    // console.log('x0: ', x0);
    // console.log(`(x1, y1)  :  (${x1}, ${y1})`);

    // Step 0: get context
    const ctx = canvas_ref.current.getContext('2d');
    // console.log(ctx);
    

    // Step 1: Get mouse coordinates
    const [x, y] = get_mouse_coordinates(e);
    // console.log(`(x, y)  :  (${x}, ${y})`);

    // Step 2: Draw circle at location clicked
    const half_canvas_height = canvas_ref.current.height / 2;
   
    // - - - - - - - - - - - - - - - - - - - - - 
   
    function drawCircle(circle) {
      ctx.beginPath();
      // ctx.arc(circle.x - x1, circle.y - y1, circle.size, 0, Math.PI * 2);

      ctx.arc(
        circle.x - x1, 
        half_canvas_height, 
        circle.size, 
        0, 
        Math.PI * 2
      );
      // ctx.fillStyle = 'purple';
      ctx.fill();
    }

    // - - - - - - - - - - - - - - - - - - - - - 

    // Step 3: Set value of slider and draw circle
    
    
    
    if (click_num === 1) {
      // 3.2: Clear canvas:
      
      ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height);
      const scale_factor = x / CANVAS_WIDTH;
      setDurationMinInput(Math.round(Math.min(MAX_VAL * scale_factor, MAX_VAL)));
      setClickNum(2);
      ctx.fillStyle = 'red';
    } else {
      const scale_factor = x / CANVAS_WIDTH;
      setDurationMaxInput(Math.min(MAX_VAL * scale_factor, MAX_VAL));
      setClickNum(1);
      ctx.fillStyle = 'green';
    }
    
    drawCircle({
      x,
      y,
      size: 30,
    });

  }
  // --------------------------------------------

  return (
    <>
      <canvas 
        ref={canvas_ref} 
        id="canvas" 
        width={`${CANVAS_WIDTH}px`} 
        height="50px" 
        style={{background: 'lightgray', borderRadius: '5px'}} 
        onClick={canvas_click_handler}
      ></canvas>
    </>
  );
}
