import { useState, useContext } from 'react';

// import { format } from 'date-fns';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../context/auth-context';
import { LoadingContext } from '../../context/loading-context';

import fetchData from '../../helpers/fetch-data';
import getData from '../../helpers/get-data';
import {
  formatDate,
  formatTime_12hr,
  formatTime_24hr,
} from '../../helpers/format-date';

// ==============================================

export default function CourseDetailsModal({
  show_modal,
  handleClose,
  course,
  setCourses,
}) {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);
  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  const [edit_mode, setEditMode] = useState(false);
  const [delete_mode, setDeleteMode] = useState(false);

  // --------------------------------------------

  const handleTotalClose = () => {
    handleClose();
    setEditMode(false);
    setDeleteMode(false);
  };

  // --------------------------------------------

  const [title_input, setTitleInput] = useState(course?.title);
  const [date_input, setDateInput] = useState(formatDate(course?.date));
  const [time_input, setTimeInput] = useState(''); //useState(formatTime_12hr(course?.time));
  const [duration_input, setDurationInput] = useState(course?.duration);
  const [city_input, setCityInput] = useState(course?.city);
  const [max_class_size_input, setMaxClassSizeInput] = useState(
    course?.max_class_size
  );

  // --------------------------------------------

  const handleDelete = (course_id) => async () => {
    console.log('DELETE course handler');

    try {
      loadingCtx.setIsLoading(true);

      const token = authCtx.token;

      const response = await fetchData(
        `/courses/${course_id}`,
        'DELETE',
        {},
        token
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log('deleted course: ', data);

      // -Update the courses table:
      setCourses(await getData('/courses', token));
      loadingCtx.setIsLoading(false);
      handleTotalClose();
    } catch (err) {
      console.log(
        'Error in dashboard-admin --> deleteCourseHandler() -- err: ',
        err
      );
      loadingCtx.setIsLoading(false);
      // handleClose();
      // setError(
      //   err.message || // This message comes from the backend!
      //     'Error in onLoginHandler()'
      // );
    }
  };

  // --------------------------------------------

  const handleEdit = () => {
    setEditMode(true);
  };

  // --------------------------------------------

  const handleSave = async () => {
    console.log('handleSave()');

    try {
      loadingCtx.setIsLoading(true);

      const token = authCtx.token;

      const response = await fetchData(
        `/courses/${course.id}`,
        'PUT',
        {
          title: title_input,
          date: date_input,
          time: time_input,
          duration: duration_input,
          city: city_input,
          max_class_size: max_class_size_input,
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
      console.log('updated course: ', data);

      // -Update the courses table:
      setCourses(await getData('/courses', token));
      loadingCtx.setIsLoading(false);
      handleTotalClose();
    } catch (err) {
      console.log(
        'Error in dashboard-admin --> putCourseHandler() -- err: ',
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

  let modal_footer;
  if (edit_mode) {
    if (delete_mode) {
      modal_footer = (
        <>
          <Button variant='primary' onClick={handleTotalClose}>
            Cancel
          </Button>

          <Button variant='danger' onClick={handleDelete(course?.id)}>
            Delete
          </Button>
        </>
      );
    } /* delete_mode */ else {
      modal_footer = (
        <>
          <Button variant='primary' onClick={handleTotalClose}>
            Cancel
          </Button>

          <Button variant='success' onClick={handleSave}>
            Save
          </Button>

          <Button variant='secondary' onClick={() => setDeleteMode(true)}>
            Enable Delete
          </Button>
        </>
      );
    }
  } else {
    modal_footer = (
      <>
        <Button variant='secondary' onClick={handleEdit}>
          Edit
        </Button>

        <Button
          variant='primary'
          onClick={() => {
            handleClose();
            setEditMode(false);
            setDeleteMode(false);
          }}
        >
          Close
        </Button>
      </>
    );
  }

  // --------------------------------------------

  return (
    <>
      <Modal
        show={show_modal}
        onHide={handleTotalClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>ID</td>
                <td>{course?.id}</td>
              </tr> */}
              <tr>
                <td>Title</td>
                <td>
                  {!edit_mode ? (
                    course?.title
                  ) : (
                    <input
                      type='text'
                      placeholder={course?.title}
                      value={title_input}
                      onChange={(e) => setTitleInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Registered Attendees</td>
                <td>
                  {course?.registered_attendees} / {course?.max_class_size}
                </td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  {!edit_mode ? (
                    // format(new Date(course?.date), 'MMMM do Y')
                    // format(new Date(course?.date.split('T')[0]), 'MMMM do Y')
                    // course?.date.split('T')[0]
                    formatDate(course?.date)
                  ) : (
                    <input
                      type='text'
                      placeholder={formatDate(course?.date)}
                      value={date_input}
                      onChange={(e) => setDateInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Time</td>
                <td>
                  {!edit_mode ? (
                    formatTime_12hr(course?.time)
                  ) : (
                    <input
                      type='text'
                      placeholder={formatTime_24hr(course?.time)}
                      value={time_input}
                      onChange={(e) => setTimeInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  {!edit_mode ? (
                    course?.duration
                  ) : (
                    <input
                      type='text'
                      placeholder={course?.duration}
                      value={duration_input}
                      onChange={(e) => setDurationInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  {!edit_mode ? (
                    course?.city
                  ) : (
                    <input
                      type='text'
                      placeholder={course?.city}
                      value={city_input}
                      onChange={(e) => setCityInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Max Class Size</td>
                <td>
                  {!edit_mode ? (
                    course?.max_class_size
                  ) : (
                    <input
                      type='text'
                      placeholder={course?.max_class_size}
                      value={max_class_size_input}
                      onChange={(e) => setMaxClassSizeInput(e.target.value)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          {modal_footer}
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
