import { useState, useEffect, useContext } from 'react';

// import { format } from 'date-fns';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../context/auth-context';
import { LoadingContext } from '../../context/loading-context';
import NotificationContext from '../../context/notification-context';

import getData from '../../helpers/get-data2-non-json-parsed';

// ==============================================

export default function OrderDetailsModal({
  show_modal,
  handleClose,
  order_id,
}) {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);
  const authCtx = useContext(AuthContext);
  const notificationCtx = useContext(NotificationContext);

  // --------------------------------------------

  useEffect(() => {
    if (order_id) {
      (async () => {
        try {
          loadingCtx.setIsLoading(true);

          notificationCtx.begin({ message: 'fetching course' });

          const token = authCtx.token;

          // const response = await fetchData(
          //   `/courses/${course_id}`,
          //   'DELETE',
          //   {},
          //   token
          // );
          // const data = await response.json();
          // if (!response.ok) {
          //   throw new Error(data.message);
          // }
          // console.log('deleted course: ', data);

          // -Update the courses table:
          const response = await getData(`/orders/${order_id}`, token);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }
          console.log('products in order: ', data);

          notificationCtx.endSuccess({ message: 'fetched course' });

          loadingCtx.setIsLoading(false);
        } catch (err) {
          console.log(
            'Error in order-details-modal.js --> useEffect(() => {...}, [order_id]) -- err: ',
            err
          );
          loadingCtx.setIsLoading(false);
          notificationCtx.endError({ message: err.message });
        }
      })();
    }
  }, [order_id]);

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
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>ID</td>
                <td>{course?.id}</td>
              </tr> */}
              <tr>
                <td>Title</td>
                <td></td>
              </tr>
              <tr>
                <td>Registered Attendees</td>
                <td></td>
              </tr>
              <tr>
                <td>Date</td>
                <td></td>
              </tr>
              <tr>
                <td>Time</td>
                <td></td>
              </tr>
              <tr>
                <td>Duration</td>
                <td></td>
              </tr>
              <tr>
                <td>City</td>
                <td></td>
              </tr>
              <tr>
                <td>Max Class Size</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          {/* {modal_footer} */}
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
