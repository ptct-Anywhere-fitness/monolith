import { useState, useContext } from 'react';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../context/auth-context';
import { LoadingContext } from '../../context/loading-context';

import fetchData from '../../helpers/fetch-data';
import getData from '../../helpers/get-data';

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

  const [title_input, setTitleInput] = useState('');

  // --------------------------------------------

  const handleDelete = (course_id) => async () => {
    console.log('DELETE course handler');

    try {
      const token = authCtx.token;

      loadingCtx.setIsLoading(true);
      let response = await fetchData(`/courses/${course_id}`, 'DELETE');
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log('deleted course: ', data);

      // -Update the courses table:
      setCourses(await getData('/courses', token));
      loadingCtx.setIsLoading(false);
      handleClose();
      setEditMode(false);
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

  let modal_footer;
  if (edit_mode) {
    modal_footer = (
      <>
        <Button variant='danger' onClick={handleDelete(course?.id)}>
          Delete
        </Button>

        <Button
          variant='primary'
          onClick={() => {
            handleClose();
            setEditMode(false);
          }}
        >
          Cancel
        </Button>

        <Button
          variant='success'
          onClick={() => {
            alert('handle save -> Update endpoint');
            handleClose();
            setEditMode(false);
          }}
        >
          Save
        </Button>
      </>
    );
  } else {
    modal_footer = (
      <>
        <Button variant='secondary' onClick={handleEdit}>
          Edit
        </Button>

        <Button variant='primary' onClick={handleClose}>
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
        onHide={handleClose}
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
                <td>{course?.date}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{course?.time}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{course?.duration}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{course?.city}</td>
              </tr>
              <tr>
                <td>Max Class Size</td>
                <td>{course?.max_class_size}</td>
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
