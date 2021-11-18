import { useState, useEffect } from 'react';

// import { format } from 'date-fns';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

import useStandard from '../../hooks/use-standard';
import getData from '../../helpers/get-data2-non-json-parsed';
import toDollars from '../../helpers/money';

// ==============================================

export default function OrderDetailsModal({
  show_modal,
  handleClose,
  order_id,
}) {
  // --------------------------------------------

  const [products_in_order, setProductsInOrder] = useState();

  // --------------------------------------------

  const { router, authCtx, loadingCtx, notificationCtx } = useStandard();

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

          setProductsInOrder(data);

          notificationCtx.endSuccess({ message: 'fetched course' });

          loadingCtx.setIsLoading(false);
        } catch (err) {
          console.log(
            'Error in order-details-modal.js --> useEffect(() => {...}, [order_id]) -- err: ',
            err
          );
          loadingCtx.setIsLoading(false);
          notificationCtx.endError({ message: err.message });
          handleClose();
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
          <Modal.Title>Order Details for Order #{order_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th></th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
              </tr>
            </thead>
            <tbody>
              {products_in_order &&
                products_in_order.map((product) => {
                  return (
                    <tr key={product.product_id}>
                      <td
                        onClick={() => {
                          router.push(`/product/${product.product_id}`);
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
                      <td>{product.product_id}</td>
                      <td>{product.product_name}</td>
                      <td>${toDollars(product.product_price)}</td>
                    </tr>
                  );
                })}
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
