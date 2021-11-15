import { useState, useRef } from 'react';

import { element_geometry } from './geometry.js';

// ==============================================

export default function Canvas({ setDurationMinInput, setDurationMaxInput }) {
  // --------------------------------------------

  const CANVAS_WIDTH = 400;
  const MAX_VAL = 120;
  const MIN_VAL = 1;

  // --------------------------------------------

  const [click_num, setClickNum] = useState(1);

  // --------------------------------------------

  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  //   return () => setMounted(false);
  // }, []);

  // --------------------------------------------

  const canvas_ref = useRef();

  // --------------------------------------------

  const canvas_click_handler = (e) => {
    // - - - - - - - - - - - - - - - - - - - - -

    function get_mouse_coordinates(event) {
      // TODO: Only calculate this once (on page load)
      //       -Or when the screen is resized.
      const { x1, y1 } = element_geometry(canvas_ref.current);
      // -(x1, y1) is the upper-left corner of the canvaas.
      // -Since (clientX, clientY) are the viewport coordinates,
      //  we need to shift them by the upper left corner
      //  of the canvas to get the coordinates inside
      //  the canvas.

      const [x, y] = [event.clientX, event.clientY];
      return [x - x1, y - y1];
    }

    // - - - - - - - - - - - - - - - - - - - - -

    // TODO: Get this outside of this click function
    // Step 0: get context
    const ctx = canvas_ref.current.getContext('2d');
    // console.log(ctx);

    // Step 1: Get mouse coordinates (canvas-coordinates)
    const [x, y] = get_mouse_coordinates(e);
    // console.log(`(x, y)  :  (${x}, ${y})`);

    // Step 2: Draw circle at location clicked
    const half_canvas_height = canvas_ref.current.height / 2;

    // - - - - - - - - - - - - - - - - - - - - -

    function drawCircle(circle) {
      ctx.beginPath();
      // ctx.arc(circle.x - x1, circle.y - y1, circle.size, 0, Math.PI * 2);

      const size = 30;
      ctx.arc(circle.x, half_canvas_height, size, 0, Math.PI * 2);
      // ctx.fillStyle = 'purple';
      ctx.fill();
    }

    // - - - - - - - - - - - - - - - - - - - - -

    // Step 3: Set value of slider and draw circle

    if (click_num === 1) {
      // 3.2: Clear canvas:

      ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height);

      const scale_factor = x / CANVAS_WIDTH;
      const left_val = Math.round(MAX_VAL * scale_factor);

      // debugger;
      setDurationMinInput(left_val);
      setClickNum(2);

      ctx.fillStyle = 'red';
    } else {
      const scale_factor = x / CANVAS_WIDTH;
      const right_val = Math.round(MAX_VAL * scale_factor);

      // debugger;
      setDurationMaxInput(right_val);
      setClickNum(1);

      ctx.fillStyle = 'green';
    }

    drawCircle({ x, y });
  };
  // --------------------------------------------

  return (
    <>
      <canvas
        ref={canvas_ref}
        id='canvas'
        width={`${CANVAS_WIDTH}px`}
        height='50px'
        style={{ background: 'lightgray', borderRadius: '5px' }}
        onClick={canvas_click_handler}
      ></canvas>
    </>
  );
}
