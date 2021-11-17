import Button from 'react-bootstrap/Button';

import useStandard from '../hooks/use-standard';
import { placeOrder } from '../helpers/place-order.js';

import fetchData from '../helpers/fetch-data';

// ==============================================

export default function Cart() {
  // --------------------------------------------

  const { cartCtx, authCtx, notificationCtx, loadingCtx } = useStandard();

  // --------------------------------------------

  const placeOrderHandler = async () => {
    try {
      const cart = cartCtx.cart;
      console.log('cart: ', cart);

      loadingCtx.setIsLoading(true);

      notificationCtx.begin({ message: 'scheduling course(s)' });

      const token = authCtx.token;

      // -Update the courses table:
      const response = await fetchData(
        `/orders`,
        'POST',
        { cart, total: cartCtx.cart_total },
        token
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log('placed order: ', data);

      // setProductsInOrder(data);

      notificationCtx.endSuccess({ message: 'scheduled course(s)' });

      loadingCtx.setIsLoading(false);

      // TODO:
      //  -Set the cart in context to be empty
      //   so that the place order button is no longer clickable.
    } catch (err) {
      console.log('Error in cart.js --> placeOrderHandler() -- err: ', err);
      loadingCtx.setIsLoading(false);
      notificationCtx.endError({ message: err.message });
    }

    // TODO:
    // -Only schedule the appointment (above)
    //  if successful payment processed
    //  through stripe.
    //  --Have successful URL for stripe
    //    be a page with a useEffect(, [])
    //    that runs the above post request to /orders.

    // -Send customer to Stripe
    console.log('cartCtx.cart: ', cartCtx.cart);
    loadingCtx.setIsLoading(true);
    // placeOrder(cartCtx.cart);
  };

  // --------------------------------------------

  return (
    <div style={{ background: '#cfe8fc', padding: '15px' }}>
      <h5>Cart: </h5>
      <ul style={{ listStyle: 'none', paddingLeft: '0', marginTop: '5px' }}>
        {cartCtx.cart &&
          cartCtx.cart.map((cart_item, cart_idx) => {
            return (
              <li key={cart_idx}>
                <div
                  style={{
                    position: 'relative',
                    border: 'solid black 1px',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      cartCtx.deleteFromCart(cart_idx);
                    }}
                  >
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                    <path
                      fillRule='evenodd'
                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                    />
                  </svg>
                  Product-ID: {cart_item.product_id}
                  <br />
                  Qty: {cart_item.quantity}
                  <br />
                  Price: ${(cart_item.product_price / 100).toFixed(2)}
                </div>
              </li>
            );
          })}
      </ul>
      <h6>Total: ${(cartCtx.cart_total / 100).toFixed(2)}</h6>

      <Button
        // NOTE: empty arrays are truthy!?!
        variant={cartCtx.cart?.length > 0 ? 'primary' : 'secondary'}
        disabled={cartCtx.cart?.length === 0}
        onClick={placeOrderHandler}
      >
        Place order
      </Button>
    </div>
  );

  // --------------------------------------------
}
