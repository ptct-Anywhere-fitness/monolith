import { useState, useEffect } from 'react';

// import { format } from 'date-fns';

import Table from 'react-bootstrap/Table';
import OrderDetailsModal from '../modals/order-details-modal';

// ==============================================

import getData from '../../helpers/get-data';

// ==============================================

export default function TableOrders({ orders }) {
  // --------------------------------------------

  const [details_modal_order_id, setDetailsModalOrderId] = useState();
  const [show_details_modal, setShowDetailsModal] = useState();
  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
    // setActiveModalCourse({});
  };
  const handleDetailsModalOpen = (order_id) => () => {
    setDetailsModalOrderId(order_id);
    setShowDetailsModal(true);
  };
  useEffect(() => {
    console.log('handleDetailsModalOpen in table-courses.js, course: ');
  }, [show_details_modal]);

  // --------------------------------------------

  return (
    <div style={{ maxHeight: '255px', overflowY: 'scroll' }}>
      <OrderDetailsModal
        show_modal={show_details_modal}
        handleClose={handleDetailsModalClose}
        order_id={details_modal_order_id}
      />

      <Table
        striped
        bordered
        hover
        variant='dark'
        responsive
        style={{ maxHeight: '260px', overflowY: 'scroll' }}
      >
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Total</th>
            <th>Username</th>
            <th>TODO: Products</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, idx) => {
              return (
                <tr key={idx}>
                  <td
                    onClick={handleDetailsModalOpen(order?.order_id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                      <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                    </svg>
                  </td>
                  <td>{order?.order_id}</td>
                  <td>{order?.total}</td>
                  <td>{order?.username}</td>
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
