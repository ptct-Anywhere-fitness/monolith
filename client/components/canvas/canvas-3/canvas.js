import { useState, useEffect, useRef } from 'react';

import { element_geometry, viewport_geometry } from './geometry.js';

// ==============================================

export default function Canvas() {

  // --------------------------------------------

  const CANVAS_WIDTH = 400;
  const MAX_VAL = 10;
  const MIN_VAL = 1;

   // --------------------------------------------

  const [click_1_mag, setClick1Mag] = useState(MIN_VAL);
  const [click_2_mag, setClick2Mag] = useState(MAX_VAL);
  const [click_num, setClickNum] = useState(1);

  useEffect(() => {
    console.log('click_1_mag: ', click_1_mag, '\tclick_2_mag: ', click_2_mag);
  }, [click_1_mag, click_2_mag]);

  // --------------------------------------------

  const canvas_ref = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if(mounted) {

      
      const ctx = canvas_ref.current.getContext('2d');
      console.log(ctx);
      ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height);

      const canvas_basics = () => {
        // fillRect();
        ctx.fillStyle='red';
        ctx.fillRect(20, 20, 150, 100);

        // strokeRect()
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'green';
        ctx.strokeRect(100, 200, 150, 100);

        // clearRect()
        ctx.clearRect(25, 25, 140, 90);

        // fillext()
        ctx.font = '30px Arial';
        ctx.fillStyle = 'purple';
        ctx.fillText('hello world', 400, 80);
      };
      // canvas_basics();

      const animation = () => {
        const circle = {
          x: 200,
          y: 200,
          size: 30,
          dx: 5,
          dy: 4
        };

        function drawCircle() {
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'purple';
          ctx.fill();
        }

        (function update() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawCircle();

          // change position
          circle.x += circle.dx;
          circle.y += circle.dy;

          // Detect side walls
          if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
            circle.dx *= -1;
          }

          // Detect top and bottom walls
          if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
            circle.dy *= -1;
          }

          requestAnimationFrame(update);
        })();
      };
      // animation();

      const draw_slider = () => {


        function drawCircle(circle) {
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'purple';
          ctx.fill();
        }

        drawCircle({
          x: 200,
          y: 200,
          size: 30,
          dx: 5,
          dy: 40
        });
      };
      // draw_slider();

    }
  }, [mounted]);

  // --------------------------------------------

  return (
    <>
      <canvas ref={canvas_ref} id="canvas" width={`${CANVAS_WIDTH}px`} height="50px" 
        style={{background: 'lightgray', borderRadius: '5px', 
          // position: 'absolute', top: 0, left: 0
        }} onClick={(e) => {
        function get_mouse_coordinates(event) {
          const [x, y] = [event.clientX, event.clientY];
          return [x, y];
        }
        
        console.log('clicked');
        const { x0, y0, x1, y1, w, h } = element_geometry(canvas_ref.current);
        console.log('x0: ', x0);
        console.log(`(x1, y1)  :  (${x1}, ${y1})`);

        // Step 0: get context
        const ctx = canvas_ref.current.getContext('2d');
        console.log(ctx);
        

        // Step 1: Get mouse coordinates
        const [x, y] = get_mouse_coordinates(e);
        console.log(`(x, y)  :  (${x}, ${y})`);

        // Step 2: Draw circle at location clicked
        function drawCircle(circle) {
          ctx.beginPath();
          // ctx.arc(circle.x - x1, circle.y - y1, circle.size, 0, Math.PI * 2);

          const half_canvas_height = canvas_ref.current.height / 2;

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

        

        // Step 3: Set value of slider
        const scale_factor = x / CANVAS_WIDTH;
        if (click_num === 1) {
          // 3.2: Clear canvas:
          ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height);
          setClick1Mag(Math.round(Math.min(MAX_VAL * scale_factor, MAX_VAL)));
          setClickNum(2);
          ctx.fillStyle = 'red';

        } else {
          setClick2Mag(Math.round(Math.min(MAX_VAL * scale_factor, MAX_VAL)));
          setClickNum(1);
          ctx.fillStyle = 'green';
        }

        // Step 4: Draw heads
        drawCircle({
          x,
          y,
          size: 30,
          // dx: 5,
          // dy: 40
        });

  
      }}></canvas>
    </>
  );
}
