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

  const [post_course_title, setPostCourseTitle] = useState('');

  // --------------------------------------------

  const handleAdd = async () => {
    alert('handle edit');
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
            <Col>
              <h6>Post Course</h6>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const token = authCtx.token;

                    loadingCtx.setIsLoading(true);
                    const response = await fetchData('/courses', 'POST', {
                      title: post_course_title,
                    });

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
                }}
              >
                <label>
                  Title:
                  <input
                    type='text'
                    value={post_course_title}
                    onChange={(e) => setPostCourseTitle(e.target.value)}
                  ></input>
                </label>

                <Button type='submit'>Post Course</Button>
              </form>
            </Col>
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
