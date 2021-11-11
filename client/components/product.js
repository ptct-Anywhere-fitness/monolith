import { useContext } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { CartContext } from '../context/cart-context';

// import styles from '../styles/products.module.css'

// ==============================================

export default function Product({ product }) {
  // --------------------------------------------

  const cartCtx = useContext(CartContext);

  // --------------------------------------------

  return (
    <Card className='mb-3' style={{}}>
      <Card.Img
        variant='top'
        src='https://picsum.photos/256/256'
        style={{ width: '200px' }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{`$${(product.price / 100).toFixed(2)}`}</Card.Text>
        <Button
          variant='primary'
          onClick={() => {
            cartCtx.addToCart(product);
          }}
        >
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
