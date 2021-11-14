import { useState, useEffect, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Courses from '../components/courses';
import Cart from '../components/cart';
import Calendar from '../components/calendar/Calendar';
import RangeSlider from '../components/range-slider/range-slider';

// import { AuthContext } from '../context/auth-context';
// import { LoadingContext } from '../context/loading-context';

import { element_geometry, viewport_geometry } from '../helpers/geometry.js';


// ==============================================

export default function CustomerDashboardPage() {
  // --------------------------------------------

  // const authCtx = useContext(AuthContext);
  // const loadingCtx = useContext(LoadingContext);

  const [date, setDate] = useState('');
  const [days, setDays] = useState(1);

  useEffect(() => {
    console.log('date: ', date);
  }, [date]);

  useEffect(() => {
    console.log('days: ', days);
  }, [days]);

  // --------------------------------------------

  const [courses, setCourses] = useState();
  const [ui_courses, setUICourses] = useState();
  useEffect(() => {
    setUICourses(courses);
  }, [courses]);

  // --------------------------------------------

  const [duration_input_min, setDurationMinInput] = useState(30);
  const [duration_input_max, setDurationMaxInput] = useState(120);
  const [intensity_input, setIntensityInput] = useState(0);
  const [intensity_str, setIntensityStr] = useState('Intensity Level');
  useEffect(() => {
    console.log('intensity level: ', intensity_input);
    if (intensity_input === 0) {
      setIntensityStr('Intensity Level');
    }
    else if (intensity_input == 1) {
      setIntensityStr('Level 1: Easy');
    } else if (intensity_input == 2) {
      setIntensityStr('Level 2: Moderate');
    } else if (intensity_input == 3) {
      setIntensityStr('Level 3: Extreme');
    }
  }, [intensity_input]);


  // --------------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    

    // -Filter duration
    const filtered_courses = courses.filter((course) => {
      return (
        duration_input_min <= course.duration &&
        course.duration <= duration_input_max
      );
    });

    // -Filter intensity
    if (intensity_input != 0) {
      filtered_courses = filtered_courses.filter((course) => {
        return course.intensity == intensity_input;
      });
    }

    console.log('filtered_courses: ', filtered_courses);
    setUICourses(filtered_courses);
  };

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
      <canvas ref={canvas_ref} id="canvas" width="600px" height="600px" 
        style={{background: 'lightgray', borderRadius: '5px', 
          // position: 'absolute', top: 0, left: 0
        }} onClick={(e) => {
        function get_mouse_coordinates(event) {
          const [x, y] = [event.clientX, event.clientY];
          return [x, y];
        }
        
        console.log('clicked');
        const { x0, y0, x1, y1, w, h }= element_geometry(canvas_ref.current);
        console.log('x0: ', x0);
        console.log(`(x1, y1)  :  (${x1}, ${y1})`);

        // Step 0: Clear canvas
        const ctx = canvas_ref.current.getContext('2d');
        console.log(ctx);
        ctx.clearRect(0, 0, canvas_ref.current.width, canvas_ref.current.height);

        // Step 1: Get mouse coordinates
        const [x, y] = get_mouse_coordinates(e);
        console.log(`(x, y)  :  (${x}, ${y})`);

        // Step 2: Draw circle at location clicked
        function drawCircle(circle) {
          ctx.beginPath();
          ctx.arc(circle.x - x1, circle.y - y1, circle.size, 0, Math.PI * 2);
          // ctx.arc(circle.x - 25, circle.y-100, circle.size, 0, Math.PI * 2);
          ctx.fillStyle = 'purple';
          ctx.fill();
        }

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
