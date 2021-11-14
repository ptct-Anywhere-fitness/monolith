import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Courses from '../components/courses';
import Cart from '../components/cart';
import Calendar from '../components/calendar/Calendar';

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
      <Form onSubmit={submitHandler}>
        {['checkbox', 'radio'].map((type) => (
          <div key={`inline-${type}`} className='mb-3'>
            <Form.Check
              inline
              label='1'
              name='group1'
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label='2'
              name='group1'
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              disabled
              label='3 (disabled)'
              type={type}
              id={`inline-${type}-3`}
            />
          </div>
        ))}


        <hr />

        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-button-dark-example1'
            variant='secondary'
          >
            {intensity_str}
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark'>
            <Dropdown.Item active={intensity_input == 1} onClick={(e) => { e.preventDefault(); setIntensityInput(1); }}>Level 1: Easy</Dropdown.Item>
            <Dropdown.Item active={intensity_input == 2} onClick={(e) => { e.preventDefault(); setIntensityInput(2); }}>Level 2: Moderate</Dropdown.Item>
            <Dropdown.Item active={intensity_input == 3} onClick={(e) => { e.preventDefault(); setIntensityInput(3); }}>Level 3: Extreme</Dropdown.Item>
            <Dropdown.Item active={intensity_input == 0} onClick={(e) => { e.preventDefault(); setIntensityInput(0); }}>All Intensity Levels</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <hr />

        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-button-dark-example1'
            variant='secondary'
          >
            Date
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark'>
            <Calendar setDate={setDate} setDays={setDays} />
          </Dropdown.Menu>
        </Dropdown>

        <hr />

        {/* range */}
        <Form.Label>
          Duration (min)
          <Form.Range
            min='30'
            max='120'
            step='30'
            value={duration_input_min}
            onChange={(e) => {
              setDurationMinInput(e.target.value);
              console.log('min value: ', e.target.value);
            }}
          />
          {duration_input_min}
        </Form.Label>

        <Form.Label>
          Duration (max)
          <Form.Range
            min='30'
            max='120'
            step='30'
            value={duration_input_max}
            onChange={(e) => {
              console.log('max value: ', e.target.value);
              // if (duration_input_min <= e.target.value) {
              setDurationMaxInput(e.target.value);
              // }
            }}
          />
          {duration_input_max}
        </Form.Label>

        <Button variant='outline-dark' type='submit'>
          Submit
        </Button>
      </Form>

      <Courses courses={ui_courses} setCourses={setCourses} />
      <Cart />
    </>
  );
}
