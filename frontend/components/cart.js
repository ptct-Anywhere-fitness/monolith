import { useContext } from 'react';
// import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';

import { CartContext } from '../context/cart-context';
// import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';

import { placeOrder } from '../helpers/place-order.js';

// ==============================================

export default function Cart() {
  // --------------------------------------------

  const cartCtx = useContext(CartContext);
  // const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  // const router = useRouter();

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
        onClick={() => {
          console.log('cart: ', cartCtx.cart);
          console.log(cartCtx.cart?.length > 0 ? 'primary' : 'secondary');

          console.log('cartCtx.cart: ', cartCtx.cart);
          loadingCtx.setIsLoading(true);
          placeOrder(cartCtx.cart);
        }}
      >
        Place order
      </Button>
    </div>
  );

  // --------------------------------------------
}
