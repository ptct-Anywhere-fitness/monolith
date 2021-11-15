import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Courses from '../components/courses';
import Cart from '../components/cart';
import Calendar from '../components/calendar/Calendar';

import CanvasSlider from '../components/range-slider/range-slider';

// import { AuthContext } from '../context/auth-context';
// import { LoadingContext } from '../context/loading-context';

// ==============================================

import { course_type_map, course_intensity_map } from '../helpers/data-maps';

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

  const MIN_DURATION = 30;
  const MAX_DURATION = 120;
  const [duration_input_min, setDurationMinInput] = useState(MIN_DURATION);
  const [duration_input_max, setDurationMaxInput] = useState(MAX_DURATION);
  useEffect(() => {
    console.log(
      'duration_input_min: ',
      duration_input_min,
      '\tduration_input_max: ',
      duration_input_max
    );
  }, [duration_input_min, duration_input_max]);

  // --------------------------------------------

  const [intensity_input, setIntensityInput] = useState();
  const [intensity_str, setIntensityStr] = useState();
  // const intensity_map = [
  //   'All Levels',
  //   'Level 1: Easy',
  //   'Level 2: Moderate',
  //   'Level 3: Extreme',
  // ];
  useEffect(() => {
    // console.log('intensity level: ', intensity_input);
    setIntensityStr(course_intensity_map[intensity_input]);
  }, [intensity_input]);

  // --------------------------------------------

  const [type_input, setTypeInput] = useState();
  const [type_str, setTypeStr] = useState();
  // const course_type_map = [
  //   'All Types',
  //   'Yoga',
  //   'Weight Lifting',
  //   'Jogging',
  //   'Pilates',
  // ];
  useEffect(() => {
    // console.log('type: ', type_input);
    setTypeStr(course_type_map[type_input]);
  }, [type_input]);

  // --------------------------------------------

  const do_update_courses = () => {
    // -Filter duration
    // -Defaults to [min, max]
    let filtered_courses = courses.filter((course) => {
      return (
        duration_input_min <= course.duration &&
        course.duration <= duration_input_max
      );
    });

    // -Filter intensity
    if (intensity_input) {
      filtered_courses = filtered_courses.filter((course) => {
        return course.intensity == intensity_input;
      });
    }

    // -Filter type
    if (type_input) {
      filtered_courses = filtered_courses.filter((course) => {
        return course.type == type_input;
      });
    }

    console.log('filtered_courses: ', filtered_courses);
    setUICourses(filtered_courses);
  };

  // --------------------------------------------

  // -Update filter upon any change of input
  //  --Dropdowns
  //  --Second click of duration range.
  useEffect(() => {
    if (courses) {
      do_update_courses();
    }
  }, [intensity_input, type_input, duration_input_max]);

  // --------------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    do_update_courses();
  };

  // --------------------------------------------

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className='justify-content-center mt-5 mb-4'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <Button variant='outline-dark' type='submit'>
              Apply Filter
            </Button> */}
          </div>
        </Row>
        <Row>
          <Col>
            {/* Type */}
            <Dropdown>
              <Dropdown.Toggle
                variant='secondary'
                id='dropdown-button-dark-type'
              >
                {type_str ? type_str : 'Types'}
              </Dropdown.Toggle>

              <Dropdown.Menu variant='dark'>
                <Dropdown.Item
                  active={type_input == 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setTypeInput(1);
                  }}
                >
                  {course_type_map[1]}
                </Dropdown.Item>
                <Dropdown.Item
                  active={type_input == 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setTypeInput(2);
                  }}
                >
                  {course_type_map[2]}
                </Dropdown.Item>
                <Dropdown.Item
                  active={type_input == 3}
                  onClick={(e) => {
                    e.preventDefault();
                    setTypeInput(3);
                  }}
                >
                  {course_type_map[3]}
                </Dropdown.Item>
                <Dropdown.Item
                  active={type_input == 4}
                  onClick={(e) => {
                    e.preventDefault();
                    setTypeInput(4);
                  }}
                >
                  {course_type_map[4]}
                </Dropdown.Item>
                <Dropdown.Item
                  active={type_input == 0}
                  onClick={(e) => {
                    e.preventDefault();
                    setTypeInput(0);
                  }}
                >
                  {course_type_map[0]}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            {/* Intensity Level */}
            <Dropdown>
              <Dropdown.Toggle
                variant='secondary'
                id='dropdown-button-dark-intensity'
              >
                {/* {intensity_str} */}
                {intensity_str ? intensity_str : 'Intensity Level'}
              </Dropdown.Toggle>

              <Dropdown.Menu variant='dark'>
                <Dropdown.Item
                  active={intensity_input == 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntensityInput(1);
                  }}
                >
                  Level 1: Easy
                </Dropdown.Item>
                <Dropdown.Item
                  active={intensity_input == 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntensityInput(2);
                  }}
                >
                  Level 2: Moderate
                </Dropdown.Item>
                <Dropdown.Item
                  active={intensity_input == 3}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntensityInput(3);
                  }}
                >
                  Level 3: Extreme
                </Dropdown.Item>
                <Dropdown.Item
                  active={intensity_input == 0}
                  onClick={(e) => {
                    e.preventDefault();
                    setIntensityInput(0);
                  }}
                >
                  All Intensity Levels
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            {/* Date */}
            <Dropdown>
              <Dropdown.Toggle
                id='dropdown-button-dark-date'
                variant='secondary'
              >
                Date
              </Dropdown.Toggle>

              <Dropdown.Menu variant='dark'>
                <Calendar setDate={setDate} setDays={setDays} />
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            {/* duration */}
            <Form.Label>
              Duration [minutes]
              <br />
              <CanvasSlider
                setDurationMinInput={setDurationMinInput}
                setDurationMaxInput={setDurationMaxInput}
                duration_input_min={duration_input_min}
              />
              <br />
              <span style={{ marginRight: '260px' }}>
                Min: {duration_input_min}
              </span>
              <span>Max: {duration_input_max}</span>
            </Form.Label>
          </Col>
        </Row>
      </Form>

      <hr />

      <Courses courses={ui_courses} setCourses={setCourses} />
      <Cart />
    </>
  );
}
