import { useState, useContext } from 'react';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../../context/loading-context';

import fetchData from '../../helpers/fetch-data';

// ==============================================

export default function ModalComponent({ show_modal, handleClose, course }) {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);

  // --------------------------------------------

  const handleDelete = (course_id) => async () => {
    console.log('DELETE course handler');

    try {
      loadingCtx.setIsLoading(true);
      const response = await fetchData(`/courses/${course_id}`, 'DELETE');

      const data = await response.json();

      // -4xx / 5xx status code does NOT throw error.
      // -data.ok is true with a 2xx status code
      if (!response.ok) {
        // -data.message comes from the .message property
        //  sent from the backend.
        throw new Error(data.message);
      }

      console.log('deleted data: ', data);

      loadingCtx.setIsLoading(false);
      handleClose();
    } catch (err) {
      console.log(
        'Error in dashboard-admin --> deleteCourseHandler() -- err: ',
        err
      );
      loadingCtx.setIsLoading(false);
      handleClose();
      // setError(
      //   err.message || // This message comes from the backend!
      //     'Error in onLoginHandler()'
      // );
    }
  };

  // --------------------------------------------

  const handleEdit = () => {};

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
                <td>{course?.title}</td>
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
          <Button variant='danger' onClick={handleDelete(course?.id)}>
            Delete
          </Button>

          <Button variant='secondary' onClick={handleEdit}>
            Edit
          </Button>

          <Button variant='primary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
