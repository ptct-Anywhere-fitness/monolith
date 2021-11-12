import { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// ==============================================

export default function ModalComponent({ show_modal, handleClose, course }) {
  // --------------------------------------------

  // -This function uses the get_course_by_id HTTP flow
  // -Not really needed since the table already has all the data for a row.
  // -By passing in the course into this modal component
  //  instead of calling the get-course-by-id endpoint
  //  will speed up the interactivity of the app
  //  since the user does not have to wait on the
  //  HTTP req/res to get the course by ID.
  // async () => {
  //   try {
  //     loadingCtx.setIsLoading(true);

  //     const data = await getData('/courses/1', authCtx.token);
  //     console.log('data: ', data);

  //     // TODO: Proper error handling
  //     if (data.course) {
  //       setCourseById(data.course);
  //       loadingCtx.setIsLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(
  //       'Error in dashboard-admin --> getCourseByIdHandler() -- err: ',
  //       err
  //     );
  //     // setError(
  //     //   err.message || // This message comes from the backend!
  //     //     'Error in onRegisterHandler()'
  //     // );
  //   }
  // };

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
                  {course?.registered_attendees} / {course.max_class_size}
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
        <Modal.Footer>
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
