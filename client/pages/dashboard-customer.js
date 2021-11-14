import { useState, useEffect, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Courses from '../components/courses';
import Cart from '../components/cart';
import Calendar from '../components/calendar/Calendar';
import RangeSlider from '../components/range-slider/range-slider';

// import Canvas_1 from '../components/canvas/canvas-1/canvas';
// import Canvas_2 from '../components/canvas/canvas-2/canvas';
import Canvas_3 from '../components/canvas/canvas-3/canvas';

// import { AuthContext } from '../context/auth-context';
// import { LoadingContext } from '../context/loading-context';

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


  return (
    <>
      {/* <Canvas_1 /> */}
      {/* <Canvas_2 /> */}
      <Canvas_3 />
    </>
  );
}
