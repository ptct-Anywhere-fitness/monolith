import { useState, useContext } from 'react';

// import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthContext } from '../../context/auth-context';
import { LoadingContext } from '../../context/loading-context';

import fetchData from '../../helpers/fetch-data';
import getData from '../../helpers/get-data';

// ==============================================

export default function AddCourseModal({
  show_modal,
  handleClose,
  setCourses,
}) {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);
  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  const [course_title, setCourseTitle] = useState('title');
  const [course_price, setCoursePrice] = useState(100);
  const [course_details, setCourseDetails] = useState('');

  // date: '2022-01-01',
  // const [course_date, setCourseDate] = useState('2022-01-01');
  const [course_date_year, setCourseDateYear] = useState('2022');
  const [course_date_month, setCourseDateMonth] = useState('01');
  const [course_date_day, setCourseDateDay] = useState('01');

  // time: '00:00:00.0-06',
  // const [course_time, setCourseTime] = useState('00:00:00.0-06');
  const [course_time_hr, setCourseTimeHr] = useState(12);
  const [course_time_min, setCourseTimeMin] = useState(0);

  // duration: 30,
  const [course_duration, setCourseDuration] = useState(30);

  // intensity: 1,
  const [course_intensity, setCourseIntensity] = useState(5);

  // city: 'tulsa',
  const [course_city, setCourseCity] = useState('tulsa');

  // registered_attendees: 0,
  const [course_registered, setCourseRegistered] = useState(0);

  // max_class_size: 10,
  const [course_max_class_size, setCourseMaxClassSize] = useState(10);

  // --------------------------------------------

  const handleAdd = async () => {
    try {
      const token = authCtx.token;

      loadingCtx.setIsLoading(true);
      const response = await fetchData(
        '/courses',
        'POST',
        {
          title: course_title,
          details: course_details,
          price: course_price,
          date: `${course_date_year}-${course_date_month}-${course_date_day}`,
          time: `${course_time_hr}:${course_time_min}:00.0-06`,
          duration: course_duration,
          intensity: course_intensity,
          city: course_city,
          max_class_size: course_max_class_size,
        },
        token
      );

      const data = await response.json();

      // -4xx / 5xx status code does NOT throw error.
      // -data.ok is true with a 2xx status code
      if (!response.ok) {
        // -data.message comes from the .message property
        //  sent from the backend.
        throw new Error(data.message);
      }

      console.log('data: ', data);

      // -Update the courses table:
      setCourses(await getData('/courses', token));
      loadingCtx.setIsLoading(false);
      handleClose();
    } catch (err) {
      console.log(
        'Error in dashboard-admin --> postCourseHandler() -- err: ',
        err
      );
      loadingCtx.setIsLoading(false);
      // setError(
      //   err.message || // This message comes from the backend!
      //     'Error in onLoginHandler()'
      // );
    }
  };

  // --------------------------------------------

  return (
    <>
      <Modal
        show={show_modal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <label>
              Title:
              <input
                type='text'
                value={course_title}
                onChange={(e) => setCourseTitle(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row></Row>
          {/* // price: 3333, */}
          <label>
            Price:
            <input
              type='number'
              value={course_price}
              onChange={(e) => setCoursePrice(e.target.value)}
            ></input>
          </label>

          <Row>
            {/* // details: 'details-3', */}
            <label>
              Details:
              <input
                type='text'
                value={course_details}
                onChange={(e) => setCourseDetails(e.target.value)}
              ></input>
            </label>
          </Row>
          <Row>
            {/* // date: '2022-01-01', */}
            <label>
              Date:
              <input
                type='text'
                value={course_date_year}
                onChange={(e) => setCourseDateYear(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* // date: '2022-01-01', */}
            <label>
              Date:
              <input
                type='text'
                value={course_date_month}
                onChange={(e) => setCourseDateMonth(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* // date: '2022-01-01', */}
            <label>
              Date:
              <input
                type='text'
                value={course_date_day}
                onChange={(e) => setCourseDateDay(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* <Col> */}
            {/* time: '00:00:00.0-06', */}
            <label>
              Hr:
              <input
                type='text'
                value={course_time_hr}
                onChange={(e) => setCourseTimeHr(e.target.value)}
              ></input>
            </label>
            {/* </Col> */}

            {/* <Col> */}
            <label>
              Min:
              <input
                type='text'
                value={course_time_min}
                onChange={(e) => setCourseTimeMin(e.target.value)}
              ></input>
            </label>
            {/* </Col> */}
          </Row>

          <Row>
            {/* // duration: 30, */}
            <label>
              Duration:
              <input
                type='text'
                value={course_duration}
                onChange={(e) => setCourseDuration(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* // intensity: 1, */}
            <label>
              Intensity:
              <input
                type='text'
                value={course_intensity}
                onChange={(e) => setCourseIntensity(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* // city: 'tulsa', */}
            <label>
              City:
              <input
                type='text'
                value={course_city}
                onChange={(e) => setCourseCity(e.target.value)}
              ></input>
            </label>
          </Row>

          <Row>
            {/* // max_class_size: 10, */}
            <label>
              Max Class Size:
              <input
                type='text'
                value={course_max_class_size}
                onChange={(e) => setCourseMaxClassSize(e.target.value)}
              ></input>
            </label>
          </Row>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='primary' onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
