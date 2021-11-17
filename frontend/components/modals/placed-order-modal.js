import { useState, useEffect } from 'react';

// import { format } from 'date-fns';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import useStandard from '../../hooks/use-standard';
// import getData from '../../helpers/get-data2-non-json-parsed';

import toDollars from '../../helpers/money';

// ==============================================

export default function PlacedOrderModal({ show_modal, handleClose, order }) {
  // --------------------------------------------

  const { router, authCtx, loadingCtx, notificationCtx } = useStandard();

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
          <Modal.Title>
            Placed Order #() -- Total: $ {toDollars(order?.order_total)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quanity</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.order_line_items.map((line_item) => {
                  return (
                    <tr>
                      <td
                        onClick={() => {
                          // router.push(`/product/${line_item.product_id}`);
                        }}
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
                      <td>{line_item.product_name}</td>
                      <td>{line_item.product_price}</td>
                      <td>{line_item.quantity}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          {/* {modal_footer} */}
          <Button>Close</Button>
          <Button>Pay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
