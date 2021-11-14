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

  // --------------------------------------------

  const [duration_input_min, setDurationMinInput] = useState(30);
  const [duration_input_max, setDurationMaxInput] = useState(120);

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
    console.log('filtered_courses: ', filtered_courses);
    setCourses(filtered_courses);
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

        <Form.Select aria-label='Default select example'>
          <option>Open this select menu</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
        </Form.Select>

        <Dropdown>
          <Dropdown.Toggle
            id='dropdown-button-dark-example1'
            variant='secondary'
          >
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu variant='dark'>
            <Dropdown.Item href='#/action-1' active>
              Action
            </Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href='#/action-4'>Separated link</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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

      <Courses courses={courses} setCourses={setCourses} />
      <Cart />
    </>
  );
}
